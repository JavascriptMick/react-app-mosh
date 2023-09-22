import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface Props {
  size: number;
  onClick: () => void;
}
const Like = ({ size, onClick }: Props) => {
  let [liked, setLiked] = useState(false);
  const onLiked = (isLiked: boolean) => {
    setLiked(isLiked);
    onClick();
  };
  if (liked) {
    return <AiFillHeart color="red" size={size} onClick={() => onLiked(false)} />;
  } else {
    return <AiOutlineHeart color="red" size={size} onClick={() => onLiked(true)} />;
  }
};

export default Like;
