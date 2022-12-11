import React from 'react';

const HtmlInput = ({
                       classes,
                       defaultValue,
                       type,
                       name,
                       minLength,
                       maxLength,
                       placeholder,
                       refObject,
                       useFormObject,
                       helpText,
                       handleClick
                   }) => {
    return (
        <>
            <input
                name={name}
                defaultValue={defaultValue}
                className={classes}
                type={type}
                ref={refObject}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder}
                {...useFormObject}
            />
            <small className={`text-sm text-green-500 px-2 `}>{helpText}</small>
        </>
    );
};

export default HtmlInput;
