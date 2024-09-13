# tailwind-base
Let you exploit Tailwind in React more powerful

## Getting Started
### Installation
1. `yarn add @daldalso/tailwind-base`
2. `npx tailwind-base globals.css` (You should replace `globals.css` with the path of a proper Tailwind CSS file which contains something like `@tailwind base;`.)
3. Import the generated TypeScript file in your root component like `import "(my-src-path)/tailwind-base";`.
4. Update your Tailwind config file like below:
   ```js
   import tailwindBaseTransformer from "@daldalso/tailwind-base/transformer";

   export default {
     content: {
       files: [
         /* ... */
         "!**/tailwind-base.ts"
       ],
       transform: tailwindBaseTransformer
     }
   };
   ```
   If your `content` field is an array, move the array into `content.files` to set `content.transform`.

After the installation, you can call the default function `c` from `@daldalso/tailwind-base` to merge Tailwind classes like below:
```jsx
import { useState } from "react";
import c from "@daldalso/tailwind-base";

const MyComponent = () => {
  const [ blue, setBlue ] = useState(true);

  // The className goes to `text-center text-blue`.
  return <div className={c("text-center text-red", blue && "text-blue")}>
    Hello, <span className={c("font-bold")}>World</span>!
  </div>;
};
export default MyComponent;
```

### Implicit Mergence
In TypeScript, you can also merge the classes without explicitly calling `c`.
All you have to do is setting `jsxImportSource` in your `tsconfig.json` to `@daldalso/tailwind-base`.

After that, you can rewrite the above code like this:
```tsx
import { useState } from "react";

const MyComponent = () => {
  const [ blue, setBlue ] = useState(true);

  // The className goes to `text-center text-blue`.
  return <div c={["text-center text-red", blue && "text-blue"]}>
    Hello, <span c="font-bold">World</span>!
  </div>;
};
export default MyComponent;
```

### Grouping
You can group classes with an object whose keys are Tailwind variants like below:
```tsx
<button c={[
  "bg-red font-normal",
  {
    hover: "bg-blue font-bold",
    '[&:hover>b]': enlarging && "scale-150"
  }
]}>
  Hello, <b>World</b>!
</button>
```
The button's classes will be `bg-red font-normal hover:bg-blue hover:font-bold` and `[&:hover>b]:scale-150` if enlarging is true.
> [!WARNING]
>
> You should not set values of the object dynamically, just as Tailwind prevents you from setting class name dynamically.
> ```tsx
> const boldStyle = "font-bold";
>
> c(`hover:${boldStyle}`); // Prevented by Tailwind
> c(isBold ? "hover:font-bold" : "hover:font-normal"); // Fine
>
> c({ hover: boldStyle }); // Prevented by tailwind-base
> c({ hover: c("font-bold") }); // Prevented by tailwind-base
> c({ hover: isBold ? "font-bold" : "font-normal" }); // Fine
> ```

## Caveat
- You have to run `npx tailwind-base globals.css` whenever you update your Tailwind config file to let tailwind-base merge the updated classes correctly.