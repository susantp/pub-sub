import React, {useContext, useRef, useState} from 'react';
import AuthContext, {ProtectRoute} from "../contexts/auth";
import HtmlPageHead from "../components/HtmlPageHead";
import SearchComponent from "../components/home-page/SearchComponent";
import {useLocation} from "../hooks/useLocation";
import useSchema from "../hooks/useSchema";
import apiService from "../utils/apiService";
import getConfig from "next/config";

function Home(props) {
    const {user} = useContext(AuthContext);
    const inputRef = useRef("")
    const {pages: {home}} = useSchema()
    const {position, positionError} = useLocation()
    const {publicRuntimeConfig: config} = getConfig()
    const [services, setServices] = useState([]);
    const handleQuery = async (e) => {
        const {coords: {latitude, longitude}} = position
        const {value} = inputRef.current
        const payload = {
            type: config.userType,
            latitude,
            longitude
        }
        await apiService().post(`consumer/searchService`, payload)
            .then((response) => {
                const {data} = response
                setServices(data[1].data.data)
            })
            .catch(error => {
                console.log(error.response)
            })

    }
    return (
        <ProtectRoute>
            <HtmlPageHead metaContent={``} linkRel={``} linkHref={``} metaName={``} title={home.title}/>
            <div className={`flex justify-center items-center flex-col  gap-y-16 my-4`}>

                <div className={`flex justify-center items-center w-full gap-y-2 gap-x-2 `}>
                    <h1 className={`text-2xl lg:text-6xl md:text-4xl  font-semibold text-blue-400 dark:text-white`}>
                        {`Choose 100+ Services around you.`}
                    </h1>
                </div>

                <SearchComponent inputRef={inputRef} handleClick={handleQuery}
                                 placeholder={`Car repairing, Electricity repairing`}/>

                <div className={`grid grid-cols-3 gap-2 `}>
                    {
                        services.length > 0
                            ? services.map(service => <ServiceCardComponent key={service.id} name={service.name}
                                                                            distance={service.distance}
                                                                            email={service.email}/>)
                            : <h2 className={`text-lg`}>Search for Services</h2>
                    }
                </div>


            </div>
        </ProtectRoute>
    );
}

export default Home;
const ServiceCardComponent = ({name, distance, email}) => {
    const unit = distance > 0 ? `kms` : `km`
    const chipClasses = `inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2`
    return <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {/*<img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" />*/}
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className={chipClasses}>around {Math.round(distance)} {unit} away</p>
            <p className="text-gray-700 text-base">
                description about service
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
                <span
                    className={chipClasses}>
                    car specialist
                </span>
            <span
                className={chipClasses}>
                other specialist
            </span>
        </div>
    </div>
}
