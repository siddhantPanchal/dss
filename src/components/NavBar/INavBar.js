import React, { useState } from "react";
import { Accordion, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";

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
         <Navbar variant="dark" className="navb">
            <div className="menu-button-container">
               <button onClick={handleShow} className="menubtn t-w">
                  Menu
               </button>
            </div>
            <DSList show={show} handleClose={handleClose}></DSList>
            <div className="d-flex">
               <Navbar.Brand
                  style={{
                     color: "white",
                  }}
               >
                  Data Structure Sim
               </Navbar.Brand>
               <Nav>
                  <NavDropdown title="File">
                     <NavDropdown.Item eventKey="save">Save</NavDropdown.Item>
                     <NavDropdown.Item eventKey="saveAs">
                        Save As
                     </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="View">
                     <NavDropdown.Item eventKey="save">Save</NavDropdown.Item>
                     <NavDropdown.Item eventKey="saveAs">
                        Save As
                     </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Help">
                     <NavDropdown.Item eventKey="save">Save</NavDropdown.Item>
                     <NavDropdown.Item eventKey="saveAs">
                        Save As
                     </NavDropdown.Item>
                  </NavDropdown>
                  {/* // <Nav.Item>View</Nav.Item> */}
                  {/* // <Nav.Item>Help</Nav.Item> */}
               </Nav>
            </div>
         </Navbar>
      </div>
   );
}
