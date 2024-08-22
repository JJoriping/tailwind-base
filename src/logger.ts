import { col, Logger } from "@daldalso/logger";

Logger.instance.setOptions({ headerFormat: col.lMagenta`tailwind-base` + " $H │ ", indent: 18 });