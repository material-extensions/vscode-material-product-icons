import { promises as fs } from 'fs';
import webfont from 'webfont';

webfont({
  files: 'icons/**/*.svg',
  fontName: 'material-icons',
  formats: ['woff'],
  glyphTransformFn: (obj) => {
    obj.name += '_transform';
    return obj;
  },
  prependUnicode: true,
})
  .then(async (result) => {
    await save(result.woff as Uint8Array);
    return result;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });

const save = (result: Uint8Array) => {
  return fs.writeFile('theme/material-icons.woff', result);
};
