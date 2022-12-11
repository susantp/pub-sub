import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React from "react";
import {PositionContextProvider} from "../contexts/position";
import {AuthContextProvider, ProtectRoute} from "../contexts/auth";

function MyApp({Component, pageProps}) {
    return (
        <AuthContextProvider>
            <PositionContextProvider>
                <Component {...pageProps} />
                <ToastContainer position={"top-right"}
                                theme={`dark`}
                                limit={4} newestOnTop={true}
                                pauseOnFocusLoss={false}/>
            </PositionContextProvider>
        </AuthContextProvider>
    )

}

export default MyApp
