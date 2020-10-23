import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    //iconfont: 'md',
    theme: {
        dark: true,
        themes: {
            light: {
                primary: '#E77817',
                background: '#2e454e'
            },
            dark: {
                primary: '#E77817',
                background: '#2e454e'
            },
        },
    },
});
