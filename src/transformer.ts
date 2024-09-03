const pattern = /{(?=[^{]*?:[\S\s]+?["'][\S\s]+?})\s*([^}]+?)\s*}/g;
const g1Pattern = /(?:(["'])(.+?)\1|(\w+))\s*:\s*([^}]+?)(?=\s*,|$)/g;
const valuePattern = /(["'])(.+?)\1/g;
const valueSpacePattern = /\s+/;

export default function tailwindBaseTransformer(content:string):string{
  return content.replace(pattern, (_, g1:string) => {
    let R = "";

    for(const [ ,, complexKey, simpleKey, value ] of g1.matchAll(g1Pattern)){
      for(const w of value.matchAll(valuePattern)){
        for(const x of w[2].split(valueSpacePattern)){
          R += `${complexKey || simpleKey}:${x} `;
        }
      }
    }
    return R ? `"${R}"` : _;
  });
}