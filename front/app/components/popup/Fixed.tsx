import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="popup-example" style={{position: 'relative'}}>
      {isOpen && (
        <div className="popup" style={{ position: 'fixed', top: '50%', left: '20px', transform: 'translateY(-50%)', backgroundColor:'#fff', padding: '20px', border: '1px solid #ccc'}}>
          <button onClick={handleClosePopup}> X </button>
          <h2>Fixed 팝업</h2>
          <p>팝업팝업팝업팝업팝업</p>
        </div>
      )}
    </div>
  );
};

export default Popup;