import React from 'react'
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert";

interface FormErrorProps {
    message?: string
}

export const FormError = ({message}: FormErrorProps) => {

    if (!message) return null;

    return (
        <Alert variant="destructive" className="py-2 bg-destructive/25">
            <AlertDescription className="text-destructive">
                {message}
            </AlertDescription>
        </Alert>
    )
}
