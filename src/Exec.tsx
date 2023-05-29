import { FC, useState } from "react";
import { createPythonVm } from "./python/python";

const Exec: FC = () => {
  const [output, setOutput] = useState("");

  async function run() {
    const python = await createPythonVm();

    python.setStdout((message: unknown) =>
      setOutput((output) => output + `${message}`)
    );
    python.addToScope("__name__", "__main__");

    python.injectJSModule("module_js", {
      add(a: unknown, b: unknown) {
        if (typeof a !== "number" || typeof b !== "number") {
          throw new Error("a and b should be numbers.");
        }

        return a + b;
      },
    });
    python.injectModule("module_py", modulepy, {});

    python.exec(sourcepy, "source.py");
  }

  return (
    <div>
      <h1>Exec</h1>
      <button onClick={run}>Run</button>
      <h2>Output</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default Exec;

const modulepy = `
def mul(a, b):
  return a * b
`;

const sourcepy = `
import module_js
import module_py

if __name__ == '__main__':
  print("Add: " + str(module_js.add(5, 8)))
  print("Mul: " + str(module_py.mul(5, 8)))
`;
