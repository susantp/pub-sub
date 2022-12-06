
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
const echoConfig = () => {
    Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    const echo = new Echo({
        broadcaster: 'pusher',
        key: "c6f1bdd5a5479edbc6f3",
        wsHost: `ws-us3.pusher.com`,
        wsPort: 80,
        wssPort: 443,
        forceTLS: 'https',
        enabledTransports: ['ws', 'wss']
    })
    const test = 'susa'
    return { echo, test }
}
export default echoConfig;