import { Link } from "react-router-dom";


const REST_KEY = '7fa68471d43dd199b9251fb853d0bea4'
const REDIRECT_URI = 'http://localhost:3000/login/kakao'
// const REDIRECT_URI = 'http://192.168.0.29:3000/login/kakao'
// const REDIRECT_URI = 'https://localhost:8443/api/member/kakao'

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

const KakaoLoginComponent = () => {
    return (
        <>
            <Link className="text-gray-900 bg-[#FEE500] p-2 rounded-lg font-extrabold min-w-[350px] h-[55px] flex justify-center items-center" to={kakaoURL}>KAKAO LOGIN</Link>
        </>
    );
}

export default KakaoLoginComponent;