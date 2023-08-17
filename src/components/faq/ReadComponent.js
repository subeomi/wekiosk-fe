import { useEffect, useState } from "react";
import { getOne } from "../../api/faqAPI";

const initState = {
    qno: 0,
    qtitle: '',
    qcontent: ''
}

const ReadComponent = ({qno}) => {

    const [faq, setFaq] = useState(initState)

    useEffect(() => {
        getOne(qno).then(data => {
            setFaq(data)
        })
    }, [qno])

    return (
        <div className="flex bg-gray-50 px-2 py-4 items-center">
            <div className="text-[rgb(228,108,10)] text-2xl font-extrabold px-2">
                A
            </div>
            <div className="pl-5">
                {faq.qcontent}
            </div>
        </div>
    );
}

export default ReadComponent;