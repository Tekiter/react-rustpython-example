import { useState } from "react";
import { createPythonVm } from "./python";

function Eval() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function run() {
    const python = await createPythonVm();

    python.addToScope("hello", "world");
    python.addToScope("alert", (message: string) => alert(message));

    const result = python.eval(input);

    setOutput(`${result}`);
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
