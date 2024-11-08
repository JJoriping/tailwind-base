const pattern = /{(?=[^{]*?:[\S\s]+?["'][\S\s]+?})\s*([^}]+?)\s*}/g;
const g1Pattern = /(?:^|\s*,\s*)(?:(["'])(.+?)\1|(\w+))\s*:\s*((["'])[^}]+?\5)(?=\s*,|$)/g;
const valuePattern = /(["'])(.+?)\1/g;
const functionCallPattern = /^[\w.]+\(/g;
const valueSpacePattern = /\s+/;

export default function buildTailwindBaseTransformer(postprocessors:Array<(value:string) => string|void> = []){
  return (content:string) => content.replace(pattern, (_, g1:string) => {
    let R = "";

    for(const [ ,, quotedKey, unquotedKey, value ] of g1.matchAll(g1Pattern)){
      if(functionCallPattern.test(value)){
        // Not to transform `{ myClass: c("font-bold") }`
        R += g1;
        continue;
      }
      for(const w of value.matchAll(valuePattern)){
        for(const x of w[2].split(valueSpacePattern)){
          const key = quotedKey || unquotedKey;

          R += `${key}:${x} `;
        }
      }
    }
    if(R) for(const v of postprocessors){
      R = v(R) || R;
    }
    return R ? `"${R}"` : _;
  });
}