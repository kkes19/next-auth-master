"use client";

import React, {ReactNode} from 'react'
import {logout} from "@/actions/logout";

export const LogoutButton = ({children}: {children: ReactNode}) => {

    const onClick = async () => {
        await logout();
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
