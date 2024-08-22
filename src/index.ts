import { createTailwindMerge } from "tailwind-merge";
import type { CValue } from "../react.js";

let customTwMerge:(...args:CValue[]) => string;

export function loadTailwindBase(config:any):void{
  customTwMerge = createTailwindMerge(() => config);
}
export default function c(...args:CValue[]):string{
  return customTwMerge(...args);
}