import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

const handler = NextAuth({

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

        async redirect({url, baseUrl}) {
            // If the url is from the same origin, use it
            if (url.startsWith("/")) {
                return url
            } else {
                return `${baseUrl}/getting-started`
            }
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub || token.id
                session.user.username = token.username
            }
            return session
        },

        async signIn({ profile }) {
            if (!profile?.email) return false
            return true
        },
    }
})

export { handler as GET, handler as POST }
