import { IEntry } from "./types";
import * as fs from "fs";

class Parser {
  public static parseDirectory(filepath: string): IEntry | undefined {
    const directory = fs.readdirSync(filepath, {
      withFileTypes: true
    });

    return undefined;
  }
}
