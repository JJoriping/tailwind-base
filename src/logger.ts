import { col, Logger } from "@daldalso/logger";

export const logger = new Logger({
  headerFormat: col.lMagenta`tailwind-base` + " $H │ ",
  indent: 18
});