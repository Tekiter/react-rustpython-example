import { useState } from "react";
import { usePython } from "./python/python";
import mainpy from "./python/main.py?raw";
import fibopy from "./python/fibo.py?raw";
import Eval from "./Eval";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const python = usePython();

  function run() {
    if (!python) {
      throw new Error("Something wrong.");
    }

    const result = python.eval("sum(x+1 for x in range(10))");

    // python.addToScope("key", "asdf");
    // python.injectModule("fibo", fibopy, {
    //   a: 123,
    // });

    // const ret = python.exec(mainpy, "main.py");

    // console.log(ret);
    setOutput(result);
  }

  return (
    <div>
      <Eval />
    </div>
  );
}

export default App;
