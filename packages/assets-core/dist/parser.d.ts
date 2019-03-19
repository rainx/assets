import { IEntry, IAssetsOptions } from "./types";
export declare class Parser {
    static parseDirectory(dirpath: string, options?: IAssetsOptions): IEntry[] | undefined;
}
