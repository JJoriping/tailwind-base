import type { ReactElement } from "react";
import c from "./index.js";

export default function wrapJSX(Target:(...args:any[]) => ReactElement):typeof Target{
  return (type, props, ...rest) => {
    if(typeof type === "string" && props){
      props['className'] = c(props['className'], props['c']);
      if(!props['className']) delete props['className'];
      delete props['c'];
    }
    return Target(type, props, ...rest);
  };
}