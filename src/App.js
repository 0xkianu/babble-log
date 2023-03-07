import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { Babble } from "./app/components/Babble";
import { Folders } from "./app/components/Folders";
import { Log } from "./app/components/Log";
import { LogFull } from "./app/components/LogFull";
import { Login } from "./app/components/Login";
import { CreateAccount } from "./app/components/CreateAccount";
import { Protected } from './app/components/Protected';
import { selectIsLoggedIn, selectUserAccount, logOut } from './features/babble/babbleSlice';
import { useSelector, useDispatch } from 'react-redux';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Navbar, Nav } from "react-bootstrap";
import Helmet from 'react-helmet';
import BLlogo from "./images/babble-log.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userAccount = useSelector(selectUserAccount);
  const dispatch = useDispatch();
  
  const accountLogOut = async () => {
    await fetch("/logout")
        .then(response => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                console.log("Still logged in");
            } else {
                dispatch(logOut());
            }
        });
  }
  return (
    <BrowserRouter>
      <Helmet bodyAttributes={{style: 'background-color : black'}}/>
      <Container fluid="xs">
        <Row>
        <Navbar bg="light" variant="light">
            <Nav className="mx-3 ms-auto">
              <span className="nav-container folder-label" onClick={accountLogOut}>Logout</span>
            </Nav>
        </Navbar>
        </Row>
        <Row>
          <div className="d-flex justify-content-center mt-3"><img src={BLlogo}/></div>
        </Row>
        <Row>
          <div className="button-container d-flex justify-content-center my-5"> 
          <NavLink to="/"><button className="babble-btn btn1 mx-3">Babble</button></NavLink>
          <NavLink to="/folders"><button className="babble-btn btn1 mx-3">Log</button></NavLink>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center mt-3">
            <Routes>
              <Route path="/" element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Babble/>
                </Protected>
              } />
              <Route path="/folders" element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Folders />
                </Protected>
              } />
              <Route path="/log/:folder" element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Log />
                </Protected>
              } />
              <Route path="/log/babble-full/:babbleID" element={
                <Protected isLoggedIn={isLoggedIn}>
                  <LogFull />
                </Protected>
              } />
              <Route path="/login" element={
                  <Login />
              } />
              <Route path="/create-account" element={
                  <CreateAccount />
              } />
            </Routes>
          </div>
        </Row>
      </Container>
    </BrowserRouter> 
  );
}

export default App;
