import { col, Logger } from "@daldalso/logger";
import createStandardSubscriber from "@daldalso/logger/subscribers/standard.js";

export const logger = new Logger({
  headerFormat: col.lMagenta`tailwind-base` + " $H │ ",
  indent: 18
});
logger.addSubscriber(createStandardSubscriber(), { colored: true });