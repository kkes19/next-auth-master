import React from 'react'
import {BounceLoader} from "react-spinners";

const ImageLoader = () => {
    return (
        <span className="flex h-10 w-10 items-center justify-center">
            <BounceLoader size="16px" />
        </span>
    )
}
export default ImageLoader;
