import { useSelector } from "react-redux";

const BasicLayout = ({children }) => {

    const { memail, mname } = useSelector(state => state.login)

    return (
        <div>
            {/*  bg-opacity-90 */}
            <div className="min-w-[1280px] bg-white flex items-center drop-shadow-xl">
                <div className="mx-2 p-2 text-2xl font-extrabold ml-10 cursor-pointer flex items-center">
                    <span className="text-indigo-600 pt-1 mr-1">
                        <ion-icon name="accessibility-outline"></ion-icon>
                    </span>
                    SUBEOMI
                </div>
                <div className="mx-auto">
                    {/* <SampleNav></SampleNav> */}
                </div>
                <div className="ml-2 p-2 mr-10 flex">
                    {/* <LoginNav></LoginNav> */}
                    {memail}
                </div>
            </div>
            <div className="container mx-auto min-w-[1280px] bg-white">
                {children}
            </div>
        </div>
    );
}

export default BasicLayout;