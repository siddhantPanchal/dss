import React, { useEffect, useState } from "react";

import Pref from "../../Pref";

import "./DataStructure.css";

function Render({ state }) {
   // console.log(state);
   if (state === undefined) {
      return <div></div>;
   } else {
      return (
         <div className="w-100 d-box">
            {state?.["obj"]?.map((value, key) => {
               return (
                  <div
                     className="ds-item border border-1 h-75 border-dark"
                     key={key}
                  >
                     {value}
                  </div>
               );
            })}
         </div>
      );
   }
}

export default function DataStructure({ activeIndex }) {
   // console.log(Pref.states?.[Number(activeIndex)]);
   // console.log(activeIndex);
   const state = Pref.states?.[Number(activeIndex)];
   // if(state) {}
   const width = state?.["obj"]?.length * 70 || 70;
   return (
      <div
         className="ds-container "
         style={{
            width: width,
         }}
      >
         <Render state={state}></Render>
      </div>
   );
}
