import lodash from "lodash";
import axios from "axios";
import Vue from "vue";

window._ = lodash;

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'wasi';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import localProperties from "../vue-components/localProperties.vue";

const apiAppLocalProperty = new Vue({
    el: '#apiAppLocalProperty',
    components:{
        localProperties
    }

});

// window.jQuery = window.$ = require('jquery');

