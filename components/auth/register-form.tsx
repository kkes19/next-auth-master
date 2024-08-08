"use client";

import React, {useState, useTransition} from 'react';

import {useForm} from "react-hook-form";
import {z} from "zod";
import {registerSchema} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {EyeClosedIcon, EyeOpenIcon} from "@radix-ui/react-icons";
import {FormError} from "@/components/auth/form-error";
import {FormSuccess} from "@/components/auth/form-success";
import {register} from "@/actions/register";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const showPass = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
                if (data?.success) {
                    form.reset();
                }
            });
        });
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        disabled={isPending}
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isPending}
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@email.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isPending}
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative w-full">
                                        <Input {...field} placeholder="******"
                                               type={showPassword ? 'text' : 'password'}/>
                                        <div className="absolute top-0 bottom-0 right-0">
                                            <Button
                                                disabled={isPending} className="hover:bg-transparent" type="button" variant="ghost"
                                                    size="icon" onClick={showPass}>
                                                {showPassword ? (
                                                    <EyeClosedIcon className="size-4"/>
                                                ) : (
                                                    <EyeOpenIcon className="size-4"/>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
