import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import NextAuth from "next-auth"

export const authOptions = {
    providers: [
        CredentialsProvider({   
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });

                if (existingUser) {
                    console.log(`password from db is ${existingUser.password}`);
                    console.log(`Raw passwod from user is ${credentials.passwod}`);
                    console.log(`Hashed passsword from ${hashedPassword}`)
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }

                try {
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword
                        }
                    });

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch (e) {
                    console.error(e);
                }

                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
