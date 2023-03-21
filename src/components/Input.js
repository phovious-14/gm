import React from "react";
import { Tooltip } from "antd";

const text = <span>How to send Money : <br /> /pay amount [usdc/dai]</span>;

const Input = ({
  onInputBlur,
  value,
  setNewValue,
  placeholder,
  sendNewMessage,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      width: "100%",
      marginTop: "-10px",
    }}
  >
    <Tooltip placement="top" title={text}>
      <span
        className="pay_span"
      >
        <i class="bx bx-info-circle"></i>&nbsp; Payment
      </span>
    </Tooltip>
    <input
      value={value}
      onChange={(e) => {
        setNewValue(e.target.value);
      }}
      type="text"
      onBlur={onInputBlur}
      className="text-input"
      placeholder={placeholder}
    />
    <button className="send_btn" onClick={sendNewMessage}>
      <i class="bx bx-send"></i>
    </button>
  </div>
);

export default Input;
