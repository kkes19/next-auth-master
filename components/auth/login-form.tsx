"use client";

import React, {useState, useTransition} from 'react';

import {useForm} from "react-hook-form";
import {z} from "zod";
import {loginSchema} from "@/schema";
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
import {login} from "@/actions/login";
import {useSearchParams} from "next/navigation";
import {FormSuccess} from "@/components/auth/form-success";
import Link from "next/link";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false)
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const showPass = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(() => setError("Something went wrong!"));
        });
    }

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Dont have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {showTwoFactor && (
                        <FormField
                            disabled={isPending}
                            control={form.control}
                            name="code"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Two Factor Authentication Code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="flex-1">
                                                <InputOTPSlot className="flex-1" index={0}/>
                                                <InputOTPSlot className="flex-1" index={1}/>
                                                <InputOTPSlot className="flex-1" index={2}/>
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup className="flex-1">
                                                <InputOTPSlot className="flex-1" index={3}/>
                                                <InputOTPSlot className="flex-1" index={4}/>
                                                <InputOTPSlot className="flex-1" index={5}/>
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )}
                    {!showTwoFactor && (
                        <>
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
                                                    <Button disabled={isPending} className="hover:bg-transparent"
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={showPass}
                                                    >
                                                        {showPassword ? (
                                                            <EyeClosedIcon className="size-4"/>
                                                        ) : (
                                                            <EyeOpenIcon className="size-4"/>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <Button asChild variant="link" size="sm" className="px-0 font-normal">
                                            <Link href="/auth/reset">
                                                Forgot password?
                                            </Link>
                                        </Button>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
