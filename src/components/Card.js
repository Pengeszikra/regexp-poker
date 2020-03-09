import React from "react";

export default ({ suit, run, hasReveal, id }) =>    
  hasReveal
    ? <div className={`${suit} c${run}`} key={id} />
    : <div className="B" />
