import React, {useState} from "react";

const SideNav = ({handleLinkClick}) => {
    const [linkTextCss, setLinkCss] = useState(
        `cursor-pointer rounded-sm hover:bg-blue-400 p-2  hover:text-white`
    )
    const [switchers, setSwitchers] = useState([
        {id: 1, label: 'Overview'},
        {id: 2, label: 'Requests'},
    ])

    const handleSwitcher = (e, switcher) => {
        console.log(switcher)
    }

    return (
        <div className={`col-span-2 p-2 rounded-lg text-lg shadow-lg bg-slate-200`}>
            <div className={`flex flex-col gap-y-2 divide-y divide-white`}>
                {
                    switchers.map(switcher => (
                        <div
                            key={switcher.id}
                            className={linkTextCss}
                            onClick={(e) => handleSwitcher(e, switcher)}
                        >
                            <p>{switcher.label}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default SideNav