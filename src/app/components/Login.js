import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn,setUserAccount } from '../../features/babble/babbleSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [errorVisible, setErrorVisible] = useState('hidden-message');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const AccountLogin = async (event) => {
        event.preventDefault();
        await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                username: username,
                passphrase: passphrase,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setErrorVisible('hidden-message');
                dispatch(logIn());
                dispatch(setUserAccount(username));
                //setUsername('');
                //setPassphrase('');
                navigate("/");
            } else {
                setErrorVisible('visible-message');
            }
        })
    }

    return (
        <Row>
            <Col>
                <div className="d-flex flex-column justify-content-center align-items-center">
                <Form onSubmit={AccountLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label className="handwriting-text">Login Username</Form.Label>
                        <Form.Control type="string" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="handwriting-text">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" autoComplete="on" onChange={(event) => setPassphrase(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                        <input type="submit" hidden />
                        <button className="babble-btn btn1 mx-3" type="submit">Login</button>
                    </Form.Group>
                </Form>
                    <span className="handwriting-text folder-label" onClick={() => navigate("/create-account")} >Don't have an account? Create an account now</span>
                    <p><span className={errorVisible + " handwriting-text"}>Invalid username or password</span></p>
                </div>
            </Col>
        </Row>
        )
}