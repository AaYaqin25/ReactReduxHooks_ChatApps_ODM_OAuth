import '../styling/all.css'
import React, { Fragment, useState, useEffect } from "react"
import { IsLoggedIn } from "../utils/api"
import ContactList from './ContactList';
import socket from '../socket';
import ChatBody from '../components/ChatBody';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, addMessage, loadChat, removeChat, removeMessage, resendChat } from '../actions/chats';
import { notification, removeNotification } from '../actions/notification';

export default function FormChat() {
    const chatMessage = useSelector((state) => state.chats.data)
    const dispatch = useDispatch()

    const [chat, setChat] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [readStatus, setReadStatus] = useState(false)
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        dispatch(loadChat())
        socket.on('connect', () => {
            socket.emit('join room', JSON.parse(localStorage.getItem('user'))?.username)
            setIsConnected(true);
        });

        socket.on('receive message', (data) => {
            if (readStatus === false) {
                dispatch(notification(data))
            } else {
                dispatch(addMessage({ _id: data._id, message: data.message, time: data.time }))
            }
        })

        socket.on('delete message', (id) => {
            dispatch(removeMessage(id))
        })

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('receive message');
            socket.off('delete message');
            socket.off('receive notification')
            socket.off('disconnect');

        };
    }, [dispatch, readStatus]);


    const handleFormChat = (target) => {
        setChat(true)
        setName(target)
        setReadStatus(true)
        dispatch(removeNotification([]))
    }

    const submitChat = (e) => {
        e.preventDefault()
        dispatch(addChat(message, name))
        setMessage('')
    }

    const resendMessage = (_id, message, sender, name) => {
        dispatch(resendChat(_id, message, sender, name))
        setMessage('')
    }

    console.log(isConnected);
    return (
        <Fragment>
            <IsLoggedIn />
            <div className="container">
                <div className="row row-broken">
                    <ContactList formChat={handleFormChat} notification={notification} readStatus={readStatus} />
                    {
                        chat ?
                            <div className="col-sm-9 col-xs-12" >
                                <div className="col-inside-lg">
                                    <div className='card'>
                                        <div id='card-header' className='card-header text-center'>
                                            <h4>{name}</h4>
                                        </div>

                                        <form className='form-control' onSubmit={submitChat}>
                                            <div id='card-body2' className='card-body'>
                                                {
                                                    chatMessage.map((item) => {
                                                        return (
                                                            <ChatBody key={item._id} chat={item.message} id={item.sender} sent={item.sent} date={item.date} time={item.time} delete={() => dispatch(removeChat(item._id, name))} resend={() => resendMessage(item._id, item.message, JSON.parse(localStorage.getItem('user'))?.sender, name)} />
                                                        )

                                                    })
                                                }
                                            </div>
                                            <div className='card-footer'>
                                                <div class="row">
                                                    <div class="col">
                                                        <input type='text' autoFocus={true} style={{ display: 'flex', borderWidth: 1, borderRadius: '100px', width: '180%', height: '100%', paddingLeft: '3%', borderColor: 'black' }} placeholder='Write a message...' id='inputchat' name='inputchat' autoComplete='off' value={message} onChange={(e) => setMessage(e.target.value)} />
                                                    </div>
                                                    <div class="col">
                                                        <button type='submit' style={{ display: 'flex', marginLeft: '80%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 20, height: '35px', width: '35px', backgroundColor: '#0c8bee', color: 'white', borderColor: 'white' }}><i className="fa-regular fa-paper-plane"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-sm-9 col-xs-12" >
                                <div className="col-inside-lg">
                                    <div className='card'>
                                        <div id='card-header' className='card-header'>
                                            <h2>Reciever Name</h2>
                                        </div>
                                        <div id='card-begin' className='card-body'>
                                            <h4 style={{ textAlign: 'center', color: 'grey', paddingTop: '35%' }}>Select a chat to start messaging</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div >
        </Fragment >
    )

}