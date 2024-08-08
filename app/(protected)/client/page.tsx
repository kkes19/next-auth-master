'use client';

import React from 'react'
import {UserInfo} from "@/components/user-info";
import {useCurrentUser} from "@/hooks/use-current-user";
import Loader from "@/components/protected/loader";

const Page = () => {
    const {user, status} = useCurrentUser();

    if (status === "loading") {
        return (
            <Loader />
        )
    }

    return (
        <UserInfo
            label="🧔🏾 Client component"
            user={user}
        />
    )
}
export default Page
