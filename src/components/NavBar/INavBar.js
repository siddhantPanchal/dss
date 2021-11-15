import React, { useState } from "react";
import {
   Accordion,
   Container,
   Nav,
   Navbar,
   NavDropdown,
   Offcanvas,
} from "react-bootstrap";

import "./INavBar.css";

function DSList({ show, handleClose }) {
   return (
      <Offcanvas
         show={show}
         onHide={handleClose}
         // style={{
         //    backgroundColor: "black",
         //    color: "white",
         // }}
      >
         {/* <Offcanvas.Header closeButton closeVariant="white"> */}
         <Offcanvas.Header closeButton>
            <Offcanvas.Title>Data Structure List</Offcanvas.Title>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <Accordion defaultActiveKey="Array">
               <Accordion.Item eventKey="Array">
                  <Accordion.Header className="acc">Array</Accordion.Header>
                  <Accordion.Body className="acc">
                     <Accordion defaultActiveKey="ArrayStack">
                        <Accordion.Item eventKey="ArrayStack">
                           <Accordion.Header>Stack</Accordion.Header>
                           <Accordion.Body></Accordion.Body>
                        </Accordion.Item>
                     </Accordion>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="LinkList">
                  <Accordion.Header>Link List</Accordion.Header>
                  <Accordion.Body>
                     <Accordion defaultActiveKey="LinkListStack">
                        <Accordion.Item eventKey="LinkListStack">
                           <Accordion.Header>Stack</Accordion.Header>
                           <Accordion.Body></Accordion.Body>
                        </Accordion.Item>
                     </Accordion>
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion>
         </Offcanvas.Body>
      </Offcanvas>
   );
}
export default function INavBar() {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <div>
         <Navbar bg="light" variant="light">
            <DSList show={show} handleClose={handleClose}></DSList>
            <Container>
               <Navbar.Brand
                  onClick={handleShow}
                  className="user-select-none c-p"
               >
                  Data Structure Sim
               </Navbar.Brand>
               <Nav className="me-auto">
                  <NavDropdown
                     title="File"
                     className="pe-5 ms-5"
                     menuVariant="secondary"
                  >
                     <NavDropdown.Item>Save</NavDropdown.Item>
                     <NavDropdown.Item>
                        Save As
                     </NavDropdown.Item>
                  </NavDropdown>
                  {/* <NavDropdown title="View" className="pe-5"></NavDropdown> */}
                  {/* <NavDropdown title="Help" className="pe-5"></NavDropdown> */}
               </Nav>
            </Container>
         </Navbar>
      </div>
   );
}
