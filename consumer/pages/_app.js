import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React from "react";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer position={"bottom-right"} theme={`dark`} limit={1}/>
        </>
    )

}

export default MyApp
