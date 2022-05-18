<template>
  <div>
    <h1>Hello!</h1>
  </div>
</template>

<script>

  export default {
    name: 'HomeView',

    components: {
    },

    created() {
      this.$ajax.get('/data.json')
      .then(function(response) {
        console.log(response.data)
      })
      .catch(function(err) { 
          console.log(err)      
      })
    }
  }
</script>
