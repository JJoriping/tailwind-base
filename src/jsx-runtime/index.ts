/* eslint-disable unicorn/prefer-export-from, @daldalso/variable-name, @daldalso/one-exported-react-component */
import { jsx as _jsx, jsxs as _jsxs, Fragment } from "react/jsx-runtime";
import wrapJSX from "../wrap-jsx.js";

const jsx = wrapJSX(_jsx);
const jsxs = wrapJSX(_jsxs);

export { jsx, jsxs, Fragment };
export type { TailwindBaseJSX as JSX } from "../../react.d.ts";