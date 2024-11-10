import type { CValue } from "../react.js";
import type { TailwindBaseConfig } from "./lib/index.js";
import TailwindBase, { ghostSymbol } from "./lib/index.js";

let tailwindBase:TailwindBase;

export function loadTailwindBase(config:TailwindBaseConfig, cacheEnabled?:boolean):TailwindBase{
  tailwindBase = new TailwindBase(config, cacheEnabled);
  return tailwindBase;
}
export default function c(...args:CValue[]):string{
  if(!tailwindBase){
    return Object.assign('(error)', { [ghostSymbol]: args });
  }
  return tailwindBase.merge(...args);
}