import React, {useContext, useRef} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";
import SearchComponent from "../components/home-page/SearchComponent";
import {useRouter} from "next/router";
import {useLocation} from "../hooks/useLocation";

function Home(props) {
    const {user} = useContext(AuthContext);
    const router = useRouter()
    const inputRef = useRef("")
    const {position, positionError} = useLocation()
    const handleQuery = (e) => {
        const {coords: {latitude, longitude}} = position
        const {value} = inputRef.current

        // value && router.push(`query?service=${value}&lat=${latitude}&long=${longitude}`)
    }
    const pageInfo = {
        title: 'Home',
        description: '',
        metaContent: 'search hundred of services around you'
    }
    return (
        <ProtectRoute>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={pageInfo.title}/>
            <div className={`flex justify-center items-center h-screen flex-col  gap-y-16 `}>
                <div className={`flex justify-center items-center w-full gap-y-2 gap-x-2 `}>
                    <h1 className={`text-2xl lg:text-6xl md:text-4xl  font-semibold text-blue-400 dark:text-white`}>
                        {`Choose 100+ Services around you.`}
                    </h1>
                </div>

                <SearchComponent inputRef={inputRef} handleClick={handleQuery}
                                         placeholder={`Car repairing, Electricity repairing`}/>
            </div>
        </ProtectRoute>
    );
}

export default Home;