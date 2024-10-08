"use server";

import {z} from "zod";
import bcrypt from "bcryptjs";
import {unstable_update as update} from "@/auth";
import {settingSchema} from "@/schema";
import {currentUser} from "@/lib/auth";
import {getUserByEmail, getUserById} from "@/data/user";
import {db} from "@/lib/db";
import {generateVerificationToken} from "@/lib/token";
import {sendVerificationEmail} from "@/lib/mail";

export const settings = async (
    values: z.infer<typeof settingSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return {error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id!)

    if (!dbUser) {
        return {error: "Unauthorized"}
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return {error: "Email already in use!"}
        }

        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {success: "Verification email sent!"}
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        );

        if (!passwordMatch) {
            return {error: "Incorrect password!"}
        }

        values.password = await bcrypt.hash(
            values.newPassword,
            10
        );
        values.newPassword = undefined;

    }

    const updatedUser = await db.user.update({
        where: {id: user.id},
        data: {
            ...values
        }
    });

    await update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
            role: updatedUser.role,
        }
    })

    return {success: "Setting updated!"}
}