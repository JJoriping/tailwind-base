import { loadTailwindBase } from "../dist/index.js";
import tailwindBase from "./tailwind-base.js";

const twBase = loadTailwindBase(tailwindBase);
const c = twBase.merge.bind(twBase);

// Test here