import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export const LogDisplay = ({babble, babbleID}) => {
    const displayStr = babble.babble.substring(0, 20);
    return (
        <Card className="my-3" style={{width: "100%", backgroundColor: "#ffef00"}}>
          <Row className="g-0">
          <NavLink to={"/log/babble-full/"+babbleID}>
            <Card.Body>
              <Card.Title className="post-title text-center transcript-text" style={{fontWeight: "700"}}>{displayStr}</Card.Title>
            </Card.Body>
          </NavLink>
          </Row>
        </Card>
    )
}