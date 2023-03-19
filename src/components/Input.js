import React from "react";

const Input = ({ onInputBlur, value, setNewValue, placeholder, sendNewMessage }) => (
  <div style={{display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"row", width:"100%", marginTop:"-10px"}}>
    <input
      value={value}
      onChange={(e) =>{setNewValue(e.target.value);} }
      type="text"
      onBlur={onInputBlur}
      className="text-input"
      placeholder={placeholder}
    />
    <button className="send_btn" onClick={sendNewMessage}>
      <i class='bx bx-send'></i>
    </button>
  </div>
);

export default Input;
