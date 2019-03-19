import { Config } from "assets-core/src/config";
import * as program from "commander";
import { generateIndexFileForDirectory } from "assets-core/src/index";
import { IAssetsOptions, defaultAssetsOptions } from "assets-core/src/types";
import * as fs from "fs";

let directory;

program
  .arguments("<direcotry>")
  .option("-m, --module <module>", "use which JS module systems: es6/commonjs")
  .option("-v, --verbose", "ouput detail message to stdout")
  .option("-t, --filetype <filetype>", "which file extionsion to use: ts/js")
  .option(
    "-c, --config <config>",
    "config file to read. default <cwd>/.assetsrc",
    "./assetsrc"
  )
  .option(
    "-m, --match <match>",
    "Which files to import. in minimatch format: eg. *.+(png/svg)"
  )
  .action(rootDirecotry => {
    directory = rootDirecotry;
  })
  .parse(process.argv);

// config priority cli options > config_file > default_value

let options: IAssetsOptions = defaultAssetsOptions;

if (program.config !== undefined) {
  try {
    if (fs.lstatSync(program.config).isFile()) {
      if (program.verbose) {
        console.log(`Config file founded! load from ${program.config}`);
        options = Config.loadOptionsFromConfigFile(program.config);
      }
    } else {
      if (program.verbose) {
        console.log("Config file not founded! use default config");
      }
    }
  } catch (e) {
    if (program.verbose) {
      console.log(
        "Config file your provide has some problems, can not load, fallback to use default config"
      );
    }
  }
} else {
  if (program.verbose) {
    console.log("Config file not founded! use default config");
  }
}

if (directory !== undefined) {
  options = {
    ...options,
    assetsPathList: [directory]
  };
}

if (program.module) {
  options = {
    ...options,
    module: program.module
  };
}

if (program.filetype) {
  options = {
    ...options,
    filetype: program.filetype
  };
}

if (program.match) {
  options = {
    ...options,
    match: program.match
  };
}

if (program.verbose) {
  console.log(`Options is: \n${JSON.stringify(options, undefined, 2)}`);
}

options.assetsPathList.forEach(assetsPath => {
  // Run generate command
  generateIndexFileForDirectory(assetsPath, true, options, program.verbose);
});
