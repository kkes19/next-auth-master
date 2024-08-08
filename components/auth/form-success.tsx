import React from 'react'
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert";

interface FormSuccessProps {
    message?: string
}

export const FormSuccess = ({message}: FormSuccessProps) => {

    if (!message) return null;

    return (
        <Alert variant="success" className="py-2 bg-green-200">
            <AlertDescription className="text-green-700">
                {message}
            </AlertDescription>
        </Alert>
    )
}
