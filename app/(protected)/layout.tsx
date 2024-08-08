import React, {ReactNode} from 'react'
import {Navbar} from "@/components/protected/navbar";

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="size-full flex flex-col gap-y-4 items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            <Navbar/>
            {children}
        </div>
    )
}
export default Layout
