/* eslint-disable @typescript-eslint/no-empty-interface, @daldalso/variable-name, @daldalso/no-unsafe-unquoted-key */
import type { JSX as ReactJSX } from "react";

export namespace TailwindBaseJSX{
  // eslint-disable-next-line @daldalso/no-type-name-affix
  type ElementType = ReactJSX.ElementType;
  interface Element extends ReactJSX.Element{}
  interface ElementClass extends ReactJSX.ElementClass{}
  interface ElementAttributesProperty extends ReactJSX.ElementAttributesProperty{}
  interface ElementChildrenAttribute extends ReactJSX.ElementChildrenAttribute{}
  type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<C, P>;
  interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes{}
  interface IntrinsicClassAttributes<T> extends ReactJSX.IntrinsicClassAttributes<T>{}
  interface IntrinsicElements extends Augmented<ReactJSX.IntrinsicElements, { c?: CValue }>{}
}
export type CValue = ArrayOr<string|undefined|null|0|0n|false>;

type Augmented<T, O> = {
  [key in keyof T]: T[key]&O
};
type ArrayOr<T> = T|T[];