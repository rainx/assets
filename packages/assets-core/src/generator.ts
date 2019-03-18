import {
  IEntry,
  IEntryType,
  AssetsOptions,
  defaultAssetsOptions
} from "./types";

export class Generator {
  /**
   * @param entryList entry list to process in this path
   */
  public static generateContentByEnteryList(
    entryList: IEntry[],
    options: AssetsOptions = defaultAssetsOptions
  ) {
    const symbolsToExport: string[] = [];
    const importLines: string[] = [];

    // sort first
    entryList
      .sort((entry, entryNext) => entry.type - entryNext.type)
      .forEach(entry => {
        symbolsToExport.push(entry.exportedName);
        if (options.module == "es6") {
          importLines.push(
            `import ${entry.exportedName} from './${entry.filename}';`
          );
        } else if (options.module == "commonjs") {
          importLines.push(
            `const ${entry.exportedName} = require('./${entry.filename}');`
          );
        }
      });

    const importBlock = importLines.join("\n");
    let exportBlock;

    if (options.module === "es6") {
      exportBlock = `export default {
    ${symbolsToExport.join(",\n    ")}
};`;
    } else if (options.module === "commonjs") {
      exportBlock = `module.exports = {
    ${symbolsToExport.join(",\n    ")}
};`;
    }

    return [importBlock, "\n", exportBlock].join("\n");
  }
}
