const pattern = /(?<![)=]\s*){(?=[^{]*?:[\S\s]+?["'][\S\s]+?})\s*([^}]+?)\s*}/g;
const g1Pattern = /(?:^|\s*[,{]\s*)(?:(["'])(.+?)\1|(\w+))\s*:\s*((["'])[^}]+?\5)(?=\s*[,}]|$)/g;
const valuePattern = /(["'])(.+?)\1/g;
const valueSpacePattern = /\s+/;

export default function buildTailwindBaseTransformer(postprocessors:Array<(value:string) => string|void> = []){
  return (content:string) => content.replace(pattern, (_, g1:string) => {
    let modified = false;
    let R = g1.replace(g1Pattern, (_, h1, quotedKey:string, unquotedKey:string, value:string) => {
      let r = "";

      for(const v of value.matchAll(valuePattern)){
        for(const w of v[2].split(valueSpacePattern)){
          r += `${quotedKey || unquotedKey}:${w} `;
        }
      }
      modified = true;
      return `"${r}"`;
    });
    if(modified){
      for(const v of postprocessors){
        R = v(R) || R;
      }
      return R;
    }
    return _;
  });
}