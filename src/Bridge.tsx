import { FC, useState } from "react";
import { createPythonVm } from "./python";

const Bridge: FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<number | null>(null);

  async function run() {
    const python = await createPythonVm();

    python.injectJSModule("bridge", {
      getInput() {
        return parseInt(input, 10);
      },
      setResult(value: unknown) {
        if (typeof value !== "number") {
          throw new Error("value type is not number. " + value);
        }

        setOutput(value);
      },
    });

    python.injectModule("fibo", fibopy);

    python.exec(mainpy, "main.py");
  }

  return (
    <div>
      <h1>Fibo</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={run}>Run</button>
      <p>결과: {output}</p>
    </div>
  );
};

export default Bridge;

const mainpy = `
import bridge
from fibo import fibo

user_input = bridge.getInput()
result = fibo(user_input)
bridge.setResult(result)
`;

const fibopy = `
cache = {}

def fibo(n):
  if n <= 1:
    return n
  
  if cache.get(n) != None:
    return cache.get(n)

  r = fibo(n-2) + fibo(n-1)
  cache[n] = r
  
  return r
`;
