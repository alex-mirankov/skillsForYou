import React, {Component} from "react";
import "./style.css";

export class SendMessage extends Component {

    constructor(){
        super();
        this.state={
            messagge: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            messagge: event.target.value
        });
    }

    render(){
        return(
            <div className="wind-content">
                <main  className="wind-input">
                    <textarea className="wind-text" onChange={this.handleChange}/>
                </main>
                <div className="wind-buttons">
                    <button className="send-btn">Отправить</button>
                </div>
            </div>
        );
    }
}