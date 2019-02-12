import { getCellId } from './grid-helper'

/**
 * This function returns the Ids of the directly nearby cells
 *
 * @param {integer} row
 * @param {integer} column
 */
const getNeighbours = (row, column) => {
  return [
    getCellId(row - 1, column - 1),
    getCellId(row - 1, column),
    getCellId(row - 1, column + 1),
    getCellId(row, column - 1),
    getCellId(row, column + 1),
    getCellId(row + 1, column - 1),
    getCellId(row + 1, column),
    getCellId(row + 1, column + 1)
  ]
}

/**
 * This function returns the count of a position nearby alive cells
 *
 * @param {integer} row
 * @param {integer} column
 * @param {Object}  aliveCellsMap
 */
const getAliveNeighboursCount = (row, column, aliveCellsMap) => {
  const neighbours = getNeighbours(row, column)
  let aliveNeighboursCount = 0;
  for (let cell of neighbours) {
    if (aliveCellsMap[cell] === true) {
      aliveNeighboursCount ++;
    }
  }
  return aliveNeighboursCount;
}

/**
 * This function returns the next state of the cell according to Conway's rules
 *
 * @param {boolean} isAliveCell
 * @param {Object}  aliveNeighboursCount
 */
const getCellNextState = (isAliveCell, aliveNeighboursCount) => {
  if (isAliveCell && aliveNeighboursCount ===2 || aliveNeighboursCount === 3) {
    return true;
  }
  if (!isAliveCell && aliveNeighboursCount === 3) {
    return true;
  }
  return undefined;
}

/**
 * This function returns the new map of alive cells, after 1 iteration
 *
 * @param {integer} rowsCount
 * @param {integer} columnsCount
 * @param {Object}  aliveCellsMap
 */
export const getNextMap = (rowsCount, columnsCount, aliveCellsMap) => {
  const newAliveCellsMap = {}

  for (var row = 0; row < rowsCount; row++) {
    for (var column = 0; column < columnsCount; column++) {
      const isAliveCell = aliveCellsMap[getCellId(row, column)]
      const aliveNeighboursCount = getAliveNeighboursCount(row, column, aliveCellsMap)
      const cellNextState = getCellNextState(isAliveCell, aliveNeighboursCount)
      if (cellNextState) {
        newAliveCellsMap[getCellId(row, column)] = true
      }
      else {
        delete newAliveCellsMap[getCellId(row, column)]
      }
    }
  }
  return newAliveCellsMap
}
