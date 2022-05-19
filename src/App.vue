<template>
    <v-app>
    <!-- 側邊導覽列 -->
    <v-navigation-drawer permanent flat app>
        <!-- 選單 -->
        <v-list dense style="border-bottom:1px solid #6fddcb">
            <v-list-item>
            <!-- <v-list-item-icon>
                <v-icon>mdi-*</v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
                <v-list-item-title>{{ $t('GENERAL.FRIENDS_LIST') }}(3)</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        <!-- 網頁標題 -->
        <v-list-item to="/paul" style="border-bottom:1px solid #6fddcb">
            <v-list-item-avatar>
                <v-img src="../public/img/avatar-paul.jpg"></v-img>
                <!-- <v-img src="https://randomuser.me/api/portraits/men/14.jpg"></v-img> -->
            </v-list-item-avatar>
            <v-list-item-content d-flex flex-row>
                <v-list-item-title class="title"> 保羅 </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/jack" style="border-bottom:1px solid #6fddcb">
            <v-list-item-avatar>
                <v-img src="../public/img/avatar-jack.jpg"></v-img>
                <!-- <v-img src="https://randomuser.me/api/portraits/men/32.jpg"></v-img> -->
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title"> 傑克 </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item to="/jason" style="border-bottom:1px solid #6fddcb">
            <v-list-item-avatar>
                <v-img src="../public/img/avatar-jason.jpg"></v-img>
                <!-- <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img> -->
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title"> 傑森 </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
    </v-navigation-drawer>

    <!-- 頂部導覽列 -->
    <v-app-bar app color="#4A90E2" dark flat>
        <v-app-bar-title to="/">Cherri Chat</v-app-bar-title>
        <v-spacer></v-spacer>
        <button class="lang-btn" :class="{ active:$i18n.locale=='tw' }" data-lang="tw" @click="setLang">中文</button>
        <button class="lang-btn" :class="{ active:$i18n.locale=='en' }" data-lang="en" @click="setLang">English</button>
        <v-divider class="mx-4" vertical color=white></v-divider>
        <v-avatar size="36" class="mx-2">
            <img src="../public/img/avatar-jessica.jpg">
            <!-- <img src="https://randomuser.me/api/portraits/women/81.jpg"> -->
        </v-avatar>
        <v-app-bar-title border="left">潔西卡</v-app-bar-title>
    </v-app-bar>

    <!-- 內容區塊 -->
    <v-main>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>            
    </v-main>

    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        data: []
    }),
    methods: {
        setActiveLanguage(lang) {
            localStorage.setItem('language', lang)
        },
        setLang(evt) {
            const lang = evt.target.dataset.lang
            this.setActiveLanguage(lang)
            return history.go(0)
        },
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
}
ul {
    list-style-type: none;
}
.lang-btn {
    font-size: 12px;
    margin: 3px;
    padding: 2px 15px;
    border: 1px solid white;
    border-radius: 20px;
}
.active {
    background: white;
    color: #4A90E2;
}
</style>