import React, { useState } from "react";
import AceEditor from "react-ace";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import "./Editor.css";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import Pref from "../../Pref";

const server = "http://localhost:5000/";

function ButtonSpinner({ loading, runCode }) {
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

export default function Editor() {
   const [code, setCode] = useState("console.log('something')");
   const [output, setOutput] = useState("");
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
               // setOutput(result["output"] + "\n");
               setOutput(result["output"] + "\n");
               Pref.states = result["states"];
               Pref.onStateChanged();
               console.log(result["states"]);
               setLoad(false);
            },
            (error) => {
               // console.error(error);
               setOutput(error + "\n");
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
               value={output + ">>"}
               readOnly={true}
               wrap={"true"}
            ></textarea>
         </div>
      );
   }

   return (
      <Container className="editor-container">
         <Row>
            <div className="editor-option-container">
               <ButtonSpinner
                  loading={loading}
                  runCode={runCode}
               ></ButtonSpinner>
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
