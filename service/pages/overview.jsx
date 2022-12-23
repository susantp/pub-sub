import React, {useContext, useEffect, useState} from 'react';
import ProtectedLayout from "../components/protected-layout";
import useSchema from "../hooks/useSchema";
import AuthContext from "../contexts/auth";
import MyMap from "../components/myMap";
import Pusher from "pusher-js";

// import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'


function Overview(props) {
    const {pages: {overview}} = useSchema()
    const {user} = useContext(AuthContext);
    const [requestedUser, setRequestedUser] = useState({});

    const mapIsReadyCallback = (map) => {

    }

    useEffect(() => {
        const pusher = new Pusher('a1091d9e1a6ed6652372', {
            cluster: 'us3',
            encrypted: true
        })
        const channel = pusher.subscribe(`public.room`);

        channel.bind('serviceQuery.new', (data) => {
            setRequestedUser(data)
        })
        return () => {
            pusher.unsubscribe('public.room')
        }
    }, []);
    console.log('broadcast users: ', requestedUser, 'count: ', Object.keys(requestedUser).length)
    const handleAccept = (e, requestedUser) => {
        console.log(requestedUser)
    }
    return (
        <ProtectedLayout title={overview.title}>

            <div className={`flex item-center justify-between`}>
                <div className={`text-xl font-semibold`}>{user?.name?.toUpperCase()}</div>
                <div className={`text-xl font-semibold`}>{user?.latitude}, {user?.longitude}</div>
            </div>

            <div className={`my-10`}></div>

            {
                Object.keys(requestedUser).length > 1
                    ? <div className={`grid grid-cols-3 gap-3 content-start`} id={`requested-user`}>

                        <div
                            className="flex flex-col gap-3 h-64 block p-6 rounded-lg shadow-lg bg-slate-100">
                            <h3 className={`text-xl font-semibold h-14 place-content-center`}>New
                                Request</h3>
                            <p className={`text-md`}>{requestedUser?.user?.name}</p>
                            <p className={`text-md`}>{requestedUser?.user?.email}</p>
                            <p className={`text-md`}>{requestedUser?.user?.latitude}, {requestedUser?.user?.longitude}</p>
                            <button onClick={(e) => handleAccept(e, requestedUser)}
                                    className={`py-3 text-white bg-green-600 hover:bg-green-800 font-semibold`}>Accept
                            </button>
                        </div>

                    </div>
                    : <></>
            }
            {/*<MyMap
                latitude={user?.latitude}
                longitude={user?.longitude}
                mapIsReadyCallback={mapIsReadyCallback}
            />*/}


        </ProtectedLayout>
    )
}

export default Overview;
