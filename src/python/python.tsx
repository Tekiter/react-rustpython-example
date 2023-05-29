import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import init, { VirtualMachine, vmStore } from "./rustpython/rustpython_wasm";
import wasmUrl from "./rustpython/rustpython_wasm_bg.wasm?url";

const PythonContext = createContext<VirtualMachine | null>(null);

interface PythonProviderProps {
  children: ReactNode;
}

export const PythonProvider: FC<PythonProviderProps> = ({ children }) => {
  const [pyVm, setPyVm] = useState<VirtualMachine | null>(null);

  useEffect(() => {
    let vm: VirtualMachine;

    init(wasmUrl).then((a) => {
      vm = vmStore.init("rust_python_example", false);
      vm = vmStore.init("rust_python_example", false);
      vm.setStdout((str: unknown) => console.log("[PythonOutput]:", str));

      setPyVm(vm);
    });

    return () => {
      if (vm) {
        vm.destroy();
        setPyVm(null);
      }
    };
  }, []);

  return (
    <PythonContext.Provider value={pyVm}>{children}</PythonContext.Provider>
  );
};

export function usePython() {
  return useContext(PythonContext);
}

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
