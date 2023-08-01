import { Button } from "@material-ui/core";
import { useState } from "react";

export const Contact = () => {
  let [like, setLike] = useState(5);

  return (
    <div>
      <h1>how much do you like this website?</h1>
      <h2>{like}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setLike(like + 1)}
      >
        Increase
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setLike(like - 1)}
        style={{ marginLeft: "10px" }}
      >
        Decrease
      </Button>
    </div>
  );
};
