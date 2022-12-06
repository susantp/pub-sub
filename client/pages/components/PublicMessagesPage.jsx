// 1
import axios from 'axios';
import React, {Component, useEffect, useRef, useState} from 'react';
import useEcho from "../../lib/useEcho";
import Messagebox from "./Messagebox";
import Axios from "axios";
import Pusher from "pusher-js";

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        this.userRef = React.createRef()
        this.messageRef = React.createRef()
    }


    componentDidMount() {
        Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

        const pusher = new Pusher('c6f1bdd5a5479edbc6f3', {
            cluster: 'us3',
            encrypted: true
        });
        const channel = pusher.subscribe('public.room');

        channel.bind('message.new', (data) => {
            console.log('subscribed data ', data)
            this.setState({messages: [...this.state.messages, data]})
        })
    }

    handleSendMessage = async (e) => {
        e.preventDefault()
        const user = this.userRef.current.value
        const message = this.messageRef.current.value
        await axios.post('http://localhost/api/post-message', {user, message}).then(response => {
            console.log('posted')
            // console.log(messages)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const {state: {messages}, userRef, messageRef, handleSendMessage} = this
        return (
            <div>
                <div>
                    <div>
                        <h1>Public Space</h1>
                        <p>Post your random thoughts for the world to see</p>
                    </div>
                    <div>
                        {messages.map((message) => (
                            // <Messagebox key={message.id} message={message} />
                            <h2 key={message.id}>{message.user}</h2>
                        ))}
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
        );
    }
}

MyComponent.propTypes = {};

export default MyComponent;

/*
export default function PublicMessagesPage() {
    const userRef = useRef()
    const messageRef = useRef()
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

        const pusher = new Pusher('c6f1bdd5a5479edbc6f3', {
            cluster: 'us3',
            encrypted: true
        });
        const channel = pusher.subscribe('public.room');

        channel.bind('message.new', (data) => {
            console.log('subscribed data ', data)
        })
    }, []);
    async function handleSendMessage(e) {
        e.preventDefault()
        const user = userRef.current.value
        const message = messageRef.current.value
        await axios.post('http://localhost/api/post-message', {user, message}).then(response => {
            console.log('posted')
            // console.log(messages)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div>
                <div>
                    <h1>Public Space</h1>
                    <p>Post your random thoughts for the world to see</p>
                </div>
                <div>
                    {messages.map((message) => (
                        // <Messagebox key={message.id} message={message} />
                        <h2 key={message.id}>{message.user}</h2>
                    ))}
                    {/!*{messages.length}*!/}
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
}*/
