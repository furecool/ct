<template>
  <!-- <hello-world /> -->
  <div class="jack">
    <h1>{{obj.name}}</h1>
    <ul>
      <li v-for="li in obj.dialogue" :key="li.id">{{li}}</li>
    </ul>
  </div>
</template>
<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'JackView',
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
          if(item.name=="傑克"){
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
