import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { aj, commentRateLimit } from '@/lib/arcjet'

// GET - Fetch comments for a documentation page
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const pageUrl = searchParams.get('pageUrl')
        const sortBy = searchParams.get('sortBy') || 'recent'

        // Add validation
        if (!pageUrl || typeof pageUrl !== 'string') {
            return NextResponse.json({ error: 'pageUrl is required' }, { status: 400 })
        }
        // Sanitize the input
        const sanitizedPageUrl = pageUrl.trim()
        if (sanitizedPageUrl.length === 0 || sanitizedPageUrl.length > 500) {
            return NextResponse.json({ error: 'Invalid pageUrl' }, { status: 400 })
        }

        // Fetch all non-deleted comments for the page
        let comments = await prisma.comment.findMany({
            where: {
                pageUrl: sanitizedPageUrl,
                isDeleted: false
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Apply sorting
        if (sortBy === 'popular') {
            comments.sort((a, b) => b.likes.length - a.likes.length)
        } else if (sortBy === 'oldest') {
            comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }

        // Build nested comment structure
        const commentMap = {}
        const rootComments = []

        // First pass: create map of all comments
        comments.forEach(comment => {
            commentMap[comment.id] = {
                ...comment,
                replies: []
            }
        })

        // Second pass: build parent-child relationships
        comments.forEach(comment => {
            if (comment.parentId && commentMap[comment.parentId]) {
                commentMap[comment.parentId].replies.push(commentMap[comment.id])
            } else if (!comment.parentId) {
                rootComments.push(commentMap[comment.id])
            }
        })

        return NextResponse.json({
            comments: rootComments,
            total: comments.length,
            searchParams: {
                pageUrl,
                sortBy
            }
        })
    } catch (error) {
        console.error('Error fetching comments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        )
    }
}

// POST - Create a new comment or reply
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'You must be signed in to comment' },
                { status: 401 }
            )
        }

        // Apply Arcjet rate limiting
        const decision = await aj
            .withRule(commentRateLimit)
            .protect(request, { userId: session.user.id })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return NextResponse.json(
                    {
                        error: 'Too many comments. Please slow down.',
                        retryAfter: decision.reason.resetTime
                    },
                    { status: 429 }
                )
            }
            return NextResponse.json(
                { error: 'Request blocked' },
                { status: 403 }
            )
        }

        const body = await request.json()
        const { pageUrl, content, parentId } = body

        // Validation
        if (!pageUrl || !content) {
            return NextResponse.json(
                { error: 'pageUrl and content are required' },
                { status: 400 }
            )
        }

        if (content.trim().length === 0) {
            return NextResponse.json(
                { error: 'Comment content cannot be empty' },
                { status: 400 }
            )
        }

        if (content.length > 2000) {
            return NextResponse.json(
                { error: 'Comment is too long (max 2000 characters)' },
                { status: 400 }
            )
        }

        // If parentId is provided, verify it exists
        if (parentId) {
            const parentComment = await prisma.comment.findUnique({
                where: { id: parentId }
            })

            if (!parentComment) {
                return NextResponse.json(
                    { error: "Comment you're replying to is  not found" },
                    { status: 404 }
                )
            }
        }

        // Create the comment
        const comment = await prisma.comment.create({
            data: {
                pageUrl,
                content: content.trim(),
                userId: session.user.id,
                parentId: parentId || null,
                likes: []
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true
                    }
                }
            }
        })

        return NextResponse.json({ comment }, { status: 201 })
    } catch (error) {
        console.error('Error creating comment:', error)
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        )
    }
}
