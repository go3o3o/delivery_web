import { setupWorker } from "msw/browser";
import { shopHandlers } from "./shop/handler";

export const worker = setupWorker(...shopHandlers);
