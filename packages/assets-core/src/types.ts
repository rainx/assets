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
