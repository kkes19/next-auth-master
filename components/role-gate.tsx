"use client";

import {ReactNode} from "react";
import {UserRole} from "@prisma/client";
import {useCurrentRole} from "@/hooks/use-current-role";
import {FormError} from "@/components/auth/form-error";

interface RoleGateProps {
    children?: ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
    const role = useCurrentRole()

    if (role !== allowedRole){
        return <FormError message="You don't have permission to view this content!." />

    }

    return (
        <>
            {children}
        </>
    )
}
