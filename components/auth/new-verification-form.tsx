"use client";

import {CardWrapper} from "@/components/auth/card-wrapper";
import { BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/actions/new-verifcation";
import {FormError} from "@/components/auth/form-error";
import {FormSuccess} from "@/components/auth/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data?.succes);
                setError(data?.error);
            })
            .catch((error) => {
                setError("Something went wrong!");
            });
    }, [token]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirm your email"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )
};