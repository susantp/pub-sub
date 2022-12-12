import React from 'react';
import {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";
import HomeTopBar from "../components/layout/home-topbar";
import SideNav from "../components/layout/side-nav";
import Content from "../components/layout/content";

function ProtectedLayout({children, title, navBar, user, handleLogout}) {
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
                    <SideNav/>
                    <Content>
                        {children}
                    </Content>
                </div>

            </div>
        </ProtectRoute>
    );
}

export default ProtectedLayout;

