import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Pref from "../../Pref";
import DataStructure from "../DataStructure/DataStructure";

import "./Simulator.css";

export default function Simulator() {
   const [states, setStates] = useState([]);

   useEffect(() => {
      Pref.onStateChanged.push(() => {
         setStates(Pref.states);
      });
   }, []);

   function ellipsis(str = "") {
      if (str.length >= 25) {
         return " : " + str.slice(0, 25) + "...";
      }
      return " : " + str;
   }

   return (
      <div className="s-container">
         <div className="record-container border border-3 border-dark bg-light">
            <div>
               <h5>Records</h5>
            </div>
            <div className="record border border-1 border-dark bg-white">
               {states.map((value, index) => {
                  return (
                     <div className="record-btn d-center" key={index}>
                        <div className="op-text">{value["operation"]}</div>
                        <div>{ellipsis(value["item"])}</div>
                     </div>
                  );
               })}
            </div>
         </div>
         <div className="line"></div>
         <div className="sim-container border border-3 border-dark bg-light">
            <div>
               <h5 className="sim-header">Simulator</h5>
            </div>
            <div className="sim border border-1 border-dark bg-white">
               <DataStructure></DataStructure>
            </div>
         </div>
      </div>
   );
}
