import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { putFcmtoken } from "../../api/memberAPI";

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

const IndexPage = () => {

    const loginInfo = useSelector(state => state.login)

    useEffect(() => {

        getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
        }).then(data => {

            const fcmData = { memail: loginInfo.memail, fcmtoken: null }
            putFcmtoken(fcmData).then(data => {
                console.log('ddddddddddddddddddddddddddddddddddddddddddddd')
            })
            // dispatch(updateFcmtoken({ fcmtoken: fcmtoken.data }))
        })


    }, [loginInfo.fcmtoken])

    console.log("result: ", loginInfo.fcmtoken)
    
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}

export default IndexPage;