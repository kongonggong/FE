import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("Missing credentials");
                    return null;
                }

                try {
                    // Login using the provided credentials
                    const user = await userLogin(credentials.email, credentials.password);

                    if (user && user.token) {
                        return {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            token: user.token, // Ensure the token is stored
                        };
                    } else {
                        console.error("Invalid credentials or missing token");
                        return null;
                    }
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null; // Ensure failure is handled properly
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: user.token, // Store token in JWT
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                _id: token._id,
                name: token.name,
                email: token.email,
                role: token.role,
                token: token.token, // Include token in session
            };
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
