import {
  IEntry,
  IEntryType,
  IAssetsOptions,
  defaultAssetsOptions
} from "./types";
import * as path from "path";

export class Generator {
  /**
   * @param entryList entry list to process in this path
   */
  public static generateContentByEnteryList(
    entryList: IEntry[],
    options: IAssetsOptions = defaultAssetsOptions
  ) {
    const symbolsToExport: string[] = [];
    const importLines: string[] = [];

    // sort first
    entryList
      .sort((entry, entryNext) => {
        const typeDiff = entry.type - entryNext.type;
        // First, If type is not same, check the type first
        if (typeDiff !== 0) {
          return typeDiff;
        } else {
          // if type is same, check alphabet order
          if (entry.filename < entryNext.filename) {
            return -1;
          }
          if (entry.filename > entryNext.filename) {
            return 1;
          }
          return 0;
        }
      })
      .forEach(entry => {
        symbolsToExport.push(entry.exportedName);
        if (options.module == "es6") {
          importLines.push(
            `import ${entry.exportedName} from './${entry.filename}';`
          );

          if (
            options.exportReactComponentForSvg &&
            path.extname(entry.filename).toLowerCase() === ".svg"
          ) {
            const svgComponentName = `${entry.exportedName}Component`;
            importLines.push(
              `import { ReactComponent as ${svgComponentName} } from './${
                entry.filename
              }';`
            );
            symbolsToExport.push(svgComponentName);
          }
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
