<template>
  <v-app id="landing-page">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
      color="#3E545B"
    >
      <v-list dark>
        <v-list-item-group v-model="menu">
          <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list dark>
        <v-list-item-group>
          <v-list-item @click="close">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ВЫХОД</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <span class="mr-1 d-flex flex-row-reverse text--disabled caption">Версия: {{ver}}</span>
        <v-divider></v-divider>
        <v-banner
          class="text--disabled caption"
          two-line
          color="#3E545B"
        >© ЗАО "ГК "ТЭКС-Автоматик" Комплексные решения в области промышленных АСУ ТП</v-banner>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#213039"
      dark
      dense
      scroll-off-screen
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text rounded @click="link">
        <img
          src="@/assets/logo.svg"
          alt="ТЭКС-Автоматик"
          height="35"
          class="hidden-xs-and-down mt-1"
        />
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title
        small
        class="hidden-md-and-down"
      >Настройка ПИД-регуляторов котловой автоматики</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab text small @click="minimize">
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn fab text small @click="close">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <v-fab-transition>
      <v-btn
        class
        dark
        fab
        bottom
        right
        color="primary"
        fixed
        @click="toTop"
        v-scroll="onScroll"
        v-show="fab"
      >
        <v-icon color="white" large>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
const remote = require("electron").remote;
const shell = require("electron").shell;
export default {
  name: "App",
  computed: {},
  methods: {
    close() {
      this.w.close();
    },
    link() {
      shell.openExternal("http://gkta.ru");
    },
    minimize() {
      this.w.minimize();
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 50;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  },
  components: {},
  data: () => ({
    w: remote.getCurrentWindow(),
    ver: remote.app.getVersion(),
    drawer: true,
    fab: false,
    menu: 0,
    menuItems: [
      { title: "Описание", icon: "mdi-home-city", route: "/home" },
      {
        title: "Котёл КВГМ-20 ст.№1",
        icon: "mdi-water-boiler",
        route: "/boiler1"
      },
      {
        title: "Котёл КВГМ-20 ст.№2",
        icon: "mdi-water-boiler",
        route: "/boiler2"
      },
      {
        title: "Котёл ДЕ-10-14 ст.№1",
        icon: "mdi-water-boiler",
        route: "/boiler3"
      },
      {
        title: "Котёл ДЕ-10-14 ст.№2",
        icon: "mdi-water-boiler",
        route: "/boiler4"
      }
    ]
  })
};
</script>
<style>
#landing-page {
  background-color: #1e1e1e;
  height: auto;
  width: auto;
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  position: relative;
}
html {
  overflow-y: auto !important;
}
body {
  padding: 0px !important;
}
.v-card__text,
.v-card__title {
  word-break: normal !important;
}
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>