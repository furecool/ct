<template>
    <div class="jack">
        <v-app-bar color="#fff">
            <v-avatar size="36" class="mx-2">
                <img src="../../public/img/avatar-jack.jpg">
            </v-avatar>
            <v-app-bar-title>{{obj.name}}</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn fab width="30" height="30" @click="toogleSearch"><img src="../../public/img/ic_search.png" alt="" height="25"></v-btn>
            <v-btn fab width="30" height="30" @click="toogleMemo"><img src="../../public/img/ic_note.png" alt="" height="25"></v-btn>
        </v-app-bar>
        <div v-if="isSearch" style="height: 50px;line-height: 50px;border-bottom: 1px solid #6fddcb">
            <input
                v-model="keyWords"
                type="text"
                placeholder="請輸入關鍵字..."
                @keyup.enter="searchKey"
                style="outline-style: none;width:75%;"
            />
            <span style="color:grey;">{{keyAmount}} {{ $t('GENERAL.ITEMS') }}</span>
            <v-btn fab width="15" height="15" class="mx-2">
                <img @click="toogleSearch" src="../../public/img/ic_close1.png" alt="" height="20">
            </v-btn>
        </div>
        <v-container d-flex flex-column align-end justify-end style="height:300px;">
            <v-chip color="#4A90E2" class="my-1" text-color="white"
                v-for="(li, index) in obj.dialogue"
                :key="index"
                v-html="li"
            ></v-chip>
        </v-container>
        <div style="width: 100%;height: 100px;line-height: 50px;border-top: 1px solid #6fddcb;display:flex;">
            <textarea name="" id="" cols="30" rows="2" :placeholder="$t('GENERAL.MESSAGE')" style="outline-style: none ;resize:none;width:90%;padding-left:20px;"></textarea>
            <div>
                <img src="../../public/img/ic_sent.png" alt="" height="20">
            </div>
        </div>

        <v-card v-if="memoDisplay" class="mx-auto pa-5 my-0" max-width="300" style="position:absolute;right:0;top:70px;">
            <div>
                <input v-model="newStr" :placeholder="$t('GENERAL.MESSAGE')" style="outline-style: none;width:100%;height:100px;border:1px solid #4A90E2;"/>
                <v-btn @click="addMemo" class="my-2" color="#4A90E2" width="100%">{{ $t('GENERAL.ADD') }}</v-btn>
            </div>
            <v-divider class="my-4" color=#6fddcb></v-divider>           
            <div v-for="(item, index) in items" :key="index" style="width:100%;height:100px;border:1px solid #6fddcb;margin-top:5px;display:flex;justify-content:space-between;padding:2px 8px;">
                <div>
                    <p style="color: #4A90E2;">{{item.date}} {{item.time}}</p>
                    <p>{{item.text}}</p>
                </div>                
                <p @click="delMemo(index)"><img src="../../public/img/ic_close2.png" alt="" height="10"></p>
            </div>
        </v-card>

    </div>
</template>

<script>
export default {
    name: 'JackView',
    data() {
        return {
            isSearch: false,
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
        let url = 'https://lincheyin.000webhostapp.com/data/data.json'
        let vm = this
        this.$ajax.get(url)
        // this.$ajax.get('/data.json')
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
        
        // vm.data.forEach(function(item) {
        //     if (item.name=="傑克") {
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
            let url = 'https://lincheyin.000webhostapp.com/data/data.json'
            let vm = this
            this.clearTimer()
            this.timer = setTimeout(() => {
                this.$ajax.get(url)
                // this.$ajax.get('/data.json')
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
                '<span style="background:yellow;color:black;">' + this.keyWords + '</span>'
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
        },
        toogleSearch() {
            this.isSearch = !this.isSearch
        }
    }
}
</script>

<style lang="css" scoped>
</style>