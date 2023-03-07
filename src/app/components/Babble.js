import { useRef, useState } from "react";
import { logOut } from '../../features/babble/babbleSlice';
import { useDispatch } from 'react-redux';
import { Container, Modal, ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import micIcon from "../../images/microphone.png";
import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Babble = () => {
    const dispatch = useDispatch();
    const commands = [
        {
            command: "reset reset",
            callback: () => {
                babbleReset();
            },
            matchInterim: true,
        },
        {
            command: "stop stop",
            callback: () => {
                babbleStop();
            },
            matchInterim: true,
        },
        {
            command: "random quote",
            callback: () => {
                test();
            },
            matchInterim: true,
        },
    ];

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [isListening, setIsListening] = useState(false);
    const [quote, setQuote] = useState('');
    const [show, setShow] = useState(false);
    const micRef = useRef(null);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
          <div>
            Speech Recognition is not supported by browser.
          </div>
        );
    }

    const babbleListen = () => {
        setQuote('');
        setIsListening(true);
        micRef.current.classList.add("listening");
        SpeechRecognition.startListening({continuous: true,});
    };

    const babbleStop = () => {
    setIsListening(false);
    micRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    };

    const babbleReset = () => {
    setQuote('');
    babbleStop();
    resetTranscript();
    };

    const getQuote = async () => {
        babbleReset();
        await fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then((json) => {
                setQuote(json.content + " -" + json.author);
        });
    }

    const saveBabble = async () => {
        let babble;
        if(transcript) {
            babble = transcript;
            babble = babble.replace('stop stop','');
        } else {
            babble = quote;
        }
        await fetch('/babble/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                babble: babble,
                folder: 'notes',
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                babbleReset();
            } else {
                dispatch(logOut());
            }
        })   
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container fluid="xs">
            <Row>
                <div className="d-flex flex-column align-items-center">
                    <div className="mic-icon-container" onClick={babbleListen} ref={micRef}>
                        <img src={micIcon} className="mic-icon" />
                    </div>
                    <div className="mt-4">
                    {isListening ? <button className="babble-btn btn2" onClick={babbleStop}>Stop</button> : <span className="handwriting-text">Click Mic to Listen</span>} 
                    </div>
                    <div>
                        <a onClick={handleShow} className="handwriting-text">Voice Commands</a>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title className="modal-text">Voice Commands</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="modal-text">"reset reset" : Reset the transcript</ListGroup.Item>
                                    <ListGroup.Item className="modal-text">"stop stop" : Stop listening</ListGroup.Item>
                                    <ListGroup.Item className="modal-text">"random quote" : Get a random quote</ListGroup.Item>
                                </ListGroup>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className="my-4 mx-3">
                        <p className="transcript-text" style={{color: "white"}}>{transcript || quote}</p>
                    </div>  
                    {(transcript || quote) ? <div><button className="babble-btn btn1 mx-3" onClick={saveBabble}>Save</button><button className="babble-btn btn1 mx-3" onClick={babbleReset}>Reset</button></div> : <div></div>}
                    <div>
                        <button className="babble-btn btn3 my-3" onClick={getQuote}>Random Quote</button>
                    </div>                 
                </div>
            </Row>
        </Container>
    )

}