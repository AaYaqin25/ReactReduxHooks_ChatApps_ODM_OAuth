import '../styling/all.css'
import React, { useState, useCallback } from "react"
import ReactMarkdown from 'react-markdown'

export default function ChatBody(props) {
    const [show, setShow] = useState(false)
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
                    <button type='button' className='btn btn-light' onClick={props.delete}><i className="fa-regular fa-trash-can"></i></button>
                }
                <span id='span-chat'><ReactMarkdown children={props.chat} /> </span>
            </div>
        )

    } else if (props.sent === false && sender === _id) {
        return (
            <div id="chat-body" ref={setRef} className="d-flex justify-content-end mb-4">
                <button type='button' className='btn btn-light' onClick={props.resend}><i className="fa-solid fa-arrows-rotate"></i></button>
                <span id='span-chat'><ReactMarkdown children={props.chat} /> </span>
            </div>
        )
    } else {
        return (
            <div id="chat-bodyreciver" ref={setRef} className="d-flex justify-content-end mb-4">
                <span id='span-chat'><ReactMarkdown children={props.chat} /> </span>
            </div>
        )
    }
}

