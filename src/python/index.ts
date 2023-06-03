import init, { vmStore } from "./rustpython/rustpython_wasm";
import wasmUrl from "./rustpython/rustpython_wasm_bg.wasm?url";

let loaded = false;

export async function createPythonVm() {
  if (!loaded) {
    loaded = true;
    await init(wasmUrl);
  }
  const vm = vmStore.init("rust_python_example", false);
  vm.setStdout(console.log);

  return vm;
}
