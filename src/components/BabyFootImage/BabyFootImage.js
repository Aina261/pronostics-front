import React from "react";

function BabyFootImage () {
    return (
        <div className="image">
            <img src={`${window.location.origin}/baby-foot.png`} alt="" width={"250px"} className={"mb-5"}/>
        </div>
    )
}

export default BabyFootImage;
