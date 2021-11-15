import React, { useState } from "react";
import AceEditor from "react-ace";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import "./Editor.css";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-";
import Pref from "../../Pref";

const server = "http://localhost:5000/";

const defaultCode = `

const SIMArray = require("../lib/SIMArray");

arr = new SIMArray()
for(let i = 0;i<10;i++){
    arr.push(i);
}
console.log(arr);

`;

function ButtonSpinner({ loading, runCode }) {
   if (loading) {
      return (
         <Button variant="light" disabled>
            <Spinner
               animation="border"
               size="sm"
               role="status"
               aria-hidden="true"
            />
         </Button>
      );
   } else {
      return (
         <Button variant="light" onClick={runCode}>
            Run
         </Button>
      );
   }
}

export default function Editor() {
   const [code, setCode] = useState(defaultCode);
   const [output, setOutput] = useState("");
   const [loading, setLoad] = useState(false);
   const [consoleBG, setConsoleBG] = useState("light");

   const runCode = () => {
      setLoad(true);
      fetch(server + "execute", {
         body: JSON.stringify({
            code: code,
         }),
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         },
         method: "POST",
      })
         .then((res) => res.json())
         .then(
            (result) => {
               // console.log(result);
               // setOutput(result["output"] + "\n");
               if (result["isError"] === true) {
                  setConsoleBG("danger");
               } else {
                  setConsoleBG("success");
               }
               setOutput(result["output"]);
               Pref.states = result["states"];
               Pref.stateInvoke();
               // console.log(result["states"]);
               setLoad(false);
            },
            (error) => {
               // console.error(error);
               setConsoleBG("danger");
               setOutput(error);
               setLoad(false);
            }
         );
   };

   function Console() {
      return (
         <div className={"bg-" + consoleBG}>
            <div className="console">
               <textarea
                  name="console"
                  id="console"
                  cols="45"
                  rows="20"
                  className="resize-none console-text"
                  value={output + ">>"}
                  readOnly={true}
                  wrap={"true"}
               ></textarea>
            </div>
         </div>
      );
   }

   return (
      <Container className="editor-container bg-light ">
         <Row>
            <div className="editor-option-container bg-secondary">
               <ButtonSpinner
                  loading={loading}
                  runCode={runCode}
               ></ButtonSpinner>
               <Button variant="light">Reset</Button>
            </div>
         </Row>
         <Row className="border border-warning">
            <Col className="my-3 ">
               <AceEditor
                  className="border border-3 "
                  // theme="theme-chrome"
                  mode="javascript"
                  keyboardHandler="vim"
                  fontSize={18}
                  height="70vh"
                  width="100vh"
                  defaultValue={code}
                  wrapEnabled={true}
                  enableLiveAutocompletion={true}
                  onChange={(newCode) => {
                     setCode(newCode);
                  }}
               ></AceEditor>
            </Col>
            <Col className="my-3 ">
               <div className="e-line"></div>
            </Col>
            <Col xs={4} className="my-3 ">
               <Console></Console>
            </Col>
         </Row>
      </Container>
   );
}
