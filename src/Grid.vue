<template>
  <div class="grid__container" :style="`--rows:${rowCount}; --columns:${columnCount};`">
      <Cell :isAlive="isCellAlive(cellIndex)" v-for="cellIndex in cellCount" :key="cellIndex" @click.native="toggleCellStateCallback(cellIndex)"/>
  </div>
</template>

<script>
import Cell from './Cell';
import { getCellIdFromIndex } from './services/grid-helper.js'

export default {
  name: 'Grid',
  components: { Cell },
  props: {
    rowCount: Number,
    columnCount: Number,
    aliveCellsMap: Object,
    toggleCellStateCallback: Function,
  },
  computed: {
    cellCount: function () {
      return this.rowCount * this.columnCount
    }
  },
  methods: {
    isCellAlive: function (cellIndex) {
      const cellId = getCellIdFromIndex(cellIndex, this.columnCount);
      return this.aliveCellsMap[cellId] === true;
    }
  }
}
</script>

<style>
  .grid__container {
    width: 90vw;
    height: 30vw;
    margin: auto;
    display: grid;
    border: solid 1px black;
    background-color: black;
    grid-gap: 1px;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
  }
</style>
