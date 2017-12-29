import React from "react";
import "./styles.css";
import EmojiInput from "../EmojiInput/";

const report = {
  danger: [{ name: "obstacle", emoji: "🕳️" }, { name: "car", emoji: "🚘" }],
  level: [
    { name: "high", emoji: "😨" },
    { name: "medium", emoji: "😵" },
    { name: "low", emoji: "😒" },
  ],
};

const gridFactory = (part, key, props) => {
  const parts = {
    grid: (t, i) => {
      let cell = gridFactory("cell", key, props);
      return cell(t, i);
    },
    cell: (t, i) => (
      <EmojiInput
        input={t}
        parent={key}
        selected={props[key]}
        onClick={props.onClick}
        key={`emojiInput-${t["name"]}`}
      />
    ),
  };
  return parts[part];
};

const Report = props => {
  return (
    <form className="Report">
      {Object.keys(report).map(key => {
        return (
          <span className={"grid__container"} key={key}>
            <p className="grid__title">{key}</p>
            {report[key].map((t, i) => {
              let grid = gridFactory("grid", key, props);
              return grid(t, i);
            })}
          </span>
        );
      })}
    </form>
  );
};

export default Report;
