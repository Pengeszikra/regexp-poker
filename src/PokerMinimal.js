import React, {useEffect, useState} from "react";
import { calcScore, matrixLine, game, grab } from "./flow/purepoker";

export default () => {
  const [content, setContent] = useState('');
  const log = json => JSON.stringify(json, null, 2) |> setContent;

  useEffect(() => {
    const cards = grab(7);
    const matrix = matrixLine(cards);
    const many = {
      cards,
      matrix,
      score: calcScore(matrix),
      game: game({hand:grab(5)})
     };
     many |> log
  }, []);
  return <pre>{content}</pre>;
}