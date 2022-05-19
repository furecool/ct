<template>
    <div class="paul">
        <h1>{{obj.name}}</h1>
        <div>搜尋<img src="../../public/img/ic_search.png" alt="" height="25"></div>    
        <div>
            <input
                v-model="keyWords"
                type="text"
                placeholder="請輸入關鍵字..."
                @keyup.enter="searchKey"
            />
            {{keyAmount}} {{ $t('GENERAL.ITEMS') }}
            <img src="../../public/img/ic_close1.png" alt="" height="20">
        </div>
        <ul>
            <li
                v-for="(li, index) in obj.dialogue"
                :key="index"
                v-html="li"
            ></li>
        </ul>
        <div>
            <textarea name="" id="" cols="30" rows="2"></textarea>
            <div>
                <img src="../../public/img/ic_sent.png" alt="" height="20">
            </div>
        </div>
        <div @click="toogleMemo">備忘錄<img src="../../public/img/ic_note.png" alt="" height="25"></div> 
        <div v-if="memoDisplay">
            <input v-model="newStr" :placeholder="$t('GENERAL.MESSAGE')" />
            <button @click="addMemo">{{ $t('GENERAL.ADD') }}</button>
            <div v-for="(item, index) in items" :key="index">
                <p>{{item.date}} {{item.time}}</p>
                <p>{{item.text}}</p>
                <p @click="delMemo(index)">刪除<img src="../../public/img/ic_close2.png" alt="" height="10"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaulView',
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
            newStr: '',
            data: [
                {
                    "name": "保羅",
                    "dialogue": [
                        "保羅",
                        "你好, 我是傑西卡",
                        "我喜歡吃的食物有",
                        "各種巧克力口味的甜點"
                    ]
                },
                {
                    "name": "傑克",
                    "dialogue": [
                        "傑克",
                        "你好, 我是傑西卡",
                        "我喜歡做的運動為",
                        "游泳,跑步"
                    ]
                },
                {
                    "name": "傑森",
                    "dialogue": [
                        "傑森",
                        "你好, 我是傑西卡",
                        "我喜歡的動物為 ",
                        "貓,狗"
                    ]
                }
            ]
        }
    },
    created() {
        let vm = this
        this.$ajax.get('/data.json')
        .then(function(response) {
            vm.data = response.data.data
            vm.data.forEach(function(item) {
                if (item.name=="保羅") {
                    vm.obj = item
                }
            })
        })
        .catch(function(err) { 
            console.log(err)      
        })   
        
        // vm.data.forEach(function(item) {
        //     if (item.name=="保羅") {
        //         vm.obj = item
        //     }
        // })
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
                        if (item.name=="保羅") {
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