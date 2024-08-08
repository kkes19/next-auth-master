import React from 'react'
import {currentUser} from "@/lib/auth";
import {UserInfo} from "@/components/user-info";

const Server = async () => {
    const user = await currentUser();

    return (
        <div>
            <UserInfo
                label="💻 Server component"
                user={user}
            />
        </div>
    )
}
export default Server;
