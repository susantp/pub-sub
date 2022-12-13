import Pusher from "pusher-js";
import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import AuthContext from "../contexts/auth";
import getConfig from 'next/config'
import {toast} from "react-toastify";
import HtmlLabel from "../components/HtmlLabel";
import HtmlInput from "../components/Htmlinput";
import HtmlPageHead from "../components/HtmlPageHead";
import PositionContext from "../contexts/position";
import {useRouter} from "next/router";
import useSchema from "../hooks/useSchema";

export default function Login() {
    const {publicRuntimeConfig: config} = getConfig()
    const [messages, setMessages] = useState([])
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {doLogin} = useContext(AuthContext)
    const {positionError, position} = useContext(PositionContext);
    const router = useRouter()
    const {loginPage, overViewPage} = useSchema()
    const onLogin = (data) => {
        if (positionError instanceof GeolocationPositionError) {

            toast('For the service please enable location.', {
                toastId: 'locationDeniedPermissionToast',
                pauseOnFocusLoss: false,
                type: "warning"
            })
            return false

        }
        const {coords: {latitude, longitude}} = position

        data['coords'] = {"latitude": latitude, "longitude": longitude}
        doLogin(data).then(r => router.push(overViewPage.path))
    }

/*    useEffect(() => {
        const pusher = new Pusher('a1091d9e1a6ed6652372', {
            cluster: 'us3',
            encrypted: true
        })
        const channel = pusher.subscribe('public.room');

        channel.bind('message.new', (data) => {
            setMessages(oldMessages => [...oldMessages, data])
        })
        return () => {
            pusher.unsubscribe('public.room')
        }
    }, []);*/

    return (
        <>
            <HtmlPageHead
                title={loginPage.title}
                metaName={loginPage.description}
                linkHref={`/favicon.ico`}
                linkRel={`icon`}
                metaContent={loginPage.metaContent}
            />
            <div className={`flex justify-center items-center w-full h-screen bg-slate-200`}>

                <div className="w-full max-w-lg p-2">
                    {Object.keys(errors).length > 0 &&
                        <ul>
                            {errors.email &&
                                <li><p className={`text-red-500 text-lg`}>email field is required</p></li>}
                            {errors.password &&
                                <li><p className={`text-red-500 text-lg`}>password field is required</p></li>}
                        </ul>
                    }
                    <h1 className={`px-8 pt-6 pb-8 text-3xl bg-purple-400 text-white dark:bg-blue-500`}>
                        {loginPage.title}
                    </h1>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onLogin)}>

                        <div className="mb-4">
                            <HtmlLabel label={`Email`} htmlFor={`email`}
                                       classes={`block text-gray-700 text-sm font-bold mb-2`}
                            />
                            <HtmlInput name={`email`}
                                       type={`email`}
                                       useFormObject={{...register("email", {required: true})}}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={`abc@abc.com`} placeholder={`email`}
                            />
                        </div>
                        <div className="mb-6">
                            <HtmlLabel label={`Password`} htmlFor={`password`}
                                       classes={`block text-gray-700 text-sm font-bold mb-2`}
                            />
                            <HtmlInput name={`password`}
                                       type={`password`}
                                       useFormObject={{...register("password", {required: true})}}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={`123456789`} placeholder={`******************`}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <HtmlInput name={`submit`}
                                       type={`submit`}
                                       classes={`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg  focus:outline-none focus:shadow-outline`}
                            />
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                               href="#"
                               onClick={() => router.push('/register')}
                            >
                                Not Registered ? Click here
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
