import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (
          credentials &&
          typeof credentials.email === "string" &&
          typeof credentials.password === "string"
        ) {
          // Replace this with your own authentication logic
          const user = { id: "1", name: "Admin", email: credentials.email };
          if (
            credentials.email === "admin@example.com" &&
            credentials.password === "password"
          ) {
            return Promise.resolve(user);
          }
        }
        return Promise.resolve(null);
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
