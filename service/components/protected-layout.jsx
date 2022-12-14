import React, {useContext} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "./HtmlPageHead";
import HomeTopBar from "./layout/home-topbar";
import SideNav from "./layout/side-nav";
import {useRouter} from "next/router";
import useSchema from "../hooks/useSchema";

function ProtectedLayout({children, title}) {
    const router = useRouter()
    const {pages, topBarComponent, loginPage} = useSchema()
    const {doLogout, user} = useContext(AuthContext);
    const handleLinkClick = (e, link) => {
        router.push(link.path).then(r => null)
    }
    const handleLogout = () => {
        doLogout().then(r => router.push(loginPage.path))
    }
    return (
        <ProtectRoute>
            <div className="justify-center items-center container mx-auto my-2 space-2">
                <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={title}/>
                <HomeTopBar info={topBarComponent}
                            user={user}
                            onLogout={handleLogout}
                            classes={`p-6 flex justify-between items-center text-lg bg-blue-500 rounded-lg shadow-lg text-white`}
                />

                <div className={`my-2`}></div>

                <div className={`grid grid-cols-12 gap-x-2`}>
                    <SideNav onLinkClick={handleLinkClick}
                             links={pages}
                             currentPath={router.pathname}
                    />

                    <div className={`col-span-10 p-2 rounded-lg text-lg`}>
                        {children}
                    </div>
                </div>

            </div>
        </ProtectRoute>
    );
}

export default ProtectedLayout;

