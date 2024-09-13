import type { CValue } from "../react.js";
import type { TailwindBaseConfig } from "./lib/index.js";
import TailwindBase, { ghostSymbol } from "./lib/index.js";

declare global{
  // eslint-disable-next-line no-var
  var tailwindBase:TailwindBase;
}
export function loadTailwindBase(config:TailwindBaseConfig, cacheEnabled?:boolean):TailwindBase{
  globalThis.tailwindBase = new TailwindBase(config, cacheEnabled);
  return globalThis.tailwindBase;
}
export default function c(...args:CValue[]):string{
  if(!globalThis.tailwindBase){
    return Object.assign('(error)', { [ghostSymbol]: args });
  }
  return globalThis.tailwindBase.merge(...args);
}