import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],

    pages: {
        signIn: '/home',
    },

    callbacks: {
        async redirect({ baseUrl }) {
            return `${baseUrl}/getting-started`
        },

        async session({ session, token, user }) {
            if (session?.user) {
                session.user.id = user?.id || token.sub || token.id
                session.user.role = user?.role || "User"
            }
            return session
        },

        async signIn({ profile }) {
            if (!profile?.email) return false
            return true
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

