import axios from "axios"

const REST_KEY = '7fa68471d43dd199b9251fb853d0bea4'
const REDIRECT_URI = 'http://localhost:3000/login/kakao'
// const REDIRECT_URI = 'http://192.168.0.29:3000/login/kakao'
// const REDIRECT_URI = 'https://localhost:8443/api/member/kakao'

const AUTH_TOKEN_URL = "https://kauth.kakao.com/oauth/token"

export const getAccessToken = async (authCode) => {

    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        }
    }

    const params = {
        grant_type: 'authorization_code',
        client_id: REST_KEY,
        redirect_uri: REDIRECT_URI,
        code: authCode
    }

    const res = await axios.post(AUTH_TOKEN_URL, params, header)

    const { access_token } = res.data

    return access_token
}

const KAKAO_USER = "https://kapi.kakao.com/v2/user/me"

export const getUserEmail = async (accessToken) => {

    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        }
    }

    const res = await axios.get(KAKAO_USER, header)

    const {kakao_account} = res.data

    console.log(kakao_account);

    return kakao_account.email
}