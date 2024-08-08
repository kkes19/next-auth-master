"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RoleGate} from "@/components/role-gate";
import {FormSuccess} from "@/components/auth/form-success";
import {UserRole} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {admin} from "@/actions/admin";

const Page = () => {
    const onApiRouteClick = () => {
        fetch("/api/admin").then((res) => {
            if (res.ok) {
                toast.success("Allowed API route!");
            } else {
                toast.error("Forbidden API route!");
            }
        })
    }
    const onSeverActionClick = () => {
        admin().then((data) => {
            if (data.error) {
                toast.error(data.error);
            }
            if (data.success) {
                toast.success(data.success);
            }
        })
    }

    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <CardTitle className="text-center text-xl">🔑 Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You can view this content!"/>
                </RoleGate>
                <div className="flex items-center justify-between rounded-lg border p-2 shadow-md">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button
                        onClick={onApiRouteClick}
                    >
                        Click to test
                    </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-2 shadow-md">
                    <p className="text-sm font-medium">Admin-only Server Action</p>
                    <Button
                        onClick={onSeverActionClick}
                    >
                        Click to test
                    </Button>
                </div>
                <></>
            </CardContent>
        </Card>
    )
}
export default Page;
