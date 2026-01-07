### Build and repro issues
> https://github.com/bytecodealliance/wasm-tools/releases/latest
> https://github.com/bytecodealliance/wasmtime/releases/latest
> 
> config env path

```shell
mkdir ./output
```

- on macOS/Linux
  ```shell
  ./gradlew :wasi-success:compileProductionLibraryKotlinWasmWasiOptimize
  ./wasmtime compile ./wasi-success/build/compileSync/wasmWasi/main/productionLibrary/optimized/kotlinwasi-wasmtime-issue-wasi-success.wasm -o ./output/success-plugin.cwasm \
    --target aarch64-linux-android \
    -W gc=y \
    -W function-references=y \
    -W exceptions=y \
    -W simd=n \
    -W relaxed-simd=n \
    -O static-memory-guard-size=0 \
    -O dynamic-memory-guard-size=0 \
    -O signals-based-traps=n \
    -O opt-level=2 \
    -C cranelift-debug-verifier=no
  ```
- on Windows
  ```shell
  ./gradlew.bat :wasi-failure:compileProductionLibraryKotlinWasmWasiOptimize
  wasmtime compile ./wasi-failure/build/compileSync/wasmWasi/main/productionLibrary/optimized/kotlinwasi-wasmtime-issue-wasi-failure.wasm -o ./output/-plugin.cwasm \
    --target aarch64-linux-android \
    -W gc=y \
    -W function-references=y \
    -W exceptions=y \
    -W simd=n \
    -W relaxed-simd=n \
    -O static-memory-guard-size=0 \
    -O dynamic-memory-guard-size=0 \
    -O signals-based-traps=n \
    -O opt-level=2 \
    -C cranelift-debug-verifier=no
  ```
---
  ```shell
  wasm-tools print ./wasi-success/build/compileSync/wasmWasi/main/productionLibrary/optimized/kotlinwasi-wasmtime-issue-wasi-success.wasm -o ./output/success-plugin.wat.txt
  wasm-tools print ./wasi-failure/build/compileSync/wasmWasi/main/productionLibrary/optimized/kotlinwasi-wasmtime-issue-wasi-failure.wasm -o ./output/failure-plugin.wat.txt
  diff ./output/failure-plugin.wat.txt ./output/success-plugin.wat.txt >> ./output/wat.diff.txt
  ```
   ```shell
  wasm-tools objdump ./wasi-failure/build/compileSync/wasmWasi/main/productionLibrary/optimized/kotlinwasi-wasmtime-issue-wasi-failure.wasm >> ./output/failure-plugin.obj.txt
  wasm-tools objdump ./wasi-success/build/compileSync/wasmWasi/main/productionLibrary/optimized/kotlinwasi-wasmtime-issue-wasi-success.wasm >> ./output/success-plugin.obj.txt
  diff ./output/failure-plugin.obj.txt ./output/success-plugin.obj.txt >> ./output/obj.diff.txt
  ``` 