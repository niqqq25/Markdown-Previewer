import React from "react";
import Header from "./header.js"

const inputText = "# Header1\n## Header2\n[Link](https://google.com)\nCode: `console.log('hi')`\n**Bold text**\n```\nCode\nblock\n```\n> Quoted text\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- Item1\n- Item2";

export default class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: "editor",
            value: inputText
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount(){
        this.props.shareInput(this.state.value);
    }
    handleInputChange(e){
        this.setState({
            value: e.target.value
        }, () => {
            this.props.shareInput(this.state.value);
        });
    }
    render () {
        if(!this.props.disabled){
            return(
                <div id="editor-wrapper" className={(this.props.maxView ? "max-view" : "")}>
                    <Header name={this.state.type} maxView={this.props.maxView} setView={this.props.setView}/>
                    <textarea id="editor" spellCheck="false" onChange={this.handleInputChange} value={this.state.value}></textarea>
                </div>
            );
        }
        else{
            return(null);
        }
    }
}