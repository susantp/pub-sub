import {createContext, useEffect, useState} from "react";
import AuthContext from "./auth";

const PositionContext = createContext({
    position: null, positionError: null
})

export const PositionContextProvider = ({children}) => {
    const [position, setPosition] = useState({"coords": {}, "timestamp": 0});
    const [positionError, setPositionError] = useState({});

    useEffect(() => {
        const loadLocation = async () => {
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
        }
        loadLocation().then(r => console.log('locationProvider Called !!!'))
    }, [])

    const context = {position, positionError}
    return (
        <PositionContext.Provider value={context}>
            {children}
        </PositionContext.Provider>
    )
}

export default PositionContext