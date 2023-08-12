import { Link } from "react-router-dom";


const REST_KEY = '7fa68471d43dd199b9251fb853d0bea4'
const REDIRECT_URI = 'http://localhost:3000/login/kakao'
// const REDIRECT_URI = 'https://localhost:8443/api/member/kakao'

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

const KakaoLoginComponent = () => {
    return (
        <div>
            <button className="text-gray-900 bg-[#FEE500] p-2 my-1 w-[213px]">
                <Link to={kakaoURL}>KAKAO LOGIN</Link>
            </button>
        </div>
    );
}

export default KakaoLoginComponent;