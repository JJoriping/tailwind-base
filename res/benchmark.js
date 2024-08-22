import { Bench } from "tinybench";
import { createTailwindMerge } from "tailwind-merge";
import { loadTailwindBase } from "../dist/index.js";
import tailwindBase from "./tailwind-base.js";

let twBase, twMerge;
let cachedTwBase, cachedTwMerge;
{
  twBase = loadTailwindBase(tailwindBase);
  twBase = twBase.merge.bind(twBase);
  cachedTwBase = loadTailwindBase(tailwindBase, true);
  cachedTwBase = cachedTwBase.merge.bind(cachedTwBase);
  twMerge = createTailwindMerge(() => tailwindBase);
  cachedTwMerge = createTailwindMerge(() => ({ ...tailwindBase, cacheSize: 10000 }));
}

const scopeCandidates = [
  "", "hover:", "active:", "[&_div]:", "[&>*]:focus:"
];
const candidates = [
  "m-1", "m-2", "m-3", "m-4",
  "mx-1", "mx-2", "mx-3", "mx-4",
  "my-1", "my-2", "my-3", "my-4",
  "p-1", "p-2", "p-3", "p-4",
  "px-1", "px-2", "px-3", "px-4",
  "py-1", "py-2", "py-3", "py-4",
  "text-h1", "text-h2", "text-h3", "text-h4", "text-h5",
  "text-red-1", "text-red-2", "text-red-3", "text-red-4", "text-red-5",
  "text-[1pt]", "text-[2pt]", "text-[3pt]", "text-[4pt]", "text-[5pt]",
  "text-left", "text-right", "text-center",
  "fixed", "absolute", "relative", "flex", "grid", "block", "inline"
];
function generateClasses(count){
  const R = [];

  for(let i = 0; i < count; i++){
    R.push(scopeCandidates[Math.floor(Math.random() * scopeCandidates.length)] + candidates[Math.floor(Math.random() * candidates.length)]);
  }
  return R.sort((a, b) => a.localeCompare(b));
}
async function main(){
  const bench = new Bench({ time: 10000 });
  const tests = Array.from({ length: 10 })
    .map((_, i) => Array.from({ length: 100 }).map(() => generateClasses(i)))
    .flat()
  ;
  bench
    .add("tailwind-base (cached)", () => {
      for(const v of tests) cachedTwBase(...v);
    })
    .add("tailwind-merge (cached)", () => {
      for(const v of tests) cachedTwMerge(...v);
    })
    .add("tailwind-base (semi-cached)", () => {
      for(const v of tests) twBase(...v);
    })
    .add("tailwind-merge", () => {
      for(const v of tests) twMerge(...v);
    })
  ;
  await bench.warmup();
  await bench.run();
  console.table(bench.table());
}
main().then(() => {
  process.exit();
});