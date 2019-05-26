import React from "react";

export default function Header(props){
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