import React, { useEffect, useState } from "react";
import Pref from "../../Pref";

import "./DataStructure.css";

export default function DataStructure() {
   const [states, setStates] = useState([
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
   ]);
   const [width, setWidth] = useState(70);

   useEffect(() => {
      setWidth(states.length * 70 || 70);
   }, [width, states]);

   useEffect(() => {
      Pref.onStateChanged.push((newState) => {
         setStates(newState);
      });
   }, []);

   return (
      <div className="t-w b-row">
         <div className="linear-ds-border">
            {/* {states.map((state, index) => {
               return (
                  <div className="linear-ds-item col" key={index}>
                     {state + " " + index}
                  </div>
               );
            })} */}
         </div>
      </div>
   );
}
