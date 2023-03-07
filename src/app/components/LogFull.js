import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    selectAllBabbles,
    selectAllFolders,
    logOut,
} from '../../features/babble/babbleSlice';
import { Card, Row, Modal, Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash3, Folder2 } from 'react-bootstrap-icons';
import '../../App.css';

export const LogFull = () => {
    const { babbleID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const babbles = useSelector(selectAllBabbles);
    const folders = useSelector(selectAllFolders);
    const myBabble = babbles.find(babble => babble.id === parseInt(babbleID));
    const displayStr = myBabble.babble;
    const [show, setShow] = useState(false);

    const removeBabble = async () => {
        await fetch("/babble/home", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ babbleID }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                navigate("/folders");
            } else {
                dispatch(logOut());
            }
        })
    }

    const updateFolder = async (folder) => {
        setShow(false);
        await fetch("/babble/update-folder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                folder,
                babbleID 
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                console.log("Changed folder");
            } else {
                dispatch(logOut());
            }
        })
    }

    return (
        <Card className="my-3" style={{width: "80%", backgroundColor: "#ffef00"}}>
          <Row className="g-0">
            <Card.Body>
              <Card.Title className="post-title transcript-text" style={{fontWeight: "700"}}>{displayStr}</Card.Title>
              <div className="d-flex flex-row justify-content-end align-items-center">
                <button className="mx-1 folder-button" onClick={() => setShow(true)}><Folder2 className="icon" /></button>
                <Modal show={show} onHide={() => setShow(false)} centered className="d-flex justify-content-center ">
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-text">Select Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-text">
                        <DropdownButton variant='secondary' title='Folder' onSelect={function(evt){updateFolder(evt)}}>
                            {folders.map(folder =>
                            <Dropdown.Item eventKey={folder.name}>{folder.name}</Dropdown.Item>    
                            )}
                        </DropdownButton>
                    </Modal.Body>
                </Modal>
                <button className="mx-1 folder-button" onClick={() => removeBabble()}><Trash3 className="icon" /></button>
              </div>
            </Card.Body>
          </Row>
        </Card>
    )
}