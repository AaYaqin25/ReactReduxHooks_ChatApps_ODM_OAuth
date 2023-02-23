import React, { useEffect, useState } from "react"
import ContactItem from "../components/ContactItem"
import { request } from '../utils/api';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadContact } from "../actions/contact";

export default function ContactList(props) {
    const contacts = useSelector((state) => state.contacts.data)
    let notification = useSelector((state) => state.notification.notif)

    const dispatch = useDispatch()

    const [redirect, setRedirect] = useState(false)
    const [contactActive, setContactActive] = useState('');

    useEffect(() => {
        dispatch(loadContact())
    }, [dispatch])

    const LogOut = async () => {
        try {
            await request.get('users/signout')
            localStorage.removeItem('user')
            request.defaults.headers.common['Authorization'] = null
            setRedirect(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectContact = (target) => {
        setContactActive(target);
        props.formChat(target)
    };

    console.log(notification, 'ini notif');

    return (
        <div className="col-sm-3 col-xs-12">
            <div className="col-inside-lg chat">
                <div className="chat-users">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Contacts</h2>
                        </div>
                        <div id='card-body' className='card-body'>
                            {contacts.map((item, index) => (
                                <ContactItem
                                    key={index}
                                    contact={item}
                                    selected={contactActive}
                                    set={() => handleSelectContact(item)}
                                    notification={notification}
                                    readStatus={props.readStatus}
                                />
                            ))}
                        </div>
                        <div className='card-footer'>
                            <button type='button' className='btn btn-light' style={{ marginLeft: 70, color: 'red', fontWeight: 'bold', borderColor: 'red' }} onClick={LogOut} > LOG OUT</button>
                            {
                                redirect && (
                                    <Navigate to='/' replace={true} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

