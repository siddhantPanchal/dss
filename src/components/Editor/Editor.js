import React, { useState } from "react";
import AceEditor from "react-ace";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import "./Editor.css";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";

const server = "http://localhost:5000/";

export default function Editor() {
   const [code, setCode] = useState("console.log('something')");
   const [output, setOutput] = useState(">");
   const [loading, setLoad] = useState(false);

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
               setOutput(result["output"]);
               setLoad(false);
            },
            (error) => {
               console.error(error);
               setLoad(false);
            }
         );
   };

   function Console() {
      return (
         <div className="console">
            <textarea
               name="console"
               id="console"
               cols="45"
               rows="20"
               className="resize-none console-text"
               value={output + ">"}
               readOnly={true}
            ></textarea>
         </div>
      );
   }

   function ButtonSpinner() {
      if (loading) {
         return (
            <Button variant="dark" disabled>
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
            <Button variant="dark" onClick={runCode}>
               Run
            </Button>
         );
      }
   }

   return (
      <Container className="editor-container">
         <Row>
            <div className="editor-option-container">
               <ButtonSpinner></ButtonSpinner>
               <Button variant="dark">Reset</Button>
            </div>
         </Row>
         <Row>
            <Col>
               <AceEditor
                  className="border border-3"
                  theme="dracula"
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
            <Col>
               <div className="e-line"></div>
            </Col>
            <Col xs={4}>
               <Console></Console>
            </Col>
         </Row>
      </Container>
   );
}
