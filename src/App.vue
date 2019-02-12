<template>
  <div id="game-of-life">
    <div class="buttons-container">
      <button @click="randomizeMap()">Random</button>
    </div>
    <div class="buttons-container">
      <button @click="updateAliveCellsMap()">Next</button>
    </div>
    <div class="buttons-container">
      <button @click="playAlone()">Play</button>
    </div>
    <div class="buttons-container">
      <button @click="clearMap()">Clear</button>
    </div>
    <Grid :row-count="rowCount" :column-count="columnCount" :aliveCellsMap="aliveCellsMap" :toggleCellStateCallback="toggleCellState" />
  </div>
</template>

<script>
import Grid from './Grid'
import { getRandomizedMap, getCellIdFromIndex } from './services/grid-helper.js'
import { getNextMap } from './services/conway-rules.js'

const initialRowCount = 10;

export default {
  name: 'GameOfLife',
  components: { Grid },
  data: function () {
    return {
      rowCount: initialRowCount,
      aliveCellsMap: {
        R6C15: true,
        R9C13: true,
        R8C18: true,
        R1C25: true,
        R5C24: true,
      }
    }
  },
  computed: {
    columnCount: function () {
      return 3 * this.rowCount;
    }
  },
  methods: {
    randomizeMap: function () {
      this.aliveCellsMap = getRandomizedMap(this.rowCount, this.columnCount)
    },
    toggleCellState: function (cellIndex) {
      const cellId = getCellIdFromIndex(cellIndex, this.columnCount);
      const newAliveCellsMap = {...this.aliveCellsMap}
      newAliveCellsMap[cellId] = !newAliveCellsMap[cellId];
      this.aliveCellsMap = newAliveCellsMap
    },
    updateAliveCellsMap: function () {
      this.aliveCellsMap = getNextMap(this.rowCount, this.columnCount, this.aliveCellsMap)
    },
    clearMap: function() {
      this.aliveCellsMap = {}
    },
    playAlone: function() {
      setInterval(this.updateAliveCellsMap, 300)
    }
  }
}
</script>

<style>
#game-of-life {
  padding: 60px 40px;
  position: relative;
}
.logos-container {
  position: absolute;
  top: 0;
  left: 0;
}
.logos-container img {
  height: 40px;
}
.logos-container img + img {
  margin-left: 5px;
}
.buttons-container {
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.5);
}
</style>
