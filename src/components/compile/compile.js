import React from 'react';
import './style.css';
import axios from 'axios';
import ButtonAll from '../share/button-all/buttonAll';
import CodeMirror from 'react-codemirror';
import '../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/pascal/pascal';

class Compile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: 'print (\"hello\")',
            language: 'python',
            timeoutMs: 2000,
            responceBack: '',
        }

        this.compileSend = this.compileSend.bind(this);
        this.compileChange = this.compileChange.bind(this);
        this.compileNull = this.compileNull.bind(this);
    }

    compileSend() {
        axios.post('http://127.0.0.1:3000/', this.state)
            .then((responce) => {
                this.setState({
                    responceBack: responce.data[0].combined,
                });
                console.log(responce.data[0].combined);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    compileChange(newCode) {
        this.setState({
            code: newCode,
        })
    }

    compileNull() {
        this.setState({
            toggle: !this.state.toggle,
        });
        console.log(this.state.toggle);
    }

    render() {
        let options = {
            lineNumbers: true,
            mode: "pascal",
        };
        return (
            <div>
                <CodeMirror
                    options={options}
                    value={this.state.code}
                    onChange={this.compileChange}
                />
                <div className="control-compile-buttons">
                    <ButtonAll
                        content={'Сбросить'}
                        action={this.compileNull}
                    />
                    <ButtonAll
                        content={'Отправить'}
                        action={this.compileSend}
                    />
                </div>
                <p className="responce">{this.state.responceBack}</p>
            </div>
        );
    }
}

export default Compile;