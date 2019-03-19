export declare enum IEntryType {
    FILE = 1,
    DIRECTORY = 2
}
export interface IEntry {
    type: IEntryType;
    filename: string;
    basedir: string;
    exportedName: string;
}
export interface IAssetsOptions {
    module: "es6" | "commonjs";
    filetype: "ts" | "js";
    match: string;
    assetsPathList: string[];
}
export declare const defaultAssetsOptions: IAssetsOptions;
