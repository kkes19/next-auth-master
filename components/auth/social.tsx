"use client";

import React from 'react'
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "@/route";
import {useSearchParams} from "next/navigation";

export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        }).then(()=>{});
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="size-5"/>
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => onClick("github")}
            >
                <FaGithub className="size-5"/>
            </Button>
        </div>
    )
}
