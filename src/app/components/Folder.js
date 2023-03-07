import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { Trash3, Folder2 } from 'react-bootstrap-icons';



export const Folder = ({folder, removeFolderById, index}) => {

    return (
        <Card className="my-3" style={{width: "100%", height: "100%"}}>
          <Row className="g-0 folder-card">
            <Col xs={10} className="d-flex flex-row justify-content-start align-items-center folder-label">
                <NavLink to={"/log/"+folder.name}>
                    <Folder2 className="icon ms-2" />
                    <span className="mx-3 folder-text">{folder.name}</span>
                </NavLink>
            </Col>
            <Col xs={2} className="d-flex flex-row justify-content-end align-items-center">  
				      {folder.name !== 'notes' ? <button className="mx-1 folder-button" id={folder.id} onClick={() => removeFolderById(folder.id)}><Trash3 className="icon" /></button> : <span></span>}
            </Col>
          </Row>
        </Card>
    )
}
