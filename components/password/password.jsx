import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./password.module.scss";
import Cake from "../cake/cake";
const cx = classNames.bind(styles);

function PassWord() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleNumberClick = (num) => {
        if (value.length >= 8) return; // Giới hạn 8 ký tự
        setValue((prev) => prev + num);
        setError("");
    };

    const handleClear = () => {
        setValue("");
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value === "03082008") {
            setError("");
            setSuccess(true); // Đăng nhập thành công, chuyển sang bánh kem
        } else {
            setError("Mật khẩu không đúng!");
        }
    };

    if (success) return <Cake />; // Đăng nhập thành công, hiện bánh kem

    return (
        <form className={cx("pass-word-form")} onSubmit={handleSubmit}>
            <h2 className={cx("pass-word__title")}>Nhập mật khẩu của em đi</h2>
            <div style={{ position: "relative", width: "100%" }}>
                <input
                    className={cx("pass-word__input")}
                    type={show ? "text" : "password"}
                    value={value}
                    placeholder="nhập ngày tháng năm sinh"
                    readOnly
                />
                {value.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClear}
                        style={{
                            position: "absolute",
                            right: 50,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "transparent",
                            border: "none",
                            fontSize: 22,
                            color: "#ff69b4",
                            cursor: "pointer",
                        }}
                        tabIndex={-1}
                        aria-label="Xóa"
                    >
                        ×
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        fontSize: 20,
                        color: "#888",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    tabIndex={-1}
                    aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                    {show ? "👁️" : "👁️‍🗨️"}
                </button>
            </div>

            {/* con số ấn nhập */}
            <div className={cx("pass-word__numbers")}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <span
                        key={num}
                        className={cx("pass-word__number")}
                        onClick={() => handleNumberClick(num)}
                        style={{ userSelect: "none" }}
                    >
                        {num}
                    </span>
                ))}
            </div>

            <button className={cx("pass-word__submit")} type="submit">
                Đăng nhập
            </button>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>
    );
}

export default PassWord;
