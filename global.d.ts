declare module "tailwindcss/lib/lib/load-config.js"{
  function loadConfig(path:string):Promise<import('tailwindcss').Config>;
}
declare module "tailwindcss/lib/public/resolve-config.js"{
  export default {
    'default'(config:import('tailwindcss').Config):typeof config
  };
}
declare module "tailwindcss/lib/lib/setupContextUtils.js"{
  type TailwindContext = {
    'candidateRuleMap': Map<string, RuleTuple[]>
  };
  type RuleTuple = [metadata:RuleMetadata, rule:import('postcss').Rule|import('postcss').AtRule|Function];
  type RuleMetadata = {
    'layer': "base"|"utilities"|"defaults"|"components",
    'options': {
      'modifiers': boolean,
      'respectImportant': boolean,
      'respectPrefix': boolean,
      'types'?: Array<{ type: string, preferOnConflict: boolean }>,
      'values'?: Record<string, string>,
      'supportsNegativeValues'?: boolean
    }
  };

  function createContext(config:import('tailwindcss').Config):TailwindContext;
}