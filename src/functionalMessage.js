import React, { useState } from "react";

const FunctionalMessage = () => {
  let initialState = 0;
  const [count, setCount] = useState(initialState);

  function reset() {
    setCount(initialState);
  }
  function increament() {
    setCount(count + 1);
  }
  function decreament() {
    setCount(count - 1);
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => increament()}>increament</button>
      <button onClick={() => decreament()}>decreament</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};
export default FunctionalMessage;
