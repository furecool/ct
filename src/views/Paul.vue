<template>
  <div class="paul">

    <h1>{{obj.name}}</h1>

    <div>搜尋</div>    
    <div>
      <input type="text" placeholder="請輸入關鍵字...">{{ $t('GENERAL.ITEMS') }}
    </div>

    <ul>
      <li v-for="li in obj.dialogue" :key="li.id">{{li}}</li>
    </ul>

    <div @click="toogleMemo">備忘錄</div> 
    <div v-if="memoDisplay">
      <input v-model="newStr" :placeholder="$t('GENERAL.MESSAGE')"/>
      <button @click="addMemo">{{ $t('GENERAL.ADD') }}</button>
      <div v-for="(item, index) in items" :key="index">
        <p>{{item.date}} {{item.time}}</p>
        <p>{{item.text}}</p>
        <p @click="delMemo(index)">刪除</p>
      </div>
    </div>

  </div>
</template>
<script>

  export default {
    name: 'PaulView',
    data() {
      return {
        memoDisplay: false,
        obj: {},
        items: [
          {
            date:"2019/07/01",
            time:"13:45",
            text:"備忘訊息1",
          },
          {
            date:"2019/07/01",
            time:"13:45",
            text:"備忘訊息2",
          },
        ],
        newStr: ''
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
          }
        })
      })
      .catch(function(err) { 
          console.log(err)      
      })
    },
    methods: {
      toogleMemo() {
        this.memoDisplay = !this.memoDisplay
      },
      addMemo() {
        var Today=new Date();
        this.items.push(
          {
            date: Today.getFullYear() + "/" + (Today.getMonth()+1) + "/" + Today.getDate(),
            time: Today.getHours() + ":" + Today.getMinutes(),
            text: this.newStr,
          },
        );
        this.newStr = '';
      },
      delMemo(index) {
        this.items.splice(index, 1)
      }
    }
  }
</script>
<style lang="css" scoped>
</style>