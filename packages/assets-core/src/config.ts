import { defaultAssetsOptions } from "./types";
import * as fs from "fs";

/**
 * Load config from file, if error or file is not existing, use default options
 */
class Config {
  public loadOptionsFromConfigFile(configFileName: string) {
    const stats = fs.lstatSync(configFileName);
    if (!stats.isFile()) {
      return defaultAssetsOptions;
    }

    const content = fs.readFileSync(configFileName, { encoding: "utf-8" });

    if (!content) {
      return defaultAssetsOptions;
    }

    try {
      const configObject = JSON.parse(content);
      return {
        ...defaultAssetsOptions,
        ...configObject
      };
    } catch (e) {
      return defaultAssetsOptions;
    }
  }
}
