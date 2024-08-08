"use server";

import {randomInt} from "node:crypto";
import {v4 as uuidV4} from "uuid";
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";
import {getPasswordResetTokenByEmail} from "@/data/password-reset-token";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    return db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            }
        })
    }

    return db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });
}

export const generateTwoFactorToken = async (email: string) => {
    const token = randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 900 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {id: existingToken.id}
        })
    }

    return db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    });
}