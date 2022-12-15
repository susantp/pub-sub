import React, {useContext, useState} from 'react';
import HtmlPageHead from "../components/HtmlPageHead";
import HtmlLabel from "../components/HtmlLabel";
import HtmlInput from "../components/Htmlinput";
import getConfig from "next/config";
import {useForm} from "react-hook-form";
import AuthContext from "../contexts/auth";
import PositionContext from "../contexts/position";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

function Register(props) {
    const {publicRuntimeConfig: config} = getConfig()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {positionError, position} = useContext(PositionContext);
    const {doRegister} = useContext(AuthContext);
    const router = useRouter()
    const [pageInfo, setPageInfo] = useState({
        title: 'Service Register',
        description: '',
        metaContent: 'Register your service',
        homePath: '/overview'
    });

    const onRegister = (data) => {
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
        data['type'] = config.userType
        doRegister(data).then(r => router.push(pageInfo.homePath))
    }
    return (
        <>
            <HtmlPageHead
                title={pageInfo.title}
                metaName={pageInfo.description}
                linkHref={`/favicon.ico`}
                linkRel={`icon`}
                metaContent={pageInfo.metaContent}
            />
            <div className={`flex justify-center items-center w-full h-screen bg-slate-200`}>

                <div className="w-full max-w-lg p-2">
                    {Object.keys(errors).length > 0 &&
                        <ul>
                            {errors.email &&
                                <li><p className={`text-red-500 text-lg`}>email field is required</p></li>
                            }
                            {errors.password &&
                                <li><p className={`text-red-500 text-lg`}>password field is required</p></li>
                            }
                            {errors.username &&
                                <li><p className={`text-red-500 text-lg`}>username has some error</p></li>
                            }
                        </ul>
                    }
                    <h1 className={`px-8 pt-6 pb-8 text-3xl bg-blue-300 text-white dark:bg-blue-500`}>{pageInfo.title}</h1>

                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          onSubmit={handleSubmit(onRegister)}>
                        <HtmlInput name={`type`}
                                   type={`hidden`}
                                   useFormObject={{...register("type", {required: true})}}
                                   classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                   defaultValue={`abc@abc.com`} placeholder={`abc@abc.com`}
                        />
                        <div className="mb-4">
                            <HtmlLabel label={`Email`} htmlFor={`email`}
                                       classes={`block text-gray-700 text-sm font-bold mb-2`}
                            />
                            <HtmlInput name={`email`}
                                       type={`email`}
                                       useFormObject={{...register("email", {required: true})}}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={`abc@abc.com`} placeholder={`abc@abc.com`}
                            />
                        </div>
                        <div className="mb-6">
                            <HtmlLabel label={`Password`} htmlFor={`password`}
                                       classes={`block text-gray-700 text-sm font-bold mb-2`}
                            />
                            <HtmlInput name={`password`}
                                       type={`password`}
                                       useFormObject={{...register("password", {required: true, minLength: 8})}}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={`123456789`} placeholder={`password`}
                            />
                        </div>
                        <div className="mb-6">
                            <HtmlLabel label={`Confirm Password`} htmlFor={`confirm_password`}
                                       classes={`block text-gray-700 text-sm font-bold mb-2`}
                            />
                            <HtmlInput name={`confirm_password`}
                                       type={`password`}
                                       helpText={`password must be same`}
                                       useFormObject={{...register("confirm_password", {required: true, minLength: 8})}}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={``} placeholder={`confirm password`}
                            />
                        </div>
                        <div className="mb-6">
                            <HtmlLabel label={`Username`} htmlFor={`username`}
                                       classes={`block text-gray-700 text-sm font-bold mb-2`}
                            />
                            <HtmlInput name={`username`}
                                       type={`text`}
                                       maxLength={`16`}
                                       useFormObject={{
                                           ...register("username", {
                                               required: true,
                                               minLength: 8,
                                               maxLength: 16
                                           })
                                       }}
                                       helpText={`minimum 8 character`}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={``} placeholder={`abc123`}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <HtmlInput name={`submit`}
                                       type={`submit`}
                                       classes={`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg  focus:outline-none focus:shadow-outline`}
                            />
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                               href="#"
                               onClick={() => alert('feature coming soon!')}
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="mb-6 mt-6">
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                               href="#"
                               onClick={() => router.push('/')}
                            >
                                Already Registered ? Click to login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;