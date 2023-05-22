'use client'

import { useEffect, useState } from "react";

export const PopupPage = () => {

    const currentTime = new Date().getTime();
    localStorage.setItem('popupShownTime', currentTime.toString());

    const [isOpen, setIsOpen] = useState(true);

    const closePopup = () => {
        setIsOpen(false);
    };
    const [isCooldown, setIsCooldown] = useState(false);
    const cooldownDuration = 5; // 팝업을 닫은 후 재표시되기까지의 대기 시간 (단위: 밀리초)

    useEffect(() => {
        if (isCooldown) {
            const cooldownTimer = setTimeout(() => {
                setIsCooldown(false);
            }, cooldownDuration);

            return () => clearTimeout(cooldownTimer);
        }
    }, [isCooldown]);

    return (
        <div>
            {isOpen && !isCooldown && (
                <div className="popup">
                    <h1>Popup Content</h1>
                    <button onClick={closePopup}>Close</button>
                </div>
            )}

            <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          padding: 400px;
          border: 1px solid #ccc;
        }
      `}</style>
        </div>
    );
};

export default PopupPage;