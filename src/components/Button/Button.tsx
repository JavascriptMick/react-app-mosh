import { ReactNode } from "react";

import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  colour: "blue" | "grey" | "green" | "red" | "yellow";
  onButtonClicked: () => void;
}

function getButtonClass(colour: string) {
  switch (colour.toLowerCase()) {
    case "blue":
      return styles.btnPrimary;
    case "grey":
      return styles.btnSecondary;
    case "green":
      return styles.btnSuccess;
    case "red":
      return styles.btnDanger;
    case "yellow":
      return styles.btnWarning;
    default:
      return styles.btnPrimary;
  }
}

const Button = ({ colour, onButtonClicked, children }: Props) => {
  return (
    <button
      type="button"
      className={[styles.btn, getButtonClass(colour)].join(" ")}
      onClick={onButtonClicked}
    >
      {children}
    </button>
  );
};

export default Button;
