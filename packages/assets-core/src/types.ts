export enum IEntryType {
  FILE = 1,
  DIRECTORY = 2
}

export interface IEntry {
  type: IEntryType;
  filename: string;
  basedir: string;
  exportedName: string;
}

export interface AssetsOptions {
  module: "es6" | "commonjs";
  filetype: "ts" | "js";
  match: string;
  assetsPathList: string[];
}

export const defaultAssetsOptions: AssetsOptions = {
  module: "es6",
  filetype: "ts",
  match: "*.+(png|jpg|png|svg|pdf|gif|mov|ico|xml)",
  assetsPathList: ["./assets"]
};
