"use client";

import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FormSuccess} from "@/components/auth/form-success";
import {Button} from "@/components/ui/button";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {FormError} from "@/components/auth/form-error";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSearchParams} from "next/navigation";
import {newPasswordSchema} from "@/schema";
import {newPassword} from "@/actions/new-password";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    }

    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        disabled={isPending}
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" {...field} type="password"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
