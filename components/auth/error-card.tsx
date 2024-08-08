import React from 'react'
import {CardWrapper} from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        />
    )
}
