import React from 'react';

function Content({children}) {
    return (
        <div className={`col-span-10 p-2 rounded-lg text-lg`}>
            {children}
        </div>
    );
}

export default Content;