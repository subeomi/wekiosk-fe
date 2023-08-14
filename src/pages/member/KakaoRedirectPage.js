import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestLogin } from "../../reducers/member/loginSlice";
// import { getAccessToken, getUserEmail } from "../../api/kakaoAPI";



const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams()

    const authCode = searchParams.get('code')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {

        axios.get(`https://192.168.0.29:8443/api/member/kakao?code=${authCode}`).then(res => {

            console.log(res.data)

            const memberInfo = res.data

            const nickname = memberInfo.nickname

            dispatch(requestLogin(memberInfo))
            console.log("카카오 로그인 성공!!")
            if (nickname === 'SOCIAL_MEMBER') {
                navigate('/store/select')
            } else {
                navigate("/store/select")
            }

        })

        const code = new URL(window.location.href).searchParams.get("code");

        console.log(code)

        // getAccessToken(authCode).then(accessToken => {
        //     console.log(accessToken)

        //     getUserEmail(accessToken).then(email => {
        //         console.log("EMAIL: "+email)
        //     })
        // })

    }, [authCode])

    return (
        <div>
            LOADING . . .
        </div>
    );
}

export default KakaoRedirectPage;