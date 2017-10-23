import React from 'react';

export default class extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            recipient: '',
            subject: '',
            body: '',
        }
        this.recipientChangeHandler = this.recipientChangeHandler.bind(this);
        this.subjectChangeHandler = this.subjectChangeHandler.bind(this);
        this.bodyChangeHandler = this.bodyChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    recipientChangeHandler (evt) {
        this.setState({
            recipient: evt.target.value
        });
    }

    subjectChangeHandler (evt) {
        this.setState({
            subject: evt.target.value
        });
    }

    bodyChangeHandler (evt) {
        this.setState({
            body: evt.target.value
        });
    }

    submitHandler (evt) {
        const { onSend } = this.props;
        onSend(this.state);
    }

    render () {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <label>To:</label>
                    <input type="text" id="recipient-field" name="recipient" onChange={this.recipientChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Subject:</label>
                    <input type="text" id="subject-field" name="subject" onChange={this.subjectChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Body:</label>
                    <textarea id="body-field" name="body" onChange={this.bodyChangeHandler} />
                </div>
                <button type="submit">Send Message</button>
            </form>
        );
    }

}
