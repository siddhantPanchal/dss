import React, { useEffect, useState } from "react";
import Pref from "../../Pref";
import "./Simulator.css";

export default function Simulator() {
   const [states, setStates] = useState([]);

   useEffect(() => {
      Pref.onStateChanged = () => {
         setStates(Pref.states);
      };
   }, []);

   function ellipsis(str = "") {
      if (str.length >= 25) {
         return " : " + str.slice(0, 25) + "...";
      }
      return " : "+str;
   }

   return (
      <div className="s-container">
         <div className="record-container border">
            <div>
               <h5>Records</h5>
            </div>
            <div className="record border ">
               {states.map((value, index) => {
                  return (
                     <div className="record-btn d-center" key={index}>
                        <div className="op-text">
                           {value["operation"]}
                        </div>
                        <div>{ellipsis(value["item"])}</div>
                     </div>
                  );
               })}
            </div>
         </div>
         <div className="line"></div>
         <div className="sim-container border"></div>
      </div>
   );
}
