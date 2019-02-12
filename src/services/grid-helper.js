export const getCellIdFromIndex = function(cellIndex, columnsCount) {
  const row = Math.floor((cellIndex - 1) / columnsCount)
  const column = (cellIndex - 1) % columnsCount
  return getCellId(row, column)
}

export const getCellId = function(row, column) {
  return `R${row}C${column}`
}

export const getRandomizedMap = function (rowCount, columnCount) {
  const aliveCellsMap = {};
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (Math.random() > 0.7) {
        aliveCellsMap[getCellId(row, column)] = true;
      }
    }
  }
  return aliveCellsMap;
}
