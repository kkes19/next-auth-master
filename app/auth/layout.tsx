import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-screen flex items-center justify-center  bg-gradient-to-r from-gray-700 via-gray-900 to-black">
            {children}
        </div>
    )
}
export default Layout
