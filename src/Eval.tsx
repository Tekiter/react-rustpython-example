import { useState } from "react";
import { usePython } from "./python/python";

function Eval() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const python = usePython();

  function run() {
    if (!python) {
      throw new Error("Something wrong.");
    }

    const result = python.eval(input);

    setOutput(result);
  }

  return (
    <div>
      <h1>Eval</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={run}>Run</button>
      <div>
        <h2>Output</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Eval;
