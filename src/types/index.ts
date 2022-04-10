import type {instruments} from "../constants";

export type Instrument = keyof typeof instruments | null;