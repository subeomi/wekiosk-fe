import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delStore } from "../../api/storeAPI";
import { storeChange } from "../../reducers/member/storeSlice";
import { delMember } from "../../api/memberAPI";
import { requestLogout } from "../../reducers/member/loginSlice";
import { useRef, useState } from "react";
import ToastMessage from "../../util/ToastMessage";


const ModifyMainComponent = () => {

    const { memail, mname } = useSelector(state => state.login)
    const { saddress, sname, scontact, sno } = useSelector(state => state.store)
    const [delStoreModal, setDelStoreModal] = useState(false)
    const [delMemberModal, setDelMemberModal] = useState(false)
    const [delToast, setDelToast] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const modalRef = useRef(null);

    const handleDelMember = () => {
        delMember(memail).then(navigate('/login'))
        dispatch(storeChange())
        dispatch(requestLogout())
    }

    const handleDelStore = () => {
        delStore(sno).then(navigate('/store/select'))
        dispatch(storeChange())
    }

    const handleMoveChangePwPage = () => {
        console.log(memail)
        navigate('/changepw', {
            state: {
                memail: memail
            }
        })
        console.log("next page")
    }

    function activeToast() {
        setDelToast(true);
        let timer = setTimeout(() => {
            setDelToast(false);
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-start p-4">
                <div className="font-bold text-xl my-2 ml-1">
                    회원 정보
                </div>

                <div className="border-2 p-4 rounded-2xl min-w-[450px] bg-white">
                    <div className="flex py-2 mb-2" name="profile">
                        <div className="text-6xl self-center mr-2">
                            <ion-icon name="person-circle-sharp"></ion-icon>
                        </div>
                        <div className="flex flex-col self-center">
                            <span className="font-bold text-2xl">{mname}</span>
                            <span className="text-gray-400 text-xl">{memail}  </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-gray-500">비밀번호</span>

                        <button className="bg-[rgb(228,108,10)] text-white text-lg p-2 w-[60px] h-[40px] rounded-lg font-extrabold cursor-pointer flex items-center justify-center"
                            onClick={handleMoveChangePwPage}
                        >
                            수정
                        </button>
                    </div>
                </div>

                <div className="flex items-center text-gray-500 mt-2 ml-1"
                    onClick={() => setDelMemberModal(true)}
                >
                    <span>회원탈퇴</span>
                    <span className="flex">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-start p-4">
                <div className="font-bold text-xl my-2 ml-1">
                    매장 정보
                </div>

                <div className="border-2 p-4 rounded-2xl min-w-[450px] bg-white">
                    <div className="flex py-2 mb-2" name="profile">
                        <div className="text-6xl self-center mr-2">
                            <ion-icon name="business-outline"></ion-icon>
                        </div>
                        <div className="flex flex-col self-center">
                            <span className="font-bold text-2xl">{sname.length > 13 ? `${sname.slice(0, 13)}...` : sname}</span>
                            <span className="text-gray-400 text-lg">{saddress.length > 18 ? `${saddress.slice(0, 18)}...` : saddress}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-gray-500">매장정보</span>

                        <Link className="bg-[rgb(228,108,10)] text-white text-lg p-2 w-[60px] h-[40px] rounded-lg font-extrabold cursor-pointer flex items-center justify-center"
                            to={"../store"}>
                            수정
                        </Link>
                    </div>
                </div>

                <div className="flex items-center text-gray-500 mt-2 ml-1"
                    onClick={() => setDelStoreModal(true)}
                >
                    <span>매장삭제</span>
                    <span className="flex">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                    </span>
                </div>
            </div>



            {delMemberModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm" onClick={() => setDelMemberModal(false)}>
                    <div className="bg-white p-4 shadow-xl border-8 rounded-3xl border-[rgb(228,108,10)]" onClick={(e) => e.stopPropagation()}>
                        <div className="text-6xl self-center mr-2 flex items-center">
                            <ion-icon name="person-circle-sharp"></ion-icon>
                            <h2 className="text-2xl font-bold pl-2">정말 탈퇴하시겠습니까?</h2>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="close-button mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => activeToast()}
                            >
                                취소
                            </button>

                            <button
                                className="close-button mt-4 ml-2 bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDelMember(false)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {delStoreModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm" onClick={() => setDelStoreModal(false)}>
                    <div className="bg-white p-4 shadow-xl border-8 rounded-3xl border-[rgb(228,108,10)]" onClick={(e) => e.stopPropagation()}>
                        <div className="text-6xl self-center mr-2 flex items-center">
                            <ion-icon name="business-outline"></ion-icon>
                            <h2 className="text-2xl font-bold pl-2">정말 삭제하시겠습니까?</h2>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="close-button mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setDelStoreModal(false)}
                            >
                                취소
                            </button>

                            <button
                                className="close-button mt-4 ml-2 bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleDelStore}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {delToast && <ToastMessage text={'테스트 메시지'} />}
        </div>
    );
}

export default ModifyMainComponent;