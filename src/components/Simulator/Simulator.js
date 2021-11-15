import React, { useEffect, useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";

import Pref from "../../Pref";
import DataStructure from "../DataStructure/DataStructure";

import "./Simulator.css";

export default function Simulator() {
   const [states, setStates] = useState([]);
   const [activeIndex, setActiveIndex] = useState([-1]);
   const [previousActiveIndex, setPreviousActiveIndex] = useState([-1]);

   useEffect(() => {
      Pref.onStateChanged.push(() => {
         setStates(Pref.states);
      });
   }, []);

   function lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
   }

   return (
      <div className="s-container">
         <div className="record-container border border-3 border-dark bg-light">
            <div>
               <h5>Records</h5>
            </div>
            <div className="record border border-1 border-dark bg-white">
               <Accordion defaultActiveKey="0">
                  {states.map((value, index) => {
                     return (
                        <Accordion.Item eventKey={index} key={index}>
                           <Accordion.Header>
                              {value["operation"]}
                           </Accordion.Header>
                           <Accordion.Body>
                              <Row>
                                 <Row className="mb-3">
                                    <Col>Operation : {value["operation"]}</Col>
                                 </Row>
                                 <hr />
                                 <Row>
                                    <Col
                                       className="c-p"
                                       onClick={() => {
                                          setPreviousActiveIndex(activeIndex);
                                          setActiveIndex(index);
                                       }}
                                    >
                                       On : {value["item"]}
                                    </Col>
                                 </Row>
                              </Row>
                           </Accordion.Body>
                        </Accordion.Item>
                     );
                  })}
               </Accordion>
            </div>
         </div>
         <div className="line"></div>
         <div className="sim-container border border-3 border-dark bg-light">
            <div>
               <h5 className="sim-header">Simulator</h5>
            </div>
            <div className="sim border border-1 border-dark bg-white d-center">
               <DataStructure activeIndex={previousActiveIndex}></DataStructure>
               <DataStructure activeIndex={activeIndex}></DataStructure>
            </div>
         </div>
      </div>
   );
}
