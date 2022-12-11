import React from 'react';

function HtmlLabel({label, htmlFor, classes}) {
    return (
        <label className={classes} htmlFor={htmlFor}>
            {label}
        </label>
    );
}

export default HtmlLabel;