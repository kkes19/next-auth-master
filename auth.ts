import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import Credentials from "@auth/core/providers/credentials";
import {loginSchema} from "@/schema";
import {getUserByEmail, getUserById} from "@/data/user";
import bcrypt from "bcryptjs";
import {UserRole} from "@prisma/client";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";
import {getAccountByUserId} from "@/data/account";

export const {
    handlers,
    auth,
    signIn,
    signOut,
    unstable_update
} = NextAuth({
    adapter: PrismaAdapter(db),
    callbacks: {
        async signIn({user, account}) {
            // Allow OAuth without email verification.
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            //Prevent SignIn without email verification.
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled){
                const twoConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoConfirmation) return false;

                await db.twoFactorConfirmation.delete({
                    where: {id: twoConfirmation.id}
                })
            }

            return true;
        },
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email!;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({token, user}){
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        },
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()},
            })
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    providers: [
        GitHub,
        Google,
        Credentials({
            async authorize(credentials, req) {
                const validateFields = loginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const {email, password} = validateFields.data;
                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordMatch) return user;
                }
                return null;
            }
        })
    ],
    session: { strategy: "jwt" },
});