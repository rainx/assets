# Assets

## Intro

Assets index generate toolset, this tool is used for Javascript/Typescript project to manage assets. It's idea is from Android resource management mechanism(`R.java`)

## Installation

```
> yarn global add assets-cli
```

## Usage

```
Recursively generate index.ts files on src/assets direcotry

> assets -v src/assets

or You could use nodemon to watch changes and regenerate it once new asset added

> yarn global add nodemon
For example: your asset files is under src/assets directory
> cat ./nodemon.json
{
    "verbose": true,
    "ignore": ["**/*.ts", "**/*.js"],
    "watch": "./src/assets/",
    "ext": "png,svg,xml.pdf,ico",
    "exec": "assets -v src/assets"
}
> nodemon

```

## Example

You has such a directory structure in you project.

```
assets
├── images
│   ├── banana.svg
│   └── orange.png
└── logo.png

```

after processed by `assets tool`, it could add two `index.ts|js` files, it placed on each directory path.

```
assets
├── images
│   ├── banana.svg
│   ├── index.ts
│   └── orange.png
├── index.ts
└── logo.png
```

`index.ts` file in the root directory (assets) will be:

```javascript
import logoPng from "./logo.png";
import images from "./images";

export default {
  logoPng,
  images
};
```

and `index.ts` file in images directory will be:

```javascript
import bananaSvg from "./banana.svg";
import orangePng from "./orange.png";

export default {
  bananaSvg,
  orangePng
};
```

and then, if you wanna use images in your project. you just need to load `index.ts` in the root directory and then, you will get all references there(just like `R.java` in Android)

The following is a React Component as example:

```javascript
import assets from "../assets";

const FriutList = () => {
  return (
    <ul>
      <li>
        <img src={assets.images.bananaSvg} />
      </li>
      <li>
        <img src={assets.images.orangePng} />
      </li>
    </ul>
  );
};
```
