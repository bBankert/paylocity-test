import { useState } from "react";


const Dependent = (props) => {
    return (
        <div className="dependent">
            <span><strong>{props.Name}</strong></span>
            <span>{props.Type}</span>
         </div>
        );
}


export default Dependent;