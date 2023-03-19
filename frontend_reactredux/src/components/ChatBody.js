import '../styling/all.css'
import React, { useState, useCallback } from "react"
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export default function ChatBody(props) {
    const [show, setShow] = useState(false)
    const [modal, setModal] = useState(false)
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const handleShowButton = () => {
        setShow(true)
    }

    const handleHideButton = () => {
        setShow(false)
    }

    const _id = JSON.parse(localStorage.getItem('user'))?.id
    let sender = JSON.parse(localStorage.getItem('user'))?.sender

    if (props.sent === true && props.id === _id) {
        return (
            <div id="chat-body" ref={setRef} className="d-flex justify-content-end mb-4" onMouseEnter={handleShowButton} onMouseLeave={handleHideButton}>
                {
                    show &&
                    <button type='button' className='btn btn-light' onClick={() => setModal(true)}><FontAwesomeIcon icon={faTrashCan} /></button>
                }

                <Modal
                    isOpen={modal}
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h4>Are you sure want to delete this message ?</h4>
                    <hr />
                    <h5 className='msg'>{props.chat}</h5>
                    <button type='button' className='btn btn-danger' onClick={props.delete}>Delete</button>
                    <button type='button' className='btn btn-secondary' onClick={() => setModal(false)}>Cancel</button>
                </Modal>
                
                <span style={{ marginLeft: '10px' }}><ReactMarkdown children={props.chat} />
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <div style={{ marginLeft: '10px' }}>
                            {props.readstatus === false ?
                                <FontAwesomeIcon icon={faCheck} color='white' />
                                :
                                <FontAwesomeIcon icon={faCheckDouble} color='white' />
                            }
                        </div>
                        {props.date}
                    </div>
                </span>
            </div>
        )

    } else if (props.sent === false && sender === _id) {
        return (
            <div id="chat-body" ref={setRef} className="d-flex justify-content-end mb-4">
                <button type='button' className='btn btn-light' onClick={props.resend}><FontAwesomeIcon icon={faRotateRight} /></button>
                <span style={{ marginLeft: '10px' }}><ReactMarkdown children={props.chat} />
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>{props.date}</div>
                </span>
            </div>
        )
    } else {
        return (
            sender === props.receiver ?
                <div id="chat-bodyreciver" ref={setRef} className="d-flex justify-content-end mb-4">
                    <span><ReactMarkdown children={props.chat} />
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>{props.date}</div>
                    </span>
                </div>
                :
                null
        )
    }
}

