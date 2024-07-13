import * as fs from 'fs';
import * as path from 'path';
import { createScreenshot, toTitleCase } from '../../helpers';
import * as painter from './../../helpers/painter';

const htmlDoctype = '<!DOCTYPE html>';
const cssFilePath = path.join('style.css');
const styling = `<link rel="stylesheet" href="${cssFilePath}">`;

const createHTMLTableHeadRow = (amount: number) => {
  const pair = `
        <th class="icon">Icon</th>
        <th class="iconName">Name</th>
    `;
  const columns = [...Array(amount)].map(() => pair).join('');
  return `
        <tr>
            ${columns}
        </tr>
    `;
};

const createHTMLTableBodyRows = (items: IconDefinition[][]) => {
  let rows = '';
  items.forEach((row) => {
    const columns = row
      .map(
        (icon) => `
            <td class="icon">
                <img src="./../../../icons/${icon.fileName}" alt="${
                  icon.iconName
                }">
            </td>
            <td class="iconName">${toTitleCase(icon.iconName)} (${icon.unicode})</td>
        `
      )
      .join('');
    const tableRow = `
            <tr>
                ${columns}
            </tr>
        `;
    rows = rows + tableRow;
  });
  return rows;
};

const createHTMLTable = (headRow: string, bodyRows: string) => `
    <table>
        ${headRow}
        ${bodyRows}
    </table>
`;

const createPreviewTable = (icons: IconDefinition[][], size: number) => {
  const table =
    htmlDoctype +
    styling +
    createHTMLTable(
      createHTMLTableHeadRow(size),
      createHTMLTableBodyRows(icons)
    );
  return table;
};

const savePreview = (
  fileName: string,
  size: number,
  icons: IconDefinition[][]
) => {
  const filePath = path.join(__dirname, fileName + '.html');

  // write the html file with the icon table
  fs.writeFileSync(filePath, createPreviewTable(icons, size));

  // create the image
  createScreenshot(filePath, fileName)
    .then(() => {
      console.log(
        '> Material Icon Theme:',
        painter.green(`Successfully created ${fileName} image!`)
      );
    })
    .catch(() => {
      throw Error(
        painter.red(`Error while creating ${fileName} preview image`)
      );
    });
};

const getIconDefinitionsMatrix = (
  icons: IconDefinition[],
  size: number,
  excluded: string[] = []
): IconDefinition[][] => {
  const iconList = icons
    .sort((a, b) => a.iconName.localeCompare(b.iconName))
    .filter((i) => excluded.indexOf(i.iconName) === -1);

  // list for the columns with the icons
  const matrix: IconDefinition[][] = [];

  // calculate the amount of icons per column
  const itemsPerColumn = Math.floor(iconList.length / size);

  // create the columns with the icons
  let counter = 0;
  for (let c = 0; c < itemsPerColumn; c++) {
    matrix[c] = [];
  }
  for (let s = 0; s < size; s++) {
    for (let i = 0; i < itemsPerColumn; i++) {
      matrix[i][s] = iconList[counter];
      counter++;
    }
  }

  return matrix;
};

/**
 * Function that generates the preview image for specific icons.
 * @param name name of the preview
 * @param icons icons for the preview
 * @param size amount of table columns
 * @param excluded which icons shall be excluded
 */
export const generatePreview = (
  name: string,
  icons: IconDefinition[],
  size: number,
  excluded: string[] = []
) => {
  savePreview(name, size, getIconDefinitionsMatrix(icons, size, excluded));
};

interface IconDefinition {
  iconName: string;
  fileName: string;
  unicode: string;
}
