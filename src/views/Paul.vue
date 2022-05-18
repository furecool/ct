<template>
  <!-- <hello-world /> -->
  <div class="paul">
    <h1>{{obj.name}}</h1>
    <ul>
      <li v-for="li in obj.dialogue" :key="li.id">{{li}}</li>
    </ul>
  </div>
</template>
<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'PaulView',
    components: {
      // HelloWorld,
    },
    data() {
      return {
        obj: {}
      }
    },
    created() {
      let vm = this
      this.$ajax.get('/data.json')
      .then(function(response) {
        vm.data = response.data.data
        vm.data.forEach(function(item){
          if(item.name=="保羅"){
            vm.obj = item
            // console.log(vm.obj.name)
          }
        })
      })
      .catch(function(err) { 
          console.log(err)      
      })
    },
  }
</script>
