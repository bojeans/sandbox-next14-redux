import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Replace this with your own authentication logic
        const user = { id: 1, name: "Admin", email: credentials.email };
        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "password"
        ) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/admin-login",
  },
});
