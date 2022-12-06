// 1
import Axios from 'axios';
import axios from 'axios';

import Echo from 'laravel-echo';
import React, { useEffect, useState, useRef } from 'react';
import Messagebox from './Messagebox';
import Pusher from 'pusher-js';
import {echo, test} from '../../lib/echoConfig'
export default function PublicMessagesPage() {
    const [messages, setMessages] = useState([]);
    const userRef = useRef()
    const messageRef = useRef()
    async function handleSendMessage(e) {
        e.preventDefault()
        const user = userRef.current.value
        const message = messageRef.current.value
        await axios.post('http://localhost/api/post-message', { user, message }).then(response => {
            // console.log(response)
        }).catch(error => {
            console.log(error)
        })
        // echo
        //     .channel('public.room')
        //     .subscribed(() => {
        //         console.log(echo.socketId())
        //         console.log('You are subscribed');
        //     })
        //     // 5
        //     .listen('.message.new', (data) => {
        //         const msg = [...messages, data]
        //         setMessages(msg);
        //         messageRef.current.value = ''
        //         userRef.current.value = ''
        //     });
        console.log(test)
    }
    return (
        <div>
            <div>
                <div>
                    <h1>Public Space</h1>
                    <p>Post your random thoughts for the world to see</p>
                </div>
                <div>
                    {/* {messages.map((message) => (
                        <Messagebox key={message.id} message={message} />
                    ))} */}
                    {messages.length}
                </div>
                <div>
                    <form onSubmit={(e) => handleSendMessage(e)}>
                        <input
                            type="text"
                            placeholder="Set your username"
                            ref={userRef}
                            required
                        />
                        <div>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                ref={messageRef}
                                required
                            />
                            <button onClick={(e) => handleSendMessage(e)}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}