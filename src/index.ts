import webfont from 'webfont';
import { promises as fs } from 'fs';

webfont({
    files: "icons/**/*.svg",
    fontName: "material-icons",
    formats: ['woff'],
    glyphTransformFn: obj => {
        obj.name += "_transform";
        return obj;
    },
    prependUnicode: true,
}).then(async result => {
    await save(result.woff as Uint8Array);
    return result;
}).catch(error => {
    throw error;
});

async function save(result: Uint8Array) {
    await fs.writeFile('theme/material-icons.woff', result);
}