import React, {useEffect, useRef, useState} from 'react';
import {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "./HtmlPageHead";
import HomeTopBar from "./layout/home-topbar";
import SideNav from "./layout/side-nav";
import Content from "./layout/content";
import {useRouter} from "next/router";
import Overview from "../pages/overview";
import Requests from "../pages/requests";

function ProtectedLayout({children, title, navBar, user, handleLogout}) {
    const router = useRouter()
    const linkRef = useRef()
    const [links, setLinks] = useState([
        {
            id: 1,
            label: 'Overview',
            key: 'overview',
            path: '/overview',
            classes: 'cursor-pointer rounded-sm hover:bg-blue-400 p-2 hover:text-white ',
            activeClasses: 'bg-blue-400 text-white',
            ref: linkRef,
            component: <Overview></Overview>
        },
        {
            id: 2,
            label: 'Requests',
            key: 'requests',
            path: '/requests',
            classes: 'cursor-pointer rounded-sm hover:bg-blue-400 p-2 hover:text-white ',
            activeClasses: 'bg-blue-400 text-white',
            ref: linkRef,
            component: <Requests></Requests>
        },
    ])
    const handleLinkClick = (e, link) => {
        router.push(link.path)
    }

    return (
        <ProtectRoute>
            <div className="justify-center items-center container mx-auto my-2 space-2">
                <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={title}/>
                <HomeTopBar info={navBar}
                            user={user}
                            classes={`p-6 flex justify-between items-center text-lg bg-blue-500 rounded-lg shadow-lg text-white`}
                            onLogout={handleLogout}/>

                <div className={`my-2`}></div>

                <div className={`grid grid-cols-12 h-screen gap-x-2`}>
                    <SideNav onLinkClick={handleLinkClick}
                             links={links}
                             currentPath={router.pathname}
                    />
                    <Content>
                        {children}
                    </Content>
                </div>

            </div>
        </ProtectRoute>
    );
}

export default ProtectedLayout;

