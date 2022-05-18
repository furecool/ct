<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <div>
      <button data-lang="tw" @click="setLang">中文</button>
      <button data-lang="en" @click="setLang">English</button>
    </div>

    <nav>
      <div class="router">
        <router-link to="/">
          <div class="three-d-btn">Home</div>
        </router-link>
        <router-link to="/paul">
          <div class="three-d-btn">保羅</div>
        </router-link>
        <router-link to="/jack">
          <div class="three-d-btn">傑克</div>
        </router-link>
        <router-link to="/jason">
          <div class="three-d-btn">傑森</div>
        </router-link>
      </div>
    </nav>

    <div>
      <div>{{ $t('GENERAL.FRIENDS_LIST') }}</div>
      <div>{{ $t('GENERAL.ITEMS') }}</div>
      <!-- <div>{{ $t('GENERAL.MESSAGE') }}</div> -->
      <!-- <div>{{ $t('GENERAL.ADD') }}</div> -->
    </div>

    <v-main>
      <keep-alive>
        <router-view/>
      </keep-alive>      
      <!-- <router-view :data = data /> -->
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    data: []
  }),
  created() {
    // let vm = this
    // this.$ajax.get('/data.json')
    // .then(function(response) {
    //   vm.data = response.data.data
    //   // console.log(vm.data)
    // })
    // .catch(function(err) { 
    //     console.log(err)      
    // })
  },
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
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>