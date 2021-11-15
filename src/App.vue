<template>
	<div id="app" >

		<GuessingGame />

	</div>
</template>

<script>

import GuessingGame from './components/GuessingGame.vue'

export default {
  name: 'App',
  components: {
	GuessingGame
  }
}
</script>

<style>
#app {

} 

  body {
    background: #232323;
    margin: 0;
    font-family: "Montserrat", "Avenir";
  }
</style>
