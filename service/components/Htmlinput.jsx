import React from 'react';

const HtmlInput = ({classes, defaultValue, type, name, placeholder, refObject, useFormObject, handleClick}) => {
    return (
        <input
            name={name}
            defaultValue={defaultValue}
            className={classes}
            type={type}
            ref={refObject}
            placeholder={placeholder}
            {...useFormObject}
        />
    );
};

export default HtmlInput;
