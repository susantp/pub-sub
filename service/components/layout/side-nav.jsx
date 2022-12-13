import React, {useState} from "react";

const SideNav = ({onLinkClick, links, currentPath}) => {
    // console.log(Object.values(links))
    return (
        <div className={`col-span-2 p-2 rounded-lg text-lg shadow-lg bg-slate-200`}>
            <div className={`flex flex-col gap-y-2 divide-y divide-white`}>
                {
                    Object.values(links).map(link => (
                        <div
                            key={link.id}
                            className={currentPath === link.path ? link.classes + link.activeClasses : link.classes}
                            onClick={(e) => onLinkClick(e, link)}
                        >
                            <p>{link.label}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default SideNav