export default function Messagebox({ message }) {
    const formatDate = (value) => {
        if (!value) return '';
        return value;
        // return new Date(value).toLocalTimeString();
    };
    // console.log(message)
    return (
        <div>
            <div>
                <p>
                    <b>{message.user}</b>
                </p>
                <p>{message.message}</p>
                <p>{message.createdAt}</p>
            </div>
        </div>
    )
    // console.log(message)
    // return <></>
}