/**************
 * map for presentation of data distribution on map
 * ****************/
import React, {useEffect, useRef} from 'react';
import {Map, View} from 'ol';
import FullScreen from 'ol/control/FullScreen';
import olms from 'ol-mapbox-style';
import {transform} from 'ol/proj';

const MyMap = ({
                   mapIsReadyCallback,  /* To be triggered when a map object is created */
                   latitude,
                   longitude
               }) => {
    const mapContainer = useRef(null);
    const handleShowMap = () => {
        const initialState = {
            lng: longitude,
            lat: latitude,
            zoom: 14,
        };

        const myAPIKey = '893d3bf8479d4a76a7cc125763d32e98';
        const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

        olms(mapContainer.current, `${mapStyle}?apiKey=${myAPIKey}`).then((map) => {
            map
                .getView()
                .setCenter(
                    transform(
                        [initialState.lng, initialState.lat],
                        'EPSG:4326',
                        'EPSG:3857',

                    )
                );
            map.getView().setZoom(initialState.zoom);

            mapIsReadyCallback(map);
        });
    }

    return <>
        <button className={`text-md bg-amber-600 hover:bg-amber-800 text-white px-4 py-2 rounded-md`} onClick={handleShowMap}>Show Map</button>
        <div className="map-container" ref={mapContainer}></div>
    </>;
};

export default MyMap;