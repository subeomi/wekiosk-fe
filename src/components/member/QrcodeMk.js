import QR from "qrcode.react";
import { useSelector } from "react-redux";


const QrcodeMk = () => {

    const {sno} = useSelector(state => state.store)

    return (
        <QR
                value={`http://localhost:3000/device/list/${sno}`}
                size={200}
                id="qr-gen"
                level={"H"}
                includeMargin={false}
                bgColor={"black"}
                fgColor={"white"}
            />
    );
}

export default QrcodeMk;