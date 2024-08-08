import React from 'react'
import {Card, CardContent} from "@/components/ui/card";
import {BeatLoader} from "react-spinners";

const Loader = () => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardContent className="flex justify-center items-center p-6">
                <BeatLoader />
            </CardContent>
        </Card>
    )
}
export default Loader
