import React from "react";
import "./styles.css";

const EmojiInput = ({ input, parent, selected, onClick }) => {
  return (
    <span className={"emoji"}>
      <label
        className={`emoji--selected-${input.name === selected}`}
        htmlFor={`${input.name}`}
      >
        <span>{input.emoji}</span>
      </label>
      <input
        type="radio"
        data-metric={parent}
        id={`${input.name}`}
        onClick={onClick}
        value={input.name}
        checked={input.name === selected}
      />
    </span>
  );
};

export default EmojiInput;
