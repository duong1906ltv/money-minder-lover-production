export const formatCell = async (
  sheet,
  lastColumnIndex,
  rowCount,
  lastColumnLetter,
  numberOfRows = 1
) => {
  await sheet.loadCells(`A1:${lastColumnLetter}${rowCount + numberOfRows - 1}`);
  for (let row = 1; row <= numberOfRows; row++) {
    for (let col = 1; col <= lastColumnIndex; col++) {
      const sourceRange = `${String.fromCharCode(65 + col - 1)}3`;
      const targetRange = `${String.fromCharCode(65 + col - 1)}${
        rowCount - row + 1
      }`;
      const sourceCell = sheet.getCellByA1(sourceRange);
      const targetCell = sheet.getCellByA1(targetRange);
      targetCell.textFormat = sourceCell.textFormat;
      targetCell.borders = sourceCell.borders;
      targetCell.backgroundColor = sourceCell.backgroundColor;
      targetCell.horizontalAlignment = sourceCell.horizontalAlignment;
      targetCell.backgroundColorStyle = sourceCell.backgroundColorStyle;
      targetCell.numberFormat = sourceCell.numberFormat;
      targetCell.save();
    }
  }
};
