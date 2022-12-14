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
import useSchema from "../hooks/useSchema";

function Register(props) {
    const {publicRuntimeConfig: config} = getConfig()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {positionError, position} = useContext(PositionContext);
    const {doRegister} = useContext(AuthContext);
    const router = useRouter()
    const {registerPage, pages: {overview}} = useSchema()

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

        data['latitude'] = latitude
        data['longitude'] = longitude
        data['type'] = config.userType
        doRegister(data, overview.path).then(r => null)
    }
    return (
        <>
            <HtmlPageHead
                title={registerPage.title}
                metaName={registerPage.description}
                linkHref={`/favicon.ico`}
                linkRel={`icon`}
                metaContent={registerPage.metaContent}
            />
            <div className={`flex justify-center items-center h-screen w-full bg-slate-200`}>

                <div id={`registerBox`} className="w-lg p-2">
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
                    <h1 className={`px-8 pt-6 pb-8 text-3xl bg-blue-300 text-white dark:bg-blue-500`}>{registerPage.title}</h1>

                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-y-5"
                          onSubmit={handleSubmit(onRegister)}>
                        <div id={`fields`} className={`grid grid-cols-2 gap-4 content-start`}>
                            <div>
                                <HtmlLabel label={`Company`} htmlFor={`email`}
                                           classes={`block text-gray-700 text-sm font-bold mb-2`}
                                />
                                <HtmlInput name={`company`}
                                           type={`company`}
                                           useFormObject={{
                                               ...register("company", {
                                                   required: true,
                                                   minLength: 8,
                                                   maxLength: 200
                                               })
                                           }}
                                           classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                           placeholder={`enter your company name`}
                                />
                            </div>
                            <div>
                                <HtmlLabel label={`Email`} htmlFor={`email`}
                                           classes={`block text-gray-700 text-sm font-bold mb-2`}
                                />
                                <HtmlInput name={`email`}
                                           type={`email`}
                                           useFormObject={{
                                               ...register("email", {
                                                   required: true,
                                                   minLength: 8,
                                                   maxLength: 200,
                                               })
                                           }}
                                           classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                           defaultValue={`abc@abc.com`} placeholder={`abc@abc.com`}
                                />
                            </div>
                            <div>
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
                            <div>
                                <HtmlLabel label={`Confirm Password`} htmlFor={`confirm_password`}
                                           classes={`block text-gray-700 text-sm font-bold mb-2`}
                                />
                                <HtmlInput name={`confirm_password`}
                                           type={`password`}
                                           helpText={`password must be same`}
                                           useFormObject={{
                                               ...register("confirm_password", {
                                                   required: true,
                                                   minLength: 8
                                               })
                                           }}
                                           classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                           defaultValue={``} placeholder={`confirm password`}
                                />
                            </div>
                            <div>
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
                            <div>
                                <HtmlLabel label={`License Number`} htmlFor={`licenseNumber`}
                                           classes={`block text-gray-700 text-sm font-bold mb-2`}
                                />
                                <HtmlInput name={`licenseNumber`}
                                           type={`text`}
                                           maxLength={`16`}
                                           useFormObject={{
                                               ...register("licenseNumber", {
                                                   required: true,
                                                   minLength: 8,
                                                   maxLength: 16
                                               })
                                           }}
                                           helpText={`minimum 8 character`}
                                           classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                           defaultValue={``}
                                />
                            </div>
                        </div>
                        <div id={`actions`}>
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
                            <HtmlInput name={`type`}
                                       type={`hidden`}
                                       useFormObject={{...register("type", {required: true})}}
                                       classes={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                       defaultValue={`abc@abc.com`} placeholder={`abc@abc.com`}
                            />
                            <div className="mb-6 mt-6">
                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                                   href="#"
                                   onClick={() => router.push('/')}
                                >
                                    Already Registered ? Click to login
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;