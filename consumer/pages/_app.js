import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React from "react";
import {AuthContextProvider} from "../contexts/auth";
import {PositionContextProvider} from "../contexts/position";

function MyApp({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <PositionContextProvider>
                <Component {...pageProps} />
                <ToastContainer position={"bottom-right"} theme={`dark`} limit={1}/>
            </PositionContextProvider>
        </AuthContextProvider>
    )

}

export default MyApp
