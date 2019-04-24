import {
  IEntry,
  IEntryType,
  defaultAssetsOptions,
  IAssetsOptions
} from "./types";
import * as fs from "fs";
import * as path from "path";
import * as minimatch from "minimatch";
// No type defined file
const varname = require("varname");

export class Parser {
  public static parseDirectory(
    dirpath: string,
    options: IAssetsOptions = defaultAssetsOptions
  ): IEntry[] | undefined {
    let dirStats;
    try {
      dirStats = fs.lstatSync(dirpath);

      if (!dirStats.isDirectory()) {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }

    const filenames = fs.readdirSync(dirpath).sort();

    return filenames
      .map(filename => {
        const stats = fs.lstatSync(path.resolve(dirpath, filename));
        return { filename, stats };
      })
      .filter(({ filename, stats }) => {
        // Only process regular file or directory
        if (stats.isDirectory()) {
          return true;
        }

        if (stats.isFile()) {
          // if type is file, check match option to determine if need
          return minimatch(filename, options.match, { matchBase: true });
        }

        return false;
      })
      .map(({ filename, stats }) => {
        const rawExportedName = varname.camelback(filename) as string;
        // If it is a number , add prefix
        const exportedName = /\d/.test(rawExportedName.substr(0, 1))
          ? "num" + rawExportedName
          : rawExportedName;

        return {
          type: stats.isDirectory() ? IEntryType.DIRECTORY : IEntryType.FILE,
          filename,
          basedir: dirpath,
          exportedName: exportedName
        };
      });
  }
}
