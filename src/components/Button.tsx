import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  colour: "blue" | "grey" | "green" | "red" | "yellow";
  onButtonClicked: () => void;
}

function getButtonClass(colour: string) {
  switch (colour.toLowerCase()) {
    case "blue":
      return "btn-primary";
    case "grey":
      return "btn-secondary";
    case "green":
      return "btn-success";
    case "red":
      return "btn-danger";
    case "yellow":
      return "btn-warning";
    default:
      return "btn-primary";
  }
}

const Button = ({ colour, onButtonClicked, children }: Props) => {
  return (
    <button
      type="button"
      className={"btn " + getButtonClass(colour)}
      onClick={onButtonClicked}
    >
      {children}
    </button>
  );
};

export default Button;
