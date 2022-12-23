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
    const [requestDispatcher, setRequestDispatcher] = useState({});

    const mapIsReadyCallback = (map) => {

    }

    useEffect(() => {
        const pusher = new Pusher('a1091d9e1a6ed6652372', {
            cluster: 'us3',
            encrypted: true
        })
        const channel = pusher.subscribe('public.room');

        channel.bind('serviceQuery.new', (data) => {
            setRequestDispatcher(data)
        })
        return () => {
            pusher.unsubscribe('public.room')
        }
    }, []);
    console.log('broadcast users: ', requestDispatcher)
    return (
        <ProtectedLayout title={overview.title}>
            <h1>Name:
                {user?.name?.toUpperCase()}
            </h1>
            <h3>
                Current Location:
                {user?.latitude}, {user?.longitude}
            </h3>

            <MyMap
                latitude={user?.latitude}
                longitude={user?.longitude}
                mapIsReadyCallback={mapIsReadyCallback}
            />

        </ProtectedLayout>
    )
}

export default Overview;
