import type { CValue } from "../../react.js";

export type TailwindBaseConfig = {
  'classGroups': GroupDescriptor[]
};
type GroupDescriptor = Array<string|Record<string, CandidateDescriptor>>;
type CandidateDescriptor = string[]|Array<(value:string) => boolean>;

const dynamicValuePattern = /^(.+)-(\[.+])$/;

export default class TailwindBase{
  private readonly config:TailwindBaseConfig;
  private readonly chunkCache:Record<string, string>;
  private readonly indexCache:Record<string, string>;
  private readonly cacheEnabled:boolean;

  public constructor(config:TailwindBaseConfig, cacheEnabled:boolean = false){
    this.config = config;
    this.chunkCache = {};
    this.indexCache = {};
    this.cacheEnabled = cacheEnabled;
  }
  public merge(...args:CValue[]):string{
    let R:string|undefined;
    const chunk = concat(args);
    if(this.cacheEnabled && (R = this.chunkCache[chunk])){
      return R;
    }
    const usedIndices:Record<string, string> = {};
    const classes:string[] = [];
    const list = chunk.trim().split(/\s+/);

    for(let i = list.length - 1; i >= 0; i--){
      const v = list[i];
      const index = this.getIndex(v);
      if(!index){
        classes.unshift(v);
        continue;
      }
      if(index in usedIndices){
        continue;
      }
      usedIndices[index] = v;
      classes.unshift(v);
    }
    R = classes.join(' ');
    if(this.cacheEnabled) this.chunkCache[chunk] = R;
    return R;
  }
  private getIndex(className:string):string{
    let R:string;
    if((R = this.indexCache[className]) !== undefined) return R;
    let chunk:RegExpMatchArray|false|null;
    const list = className.split(':');
    const tail = list.pop()!;
    const index = this.config.classGroups.findIndex(v => {
      for(const w of v){
        if(typeof w === "string"){
          if(tail === w) return true;
        }else for(const m in w){
          for(const y of w[m]){
            if(typeof y === "string"){
              if(tail === `${m}-${y}`) return true;
            }else{
              chunk = tail.match(dynamicValuePattern);
              if(chunk && chunk[1] === m && y(chunk[2])){
                return true;
              }
            }
          }
        }
      }
    });
    return this.indexCache[className] = index === -1 ? "" : `${list.join(':')}:${index}`;
  }
}
function concat(args:CValue[]):string{
  let R = "";
  for(const v of args){
    if(!v) continue;
    if(typeof v === "string") R += ` ${v}`;
    else R += concat(v);
  }
  return R;
}