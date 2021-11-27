import React, { useEffect, useState } from "react";
import { Accordion, Col, Row, Button, Container } from "react-bootstrap";

import Pref from "../../Pref";
import DataStructure from "../DataStructure/DataStructure";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";

import "./Simulator.css";

let index = 0;
let maxLength = 0;
let ID;

export default function Simulator() {
   const [states, setStates] = useState([]);
   const [isPlaying, setIsPlaying] = useState(false);
   const [activeIndex, setActiveIndex] = useState(index);

   useEffect(() => {
      Pref.onStateChanged.push(() => {
         setStates(Pref.states);
         maxLength = Pref.states?.length;
      });
   }, []);

   useEffect(() => {
      console.log(activeIndex);
   });

   const stop = () => {
      if (ID) {
         clearInterval(ID);
         ID = undefined;
      }
      setIsPlaying(false);
   };

   const play = () => {
      ID = setInterval(() => {
         index += 1;
         if (index > maxLength - 1) {
            stop();
         } else {
            setActiveIndex(index);
         }
         // console.log(index);
      }, 1000);

      setIsPlaying(true);
   };

   function ToggleButton() {
      if (isPlaying) {
         return (
            <Button variant="light" onClick={stop}>
               <FaPause size="1em" />
            </Button>
         );
      } else {
         return (
            <Button variant="light" onClick={play}>
               <FaPlay size="1em" />
            </Button>
         );
      }
   }

   return (
      <div className="s-container">
         <div className="record-container border border-3 border-dark bg-light">
            <div>
               <h5>Records</h5>
            </div>
            <div className="record border border-1 border-dark bg-white">
               <Accordion defaultActiveKey="0">
                  {states.map((value, key) => {
                     return (
                        <Accordion.Item eventKey={key} key={key}>
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
                                          setActiveIndex(key);
                                          console.log(key);
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
            <div className="w-75 bg-secondary rounded h-12 d-center">
               <Container>
                  <Row>
                     <Col>
                        <Button
                           variant="light"
                           onClick={() => {
                              if (ID) clearInterval(ID);
                              if (index > 0) {
                                 index -= 1;
                                 setActiveIndex(index);
                              }
                              console.log("active : " + activeIndex);
                           }}
                        >
                           <AiFillBackward size="1.5em" />
                        </Button>
                     </Col>
                     <Col>
                        <ToggleButton />
                     </Col>
                     <Col>
                        <Button
                           variant="light"
                           onClick={() => {
                              if (ID) clearInterval(ID);
                              if (index < maxLength) index += 1;
                              console.log(index);
                           }}
                        >
                           <AiFillForward size="1.5em" />
                        </Button>
                     </Col>
                  </Row>
               </Container>
            </div>
            <div className="record sim border border-1 border-dark bg-white d-center mt-2">
               <DataStructure activeIndex={activeIndex}></DataStructure>
            </div>
         </div>
      </div>
   );
}

// const SIMArray = require("../lib/SIMArray");

// arr = new SIMArray();
// for (let i = 0; i < 2; i++) {
//    arr.push(i);
// }
// arr1 = arr;

// console.log(arr);
// console.log(arr1);

// arr.push(3);

// console.log(arr);
// console.log(arr1);
