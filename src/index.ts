import type { CValue } from "../react.js";
import type { TailwindBaseConfig } from "./lib/index.js";
import TailwindBase from "./lib/index.js";

let tailwindBase:TailwindBase;

export function loadTailwindBase(config:TailwindBaseConfig, cacheEnabled?:boolean):TailwindBase{
  return tailwindBase = new TailwindBase(config, cacheEnabled);
}
export default function c(...args:CValue[]):string{
  return tailwindBase.merge(...args);
}