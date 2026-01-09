
import { WASI } from 'wasi';
import { argv, env } from 'node:process';


const wasi = new WASI({ version: 'preview1', args: argv, env, });

const fs = await import('node:fs');
const url = await import('node:url');
const wasmBuffer = fs.readFileSync(url.fileURLToPath(import.meta.resolve('./wasmline-multiplatform-wasmline-sample-plugin.wasm')));
const wasmModule = new WebAssembly.Module(wasmBuffer);
const wasmInstance = new WebAssembly.Instance(wasmModule, wasi.getImportObject());

wasi.initialize(wasmInstance);

const exports = wasmInstance.exports

export const {
InitWasmline,
memory,
_initialize
} = exports


