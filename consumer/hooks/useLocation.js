import {useState} from "react";

export const useLocation = () => {
    const [position, setPosition] = useState({"coords": {}, "timestamp": 0});
    const [positionError, setPositionError] = useState({});
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    coords: position.coords,
                    timestamp: position.timestamp
                })
            },
            (positionError) => {
                setPositionError(positionError)
            })
    }
    return {positionError, position}
}