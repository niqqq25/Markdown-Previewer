import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js"

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

ReactDOM.render(
    <App />,
    document.body
);