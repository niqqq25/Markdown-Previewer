const inputText = "# Header1\n## Header2\n[Link](https://google.com)\nCode: `console.log('hi')`\n**Bold text**\n```\nCode\nblock\n```\n> Quoted text\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- Item1\n- Item2";

//link opens new window
marked.Renderer.prototype.link = function(href, title, text) {
    var out = '<a href="' + escape(href) + '"' + " target=_'blank'";
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };
//adds linebreaks
marked.Lexer.prototype.lex = function(src) {
    src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/[\w\<][^\n]*\n+/g,function(m){
        return /\n{2}/.test(m) ? m : m.replace(/\s+$/,"")+"  \n";
    });
    return this.token(src, true);
};

class App extends React.Component {
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

class Editor extends React.Component {
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

class Preview extends React.Component {
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

function Header(props){
    const name = props.name;
    const maxView = props.maxView;
    const icon = ["fa-edit", "fa-file", "fa-expand-arrows-alt", "fa-compress-arrows-alt"];
    return (
        <header className="header">
            <i class={"fas " + ((name=="editor") ? icon[0] : icon[1])}></i>
            <p>{props.name}</p>
            <i class={"min-max-icon fas " + (!maxView ? icon[2] : icon[3])} onClick={() => props.setView(name)}></i>
        </header>
    );
}

ReactDOM.render(
    <App />,
    document.body
);