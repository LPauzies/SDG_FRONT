<template>
  <div>
    <div id="notfound" class="ui column centered sdg-text-center sdg-view">
      <h2>{{ errorType }}</h2>
      <div class="ui column centered">
        <img id="img" class="ui centered medium image" src="@/assets/vader.png"/>
        <div class="ui huge label">I find your lack of navigation disturbing</div>
      </div>

    </div>
    <sui-divider/>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    errorType: String
  }
}
</script>

<style scoped lang="scss">

  #notfound {
    padding-top:5vh;
    padding-bottom:5vh;
  }

  #img {
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

</style>
