/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

const wrapperStyle = {
  fontFamily: "arial",
  fontSize: "12px",
  color: "rgb(200, 200, 200)",
  marginBottom: "6px",
  display: "inline-block",
};

const kbdStyle = {
  backgroundColor: "rgb(23, 23, 23)",
  fontSize: "12px",
  color: "#b9b9b9",
  padding: "2px 4px",
  marginRight: "6px",
  borderRadius: "4px",
};

const linkStyle = {
  color: "rgb(23, 23, 23)",
  textDecoration: "underline",
};

function SampleHeader({ onClose }) {
  const itemStyle = { paddingRight: "32px" };

  return (
    <div style={wrapperStyle}>
      <span style={itemStyle}>Hi John! What do you want to do?</span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>↑↓</kbd> to navigate
      </span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>enter</kbd> to select
      </span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>esc</kbd> to dismiss
      </span>
      <button onClick={onClose} style={linkStyle}>
        Close
      </button>
    </div>
  );
}

export default SampleHeader;
