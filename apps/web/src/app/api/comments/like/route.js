import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { aj, likeRateLimit } from '@/lib/arcjet'

// POST - Toggle like on a comment
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json(
                { error: 'You must be signed in to like comments' },
                { status: 401 }
            )
        }

        // Apply Arcjet rate limiting
        const decision = await aj
            .withRule(likeRateLimit)
            .protect(request, { userId: session.user.id })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return NextResponse.json(
                    {
                        error: 'Too many like requests. Please slow down.',
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
        const { id } = body

        // Validate MongoDB ObjectId format
        if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return NextResponse.json(
                { error: 'Invalid comment ID' },
                { status: 400 }
            )
        }
        const userId = session.user.id

        // Find the comment
        const comment = await prisma.comment.findUnique({
            where: { id }
        })

        if (!comment) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            )
        }

        // Check if user already liked this comment
        const hasLiked = comment.likes.includes(userId)

        let updatedLikes
        if (hasLiked) {
            // Remove like
            updatedLikes = comment.likes.filter(id => id !== userId)
        } else {
            // Add like
            updatedLikes = [...comment.likes, userId]
        }

        // Update the comment
        const updatedComment = await prisma.$transaction(async (tx) => {
            const comment = await tx.comment.findUnique({ where: { id } })
            const hasLiked = comment.likes.includes(userId)

            return await tx.comment.update({
                where: { id },
                data: {
                    likes: hasLiked
                        ? comment.likes.filter(uid => uid !== userId)
                        : [...comment.likes, userId]
                }
            })
        })

        return NextResponse.json({
            likes: updatedComment.likes.length,
            isLiked: !hasLiked
        })
    } catch (error) {
        console.error('Error toggling like:', error)
        return NextResponse.json(
            { error: 'Failed to toggle like' },
            { status: 500 }
        )
    }
}
