import * as React from 'react';
import './Button.css';

export const Button = function(props) {
    let classesArr: string[] = ["Button"];
    let classes: string;

    if(props.isActive) {
        classesArr.push('active');
    }

    classes = classesArr.join(' ');

    return (
        <button
            className={classes}
            onClick={() => props.click(props.name)}>
            { props.name }
        </button>
    )
};