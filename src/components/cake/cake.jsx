import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./cake.module.scss";
const cx = classNames.bind(styles);

const fallingImages = [
    require("../../assets/imgs/avt-1.jpg"),
    require("../../assets/imgs/avt-2.jpg"),
    require("../../assets/imgs/avt-3.jpg"),
    require("../../assets/imgs/avt-4.jpg"),
    require("../../assets/imgs/avt-5.jpg"),
    require("../../assets/imgs/avt-6.jpg"),
    require("../../assets/imgs/avt-7.jpg"),
    require("../../assets/imgs/avt-8.jpg"),
    require("../../assets/imgs/avt-9.jpg"),
    require("../../assets/imgs/avt-10.jpg"),
    require("../../assets/imgs/avt-11.jpg"),
    require("../../assets/imgs/avt-12.jpg"),
    require("../../assets/imgs/avt-13.jpg"),
    require("../../assets/imgs/avt-14.jpg"),
    require("../../assets/imgs/avt-15.jpg"),
    require("../../assets/imgs/avt-16.jpg"),
];

function Cake() {
    const [showTiers, setShowTiers] = useState([
        false,
        false,
        false,
        false,
        false,
    ]);
    const [showCandles, setShowCandles] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showFallingImgs, setShowFallingImgs] = useState(false);
    const [fallingImgList, setFallingImgList] = useState([]);
    const [showLetter, setShowLetter] = useState(false);
    const [showLetterContent, setShowLetterContent] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [canStartFalling, setCanStartFalling] = useState(false);
    const letterFull =
        "Chúc em Hiền tuổi mới học thật giỏi, luôn vui vẻ, xinh đẹp, mạnh khỏe, gặp nhiều may mắn, có thật nhiều bạn tốt, luôn tự tin và hạnh phúc trên con đường mình chọn. Chúc mọi ước mơ của em đều thành hiện thực và luôn có người bên cạnh động viên, chia sẻ mọi niềm vui nỗi buồn. Hãy luôn là chính mình, sống hết mình với tuổi trẻ và đam mê nhé! Happy Birthday!";

    const typingRef = useRef();

    // Hiện từng tầng, nến, chữ, rồi ảnh rơi
    useEffect(() => {
        setTimeout(() => setShowTiers([true, false, false, false, false]), 300);
        setTimeout(() => setShowTiers([true, true, false, false, false]), 900);
        setTimeout(() => setShowTiers([true, true, true, false, false]), 1500);
        setTimeout(() => setShowTiers([true, true, true, true, false]), 2100);
        setTimeout(() => setShowTiers([true, true, true, true, true]), 2700);
        setTimeout(() => setShowCandles(true), 3300);
        setTimeout(() => setShowText(true), 3900);
    }, []);

    // Ảnh rơi liên tục vô hạn, chỉ bắt đầu khi canStartFalling = true
    useEffect(() => {
        if (!canStartFalling) return;
        setShowFallingImgs(true);
    }, [canStartFalling]);

    useEffect(() => {
        if (!showFallingImgs || showLetter) return; // <-- chỉ rơi khi chưa mở thư
        let running = true;
        function dropImg() {
            if (!running || showLetter) return;
            const imgIdx = Math.floor(Math.random() * fallingImages.length);
            const left = Math.random() * 80 + 10; // 10% - 90%
            const id = Date.now() + Math.random();
            setFallingImgList((list) => [
                ...list,
                { src: fallingImages[imgIdx], left, id },
            ]);
            setTimeout(() => {
                setFallingImgList((list) =>
                    list.filter((img) => img.id !== id)
                );
            }, 9000);
            setTimeout(dropImg, 700);
        }
        dropImg();
        return () => {
            running = false;
        };
    }, [showFallingImgs, showLetter]);

    // Hiệu ứng gõ từng chữ cho thư
    useEffect(() => {
        if (!showLetterContent) return;
        let i = 0;
        function type() {
            setTypedText(letterFull.slice(0, i));
            if (i < letterFull.length) {
                i++;
                typingRef.current = setTimeout(type, 30);
            }
        }
        type();
        return () => clearTimeout(typingRef.current);
    }, [showLetterContent]);

    // Đóng thư
    const handleCloseLetter = () => {
        setShowLetter(false);
        setShowLetterContent(false);
        setTypedText("");
    };

    // Khi thư xuất hiện, dừng ảnh rơi
    useEffect(() => {
        if (showLetter) setShowFallingImgs(false);
    }, [showLetter]);

    return (
        <div className={cx("cake-outer")}>
            <div className={cx("cake-stand")}></div>
            <div className={cx("cake-stack")}>
                <div
                    className={cx("cake-tier", "tier5", showTiers[4] && "show")}
                ></div>
                <div
                    className={cx("cake-tier", "tier4", showTiers[3] && "show")}
                ></div>
                <div
                    className={cx("cake-tier", "tier3", showTiers[2] && "show")}
                ></div>
                <div
                    className={cx("cake-tier", "tier2", showTiers[1] && "show")}
                ></div>
                <div
                    className={cx("cake-tier", "tier1", showTiers[0] && "show")}
                ></div>
                {showCandles && (
                    <div className={cx("candles")}>
                        <div className={cx("candle")}></div>
                        <div className={cx("candle")}></div>
                        <div className={cx("candle")}></div>
                    </div>
                )}
            </div>
            {showText && (
                <div className={cx("cake-text")}>
                    <span>🎉 Happy Birthday Minh Hiền 🎉</span>
                </div>
            )}

            {/* Nút bắt đầu rơi ảnh */}
            {showText && !canStartFalling && (
                <button
                    className={cx("letter-btn")}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "calc(55vh + 100px)",
                        transform: "translateX(-50%)",
                        zIndex: 2000,
                        fontSize: "2rem",
                        padding: "16px 40px",
                    }}
                    onClick={() => setCanStartFalling(true)}
                >
                    Ấn vào đây để xem điều bất ngờ 🎁
                </button>
            )}

            {/* Ảnh rơi */}
            {fallingImgList.map((img) => (
                <img
                    key={img.id}
                    src={img.src}
                    alt=""
                    className={cx("falling-img")}
                    style={{
                        left: `${img.left}%`,
                    }}
                />
            ))}

            {/* Nút mở thư nổi ở góc/phía dưới màn hình, luôn hiện khi ảnh đang rơi */}
            {canStartFalling && !showLetter && (
                <button
                    className={cx("letter-btn")}
                    style={{
                        position: "fixed",
                        right: 32,
                        bottom: 32,
                        zIndex: 3000,
                        fontSize: "1.5rem",
                        padding: "12px 28px",
                        background: "#fff",
                        color: "#d81b60",
                        border: "2px solid #ff69b4",
                        boxShadow: "0 2px 8px #ffb6e6aa",
                    }}
                    onClick={() => setShowLetter(true)}
                >
                    📩 Mở thư gửi Minh Hiền
                </button>
            )}

            {/* Popup thư */}
            {showLetter && (
                <div className={cx("letter-popup")}>
                    {!showLetterContent ? (
                        <button
                            className={cx("letter-btn")}
                            onClick={() => setShowLetterContent(true)}
                            style={{ marginBottom: 12 }}
                        >
                            📖 Đọc thư
                        </button>
                    ) : (
                        <>
                            <div className={cx("letter-content")}>
                                <div className={cx("letter-text")}>
                                    {typedText}|
                                </div>
                            </div>
                            <button
                                className={cx("letter-btn")}
                                style={{
                                    background: "#bbb",
                                    color: "#d81b60",
                                    marginTop: 18,
                                }}
                                onClick={handleCloseLetter}
                            >
                                Đóng thư
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cake;
