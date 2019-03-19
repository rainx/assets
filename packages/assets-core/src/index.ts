import { IAssetsOptions, defaultAssetsOptions, IEntryType } from "./types";
import { Generator } from "./generator";
import { Parser } from "./parser";
import * as path from "path";
import * as fs from "fs";

export const generateIndexFileForDirectory = (
  dirpath: string,
  recursive: boolean,
  options: IAssetsOptions = defaultAssetsOptions,
  verbose: boolean = false
) => {
  const entryList = Parser.parseDirectory(dirpath, options);

  if (entryList) {
    let indexFilename = "index";
    const indexFileContent = Generator.generateContentByEnteryList(
      entryList,
      options
    );

    if (options.filetype === "ts") {
      indexFilename += ".ts";
    } else {
      indexFilename += ".js";
    }

    const indexFileFullPath = path.resolve(dirpath, indexFilename);
    fs.writeFileSync(indexFileFullPath, indexFileContent);
    if (verbose) {
      console.log(`Generated ${indexFilename} on directory: ${dirpath}`);
    }

    // if recursive set, recursively process all sub-directory
    if (recursive) {
      entryList
        .filter(entry => entry.type === IEntryType.DIRECTORY)
        .forEach(entry => {
          generateIndexFileForDirectory(
            path.resolve(dirpath, entry.filename),
            recursive,
            options,
            verbose
          );
        });
    }
  }
};
