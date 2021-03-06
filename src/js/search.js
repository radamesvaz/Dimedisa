import lodash from "lodash";
import axios from "axios";
import Vue from "vue";
import API_SEC from "./api_security";


Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'wasi';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(API_SEC)
import searchForm from "../vue-components/searchForm";

window._ = lodash;
const apiApp = new Vue({
    el: '#apiApp',
    components: {
        searchForm
    }
});

// window.jQuery = window.$ = require('jquery');

