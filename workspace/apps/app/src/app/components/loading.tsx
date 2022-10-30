import React from "react";

import './loading.scss';

interface Loading {
    src: string;
    width: number;
    height: number;


}

export default function LoadingComponent() {
    return(
        <div>
            <img src={"assets/images/loading.png"} width='20%' height='20%' alt='loading-aimyon' className="loading"/>
        </div>
    )
}
