import { useState } from "react";

interface Props {
  maxChars?: number;
  children: string;
}

const ExpandableText = ({ maxChars=45, children }: Props) => {
  let [more, setMore] = useState(false);
  if(children.length <= maxChars) return <p>{children}</p>;
  return (
    <p>
      {more ? (
        <span>{children}&nbsp;<button onClick={() => setMore(false)}>Less</button></span>
      ) : (
        <span>{children.substring(0, maxChars)}...&nbsp;<button onClick={() => setMore(true)}>More</button></span>
      )}
    </p>
  );
};

export default ExpandableText;
