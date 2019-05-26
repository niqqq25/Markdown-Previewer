import React from "react";
import Header from "./header.js"

export default class Preview extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: "previewer"
        };
    }
    getMarkdownText() {
        var rawMarkup = marked(this.props.input, {sanitize: true});
        return { __html: rawMarkup };
      }
    render () {
        if(!this.props.disabled){
            return (
                <div id="preview-wrapper" className={(this.props.maxView ? "max-view" : "")}>
                    <Header name={this.state.type} maxView={this.props.maxView} setView={this.props.setView}/>
                    <div id="preview" dangerouslySetInnerHTML={this.getMarkdownText()}/>
                </div>
            );
        }
        else{
            return(null);
        }
    }
}