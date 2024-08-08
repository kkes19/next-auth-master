"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useCurrentUser} from "@/hooks/use-current-user";
import {LogoutButton} from "@/components/auth/logout-button";
import {FaArrowRightFromBracket, FaUser} from "react-icons/fa6";
import ImageLoader from "@/components/protected/image-loader";


export const UserButton = () => {
    const {user, status} = useCurrentUser();

    if (status === "loading") {
        return (
            <ImageLoader/>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="bg-primary">
                        <FaUser className="text-primary-foreground"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton >
                    <DropdownMenuItem >
                        <FaArrowRightFromBracket className="size-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}