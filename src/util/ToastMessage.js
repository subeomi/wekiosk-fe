

const ToastMessage = (props) => {


    return (
        <div className="absolute z-999 bottom-[12px] right-[-120px] transform -translate-x-1/2 -translate-y-1/2 w-96 h-10 rounded-lg shadow-md bg-gray-800">
            <div className="font-bold text-center mt-2 text-white">{props.text}</div>
        </div>
    );
}

export default ToastMessage;