// review this 

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createUser, getUserByEmail } from '../../../lib/db'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const existingUser = await getUserByEmail(user.email);
        if (!existingUser) {
          // Redirect to username selection page for new users
          return '/auth/username?email=' + user.email;
        }
      }
      return true;
    },
    async session({ session, user }) {
      // Add username to session
      const dbUser = await getUserByEmail(session.user.email);
      session.user.username = dbUser.username;
      return session;
    },
  },
})
