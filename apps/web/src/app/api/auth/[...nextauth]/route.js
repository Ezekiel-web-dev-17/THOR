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
        // async redirect({ url, baseUrl }) {
        //     // Allows relative callback URLs
        //     if (url.startsWith("/home")) return `${baseUrl}/getting-started`;
            
        //     // Allows callback URLs on the same origin
        //     if (url.startsWith(baseUrl)) return url;
            
        //     // Default fallback
        //     return `/home/getting-started`;
        // },

        async redirect({url, baseUrl}) {
            // If the url is from the same origin, use it
            if (url.startsWith("/")) {
                return url
            } else {
                return `${baseUrl}/getting-started`
            }
        },

        // async redirect({ baseUrl }) {
        //     return `${baseUrl}/getting-started`
        // },

        // async redirect({ url, baseUrl }) {
        //     // If there's a callbackUrl, use it
        //     if (url.startsWith("/")) return `${baseUrl}${url}`;
        //     // If the url is from the same origin, use it
        //     else if (new URL(url).origin === baseUrl) return url;
        //     // Otherwise, return to getting-started as fallback
        //     return `${baseUrl}/getting-started`;
        // },


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
