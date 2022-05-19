<template>
    <div class="jack">
        <h1>{{obj.name}}</h1>
        <div>搜尋</div>    
        <div>
            <input
                v-model="keyWords"
                type="text"
                placeholder="請輸入關鍵字..."
                @keyup.enter="searchKey"
            />
            {{keyAmount}} {{ $t('GENERAL.ITEMS') }}
        </div>
        <ul>
            <li
                v-for="(li, index) in obj.dialogue"
                :key="index"
                v-html="li"
            ></li>
        </ul>
        <div @click="toogleMemo">備忘錄</div> 
        <div v-if="memoDisplay">
            <input v-model="newStr" :placeholder="$t('GENERAL.MESSAGE')" />
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
    name: 'JackView',
    data() {
        return {
            keyWords: "",
            keyAmount: 0,
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
            vm.data.forEach(function(item) {
                if (item.name=="傑克") {
                    vm.obj = item
                }
            })
        })
        .catch(function(err) { 
            console.log(err)      
        })      
    },
    methods: {
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        searchKey() {
            let vm = this
            this.clearTimer()
            this.timer = setTimeout(() => {
                this.$ajax.get('/data.json')
                .then(function(response) {
                    vm.data = response.data.data
                    vm.data.forEach(function(item) {
                        if (item.name=="傑克") {
                            vm.obj = item
                            vm.searchColor(vm.obj.dialogue)
                        }
                    })
                })
            }, 100)
        },
        searchColor(makeArr) {
            let replaceReg = new RegExp(this.keyWords, 'g')
            let replaceString =
                '<span style="background: yellow;">' + this.keyWords + '</span>'
            if (this.keyWords && this.keyWords.length > 0) {
                this.keyAmount = makeArr.toString().match(replaceReg).length
                makeArr.map(function(item, index) {
                    makeArr[index] = item.replace(
                        replaceReg,
                        replaceString
                    )
                })
            }
        },
        toogleMemo() {
            this.memoDisplay = !this.memoDisplay
        },
        addMemo() {
            var Today=new Date()
            this.items.push(
                {
                    date: Today.getFullYear() + "/" + (Today.getMonth()+1) + "/" + Today.getDate(),
                    time: Today.getHours() + ":" + Today.getMinutes(),
                    text: this.newStr,
                },
            )
            this.newStr = ''
        },
        delMemo(index) {
            this.items.splice(index, 1)
        }
    }
}
</script>

<style lang="css" scoped>
</style>