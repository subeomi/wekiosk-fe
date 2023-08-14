import { getMessaging, getToken } from "firebase/messaging"
import { useEffect, useState } from "react"
import { putFcmtoken } from "../api/memberAPI"
import { useDispatch } from "react-redux"
import { updateFcmtoken } from "../reducers/member/loginSlice"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDllwTmvwZ0UeaSalOC8EL0ZXu6JqouZZs",
    authDomain: "wekiosk-d7e45.firebaseapp.com",
    projectId: "wekiosk-d7e45",
    storageBucket: "wekiosk-d7e45.appspot.com",
    messagingSenderId: "62019814911",
    appId: "1:62019814911:web:cd6bff621c54ea0e8113ca",
    measurementId: "G-2QKY1DEM92"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const NoticeNav = ({ loginInfo }) => {

    const [notifiOn, setNotifiOn] = useState(false)
    const [fcmtoken, setFcmtoken] = useState({})
    const dispatch = useDispatch()

    console.log("notice nav: ", loginInfo)

    // useEffect(() => {

    //     getToken(messaging, {
    //         vapidKey: process.env.REACT_APP_VAPID_KEY,
    //     }).then(data => {

    //         const fcmData = { memail: loginInfo.memail, fcmtoken: data }
    //         setFcmtoken({ data })
    //         putFcmtoken(fcmData).then(data => {
    //             console.log('ddddddddddddddddddddddddddddddddddddddddddddd')
    //         })
    //         dispatch(updateFcmtoken({ fcmtoken: fcmtoken.data }))
    //     })

    //     console.log("result: ", loginInfo.fcmtoken)

    // }, [loginInfo.fcmtoken])

    const saveFcmtokenHandler = async () => {
        try {
            const data = await getToken(messaging, {
                vapidKey: process.env.REACT_APP_VAPID_KEY,
            });

            console.log("get token ok!");

            const fcmData = { memail: loginInfo.memail, fcmtoken: data };

            await putFcmtoken(fcmData);

            dispatch(updateFcmtoken({ fcmtoken: data }));
        } catch (error) {
            console.error("Error while saving FCM token:", error);
        }
    };


    return (
        <>
            <div className="bg-orange-400 text-white font-bold p-2 cursor-pointer"
                onClick={saveFcmtokenHandler}
            >
                알림 설정
            </div>
        </>
    );
}

export default NoticeNav;