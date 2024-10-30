import React from "react";
import Style from "./Loading.module.css"
import { Audio } from "react-loader-spinner";

function Loading() {
    return <>
<div className={`position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center main-color ${Style.loading}`}  >
<Audio height="20" width= "80" raduis = "9"  ariaLabel="three-dots-loading" wrapperClass wrapperStyle/>
</div>
    </> 
    ;
}

export default Loading;