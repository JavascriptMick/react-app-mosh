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
        <div>{children}&nbsp;<button onClick={() => setMore(false)}>Less</button></div>
      ) : (
        <div>{children.substring(0, maxChars)}...&nbsp;<button onClick={() => setMore(true)}>More</button></div>
      )}
    </p>
  );
};

export default ExpandableText;
