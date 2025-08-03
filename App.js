import React from "react";
import "./App.css";
import giftBoxImg from "./assets/imgs/giftbox.png"; // chỉnh đúng theo đường dẫn thực tế
import PassWord from "./components/password/password";

function App() {
    const refTimer = React.useRef(null);

    React.useEffect(() => {
        refTimer.current = setInterval(() => {
            const giftBox = document.createElement("div");
            const giftBoxImage = document.createElement("img");
            giftBoxImage.src = giftBoxImg; // Đúng: dùng biến import
            giftBoxImage.alt = "Gift Box";
            giftBoxImage.className = "gift-box__image";
            giftBox.className = "gift-box";
            giftBox.style.position = "fixed";
            giftBox.style.left = `${Math.floor(Math.random() * 90)}vw`;
            giftBox.style.top = `${Math.floor(Math.random() * 80)}vh`;
            giftBox.style.width = "60px";
            giftBox.style.height = "60px";
            giftBox.style.transition = "opacity 0.5s, transform 0.5s";

            // Đặt kích thước cho cả ảnh bên trong
            giftBoxImage.style.width = "100%";
            giftBoxImage.style.height = "100%";
            giftBoxImage.style.objectFit = "contain";
            giftBoxImage.style.filter =
                "drop-shadow(0 0 8px #ff69b4) drop-shadow(0 0 24px #ff69b4cc)";

            giftBox.appendChild(giftBoxImage);
            document.body.appendChild(giftBox);
            giftBox.style.opacity = 0;
            giftBox.style.transform = "scale(0.5)";
            setTimeout(() => {
                giftBox.style.opacity = 1;
                giftBox.style.transform = "scale(1)";
            }, 50);

            setTimeout(() => {
                giftBox.style.opacity = 0;
                giftBox.style.transform = "scale(0.5)";
                setTimeout(() => {
                    giftBox.remove();
                }, 500);
            }, 2500);
        }, 300);

        return () => clearInterval(refTimer.current);
    }, []);

    return (
        <div className="App">
            <PassWord />
        </div>
    );
}

export default App;
