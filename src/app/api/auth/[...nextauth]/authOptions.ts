import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"; // Import JWT type
import { Session } from "next-auth"; // Import Session type

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        
        // Send login request to the server
        const response = await fetch("http://localhost:5003/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const user = await response.json();

        if (response.ok && user) {
          return user; // Return user object if successful
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  callbacks: {
    // Explicitly define types for `token` and `user`
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // Ensure the properties are valid strings and provide fallback values if needed
        token.id = user._id ? String(user._id) : ""; // Convert to string
        token.email = user.email ? String(user.email) : ""; // Convert to string
        token.name = user.name ? String(user.name) : ""; // Convert to string
        token.token = user.token ? String(user.token) : ""; // Convert to string
      }
      return token;
    },
    // Explicitly define types for `session` and `token`
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user._id = ""; // Fallback to empty string if undefined
      session.user.email = token.email || ""; // Fallback to empty string if undefined
      session.user.name = token.name || ""; // Fallback to empty string if undefined
      session.user.token =  ""; // Fallback to empty string if undefined
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
