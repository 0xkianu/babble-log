import { React, useEffect, useState } from "react";
import { Folder } from './Folder';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAllFolders,
    setFolders,
    setBabbles,
    addFolder,
    logOut,
} from '../../features/babble/babbleSlice';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FolderPlus } from 'react-bootstrap-icons';

export const Folders = () => {
    const folders = useSelector(selectAllFolders);
    const dispatch = useDispatch();
    const [newFolder, setNewFolder] = useState();
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [ alertMsg, setAlertMsg] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchFoldersToState = async () => {
        await fetch("/babble/folders")
            .then(response => response.json())
            .then((json) => {
                if(json.isLoggedIn) {
                    dispatch(setFolders(json.folders));
                } else {
                    dispatch(logOut());
                } 
            });
    }

    const fetchBabblesToState = async () => {
        await fetch("/babble/home")
            .then(response => response.json())
            .then((json) => {
                if(json.isLoggedIn) {
                    dispatch(setBabbles(json.babbleLog));
                } else {
                    dispatch(logOut());
                } 
            });
    }

    const removeFolderById = async (folderID) => {
        
        await fetch("/babble/folders", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ folderID }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                dispatch(setFolders(json.folders));
                dispatch(setBabbles(json.babbles));
            } else {
                dispatch(logOut());
            }
        })
    }

    const createFolder = async () => {
        await fetch('/babble/folders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                folderName: newFolder,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw "Invalid Folder Name";
            }
            return response.json();
        })
        .then((json) => {
            if(json.isLoggedIn) {
                dispatch(addFolder(json.folder));
                handleClose();
            } else {
                dispatch(logOut());
            }
        })
        .catch(error => {
            handleClose();
            setAlertMsg(error);
            setShowAlert(true);
        });   
    }

    useEffect(() => {
        fetchFoldersToState();
        fetchBabblesToState();
    }, [])

    return(
        <div className="d-flex flex-column align-items-center" style={{width: "300px"}}>
            <button className="mx-3 folder-plus-button" onClick={handleShow}><FolderPlus className="icon-plus" /></button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                <Modal.Title className="modal-text">New Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-text">
                <InputGroup>
                    <FormControl
                        type="input"
                        onChange = {(event) => {
                            setNewFolder(event.target.value);
                        }}
                        onKeyDown={event => {
                        if (event.key === "Enter" && newFolder) {
                            createFolder();
                        }
                        }}
                    />
                </InputGroup>
                </Modal.Body>
            </Modal>
            <Modal show={showAlert} onHide={() => setShowAlert(false)} centered className="d-flex justify-content-center ">
                <Modal.Header closeButton>
                    <Modal.Title className="modal-text">ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-text">{alertMsg}</Modal.Body>
            </Modal>
           {folders.map((folder) => 
                <Folder folder={folder} removeFolderById={removeFolderById} key={folder.id} />
            )} 
        </div>
    )

}