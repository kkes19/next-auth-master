"use server";

import {z} from "zod";
import {resetSchema} from "@/schema";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/token";
import {sendPasswordResetEmail} from "@/lib/mail";

export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validateFields = resetSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid email!"}
    }

    const {email} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {error: "Email not found!"};
    }

    const passwordResetToken= await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return {success: "Reset email sent!"};
}