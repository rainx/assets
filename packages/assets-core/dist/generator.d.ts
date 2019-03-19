import { IEntry, IAssetsOptions } from "./types";
export declare class Generator {
    /**
     * @param entryList entry list to process in this path
     */
    static generateContentByEnteryList(entryList: IEntry[], options?: IAssetsOptions): string;
}
