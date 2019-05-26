import React from "react";
import Editor from "./editor.js";
import Preview from "./preview.js";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            maxEditorView: false,
            maxPreviewView: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }
    handleInputChange(input){
        this.setState({inputValue: input});
    }
    handleViewChange(compName){
        if(compName == 'editor'){
            this.setState({maxEditorView: !this.state.maxEditorView});
        }
        else if(compName == 'previewer'){
            this.setState({maxPreviewView: !this.state.maxPreviewView});
        }
    }
    render() {
        return(
            <div id="app" className={(this.state.maxEditorView || this.state.maxPreviewView ? "max-view" : "")}>
                <Editor shareInput={this.handleInputChange} maxView={this.state.maxEditorView} disabled={this.state.maxPreviewView ? true : false} setView={this.handleViewChange}/>
                <Preview input={this.state.inputValue} maxView={this.state.maxPreviewView} disabled={this.state.maxEditorView ? true : false} setView={this.handleViewChange}/>
            </div>
        );
    }
}