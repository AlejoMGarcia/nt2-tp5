<template>

  <section class="src-components-guessing-game-board">

		<div id="container">
      <div v-for="index in colorCount" :key="index">
        <Square :backgroundColor="getBackgroundColor(index-1)" @click.native="onclikSquare(index-1)"/>
      </div>
		</div>
  </section>

</template>

<script>

import Square from "./Square.vue";

  export default  {
    name: 'src-components-guessing-game-board',
    components: {
      Square
    },
    props: ['colorCount', 'colors', 'pickedColor', 'removedSquares'],
    mounted () {

    },
    data () {
      return {
        finishedGame: false
      }
    },
    methods: {
      getBackgroundColor(index){
        if(this.removedSquares.indexOf(index) != -1 && !this.finishedGame) return "#232323"

        return this.colors[index]
      },
      onclikSquare(index) {
        var clickedColor = this.colors[index];
        if (clickedColor === this.pickedColor) {
          this.finishedGame = true
          this.$emit('finishedGame', this.finishedGame)
        } else {
          this.finishedGame=false
          this.$emit('finishedGame', this.finishedGame)
          this.removedSquares.push(index)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-guessing-game-board {

  }

  #container {
    margin: 20px auto;
    max-width: 600px;
  }

</style>
