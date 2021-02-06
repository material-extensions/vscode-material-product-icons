# Contributing

## Requirements

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)

Install all required node modules with this command:

```
npm install
```

## Add icon

All icons are SVG files and they can be found in the "icons" directory.

### Template

Please make use of the icon template which is provided in this repository as "icon-template.svg" file. The icon should be a little bit smaller than the whole document, so that there's some space around the icons.

Please save the SVG file as optimized SVG file inside the "icons" directory and give it a proper file name. The file name must be without the prefixed unicode.

### Add icon to font

After you've added the file you can run this command to add the icon to the font file:

```
npm run build
```

If you want to run the build in a watch mode so that it reacts to file changes you can run the following command:

```
npm start
```

The build adds the SVG icon to the "material-icons.woff" font file which can be found inside the "theme" directory. In addition, it prefixes the SVG file that was added to the "icons" directory with a unicode.

### Map font character to icon

As a last step you have to map the icon to a font character in VS Code. This can be configured in the "material.product-icon-theme.json" file that is also part of the "theme" directory.

The structure is like this:

```json
{
    "iconDefinitions": {
		"files": {
			"fontCharacter": "\\EA01"
		},
		"search": {
			"fontCharacter": "\\EA02"
        }
    }
}
```

Here a new association can be added by selecting a VS Code icon as the key (e.g. "files") and apply a font character to it. The character is the prefixed unicode of the SVG file (without the leading "u"). 

### Preview icon in VS Code

The icons can be previewed if the launch task "Launch Extension" is executed by pressing the shortcut <kbd>F5</kbd>.

## Create preview screenshot

You can generate a preview of all icons with this command:

```
npm run preview
```

The generated preview can be found inside the "images" folder as "preview.png" file.