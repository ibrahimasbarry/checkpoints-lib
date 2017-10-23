import React from 'react';
import Message from './Message';
import store from '../redux/store';

export default class extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: []
        };
    }

    render() {
        const { messages } = this.state;
        const messageListArr = messages.map(message => (
            <Message key={message.id} fullMessage={message} />
        ));
        return (
            <div>
                <h1>Inbox</h1>
                { messageListArr }
            </div>
        );
    }

}
