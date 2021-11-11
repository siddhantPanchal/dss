import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import Editor from "../Editor/Editor";
import Simulator from "../Simulator/Simulator";

import "./Main.css";

export default function Main() {
   return (
      <div className="main-container">
         <Tabs
            defaultActiveKey="editor"
            id="editor"
            className="justify-content-center border border-dark"
         >
            <Tab eventKey="editor" title="Code Editor" className="nav-link">
               <Editor></Editor>
            </Tab>
            <Tab eventKey="simulator" title="Simulator" className="nav-link">
               <Simulator></Simulator>
            </Tab>
         </Tabs>
      </div>
   );
}

// Replace Sonnat tag with custom tags like code editor or simulator
