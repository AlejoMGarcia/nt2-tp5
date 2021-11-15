<template>

  <section class="src-components-guessing-game">

    <div id="header" :style="getColorHeader()">
			<h1>The Great 
				<br>
				<span id="colorDisplay"> {{ pickedColor }}</span>
				<br>
				Guessing Game
			</h1>
		</div>

    <div id="navigator">
      
			<button id="reset"  @click="reset()"> {{ fromStateGame().resetButtonLabel }} </button>
      <span id="message" :style="fromStateGame().style"> {{ fromStateGame().message }} </span>

			<button id="easy" :class="getClass(easyLevelName)" @click="changeGameLevel(easyLevelName)"> {{ easyLevelName }} </button>
			<button id="hard" :class="getClass(hardLevelName)" @click="changeGameLevel(hardLevelName)"> {{ hardLevelName }} </button>

      <GuessingGameBoard :colorCount="colorCount" :colors="fromStateGame().colors" :pickedColor="pickedColor" :removedSquares="removedSquares" @finishedGame="finishedGame=$event"/> 

		</div>
  </section>

</template>

<script>


import GuessingGameBoard from './GuessingGameBoard.vue'

  export default  {
    name: 'src-components-guessing-game',
    props: [],
    components: {
      GuessingGameBoard
    },
    mounted () {
      this.reset()
    },
    data () {
      return {
        easyLevelName: 'easy',
        hardLevelName: 'hard',
        easy: false,
        colorCount: 6, 
        colors: [],
        removedSquares: [],
        pickedColor: null,
        clickedColor: null,
        finishedGame: false,
      }
    },
    methods: {
      getClass(levelName){
        if(levelName == this.hardLevelName && !this.easy)
          return 'selected'
        else if(levelName == this.easyLevelName && this.easy)
          return 'selected'
        else 
          return ''
      },
      changeGameLevel(levelName) {
        if(levelName == this.hardLevelName && !this.easy
          || levelName == this.easyLevelName && this.easy) return

        if(levelName == this.easyLevelName) this.colorCount = 3
        else this.colorCount = 6

        this.easy = !this.easy
        this.reset()
      },
      createNewColors(numbers){
        var arr = [];
        for (var i = 0; i < numbers; i++) {
          arr.push(this.createRandomStringColor());
        }
        return arr;
      },
      createRandomStringColor(){
        var newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")" ;
        return newColor;
      },
      randomInt(){
        return Math.floor(Math.random() * 256);
      },
      reset() {
        this.finishedGame = false
        this.message = ''
        this.resetButtonLabel= 'New colors'
        this.removedSquares = []
        this.colors = this.createNewColors(this.colorCount);
        this.pickedColor = this.colors[this.PickColor()];
      },
      PickColor(){
        var quantity;
        if (!this.easy) {
          quantity = 6;
        } else {
          quantity = 3;
        }
        return Math.floor(Math.random() * quantity );
      },
      getColorHeader() {
        let color = 'steelblue'
        if(this.finishedGame)
          color = this.pickedColor
          
        return `background: ${color};` 
      },
      fromStateGame() {
        if(this.finishedGame){
          let colors = []
          for (let index = 0; index < this.colorCount ; index++) {
            colors[index] = this.pickedColor 
          }

          return {
            message : "You Picked Right!", 
            resetButtonLabel: "Play Again!", 
            style : { color: "#000000" },
            colors: colors
          }
        } else {
          return {
            message : "Try Again!", 
            resetButtonLabel: "New Colors!", 
            style : { color: "#000000" },
            colors: this.colors
          }
        }
      },
    },
    computed: {
      
    }
}


</script>

<style scoped lang="css">
  .src-components-guessing-game {

  }

  h1 {
    font-weight: normal;
    line-height: 1.1;
    padding: 20px 0;

  }

  #navigator {
    background: #ffffff;
    height: 30px;
    text-align: center;
    margin: 0;
    margin-top: -30px;

  }

  #header {
    transition: all 0.3s;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    color: white;
    
  }
  
  #colorDisplay {
    font-size: 200%;
  }

  button {
    border: none;
    background-color: white;
    font-family: "Montserrat", "Avenir";
    text-transform: uppercase;
    height: 100%;
    font-weight: 700;
    letter-spacing: 1px;
    color: steelblue;
    transition: all 0.3s;
    outline: none;
  }
  button:hover {
    color: white;
    background-color: steelblue;
  }

  .selected {
    background-color: steelblue;
    color: white;
  }

  #message {
    display: inline-block;
    width: 20%;
  }
  
</style>
