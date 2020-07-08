import lodash from "lodash";
import axios from "axios";
import Vue from "vue";

window._ = lodash;

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'wasi';
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const API_TOKEN = 'U2e6_ZgnB_E7N9_baV8';
const API_COMPANY_ID = '5352707';
import qs from "qs";

const apiAppProperty = new Vue({
    el: '#apiAppProperty',
    data() {
        return {
            property: {
                title: '',
                map: null,
                latitude: '',
                longitude: '',
            },
            seller: {},
            isLoading: true
        }
    },
    computed: {
        contentCleared() {
            let match = /style=\"[^"]*\"/gi;
            return this.property.observations.replace(match, '');
        }
    },
    mounted() {
        let get = qs.parse(document.location.search.replace('?', ''));
        this.getApiProperty(get.id)
    },
    methods: {
        getApiProperty(id_property) {
            this.inLoad = true;
            let data = qs.stringify({
                action: `property/get/${id_property}`,
                form_data: {
                    id_company: API_COMPANY_ID,
                    wasi_token: API_TOKEN,
                    id_property: id_property * 1,
                }
            });
            this.$http.post('/', data)
                .then(response => {
                    this.property = response.data;
                    this.getApiSeller()
                })
        },
        getApiSeller() {
            this.inLoad = true;
            let data = qs.stringify({
                action: `user/get/${this.property.id_user}`,
                form_data: {
                    id_company: API_COMPANY_ID,
                    wasi_token: API_TOKEN,
                }
            });
            this.$http.post('/', data)
                .then(response => {
                    this.seller = response.data;
                    this.propertyGoogleMap();
                })
        },

        propertyGoogleMap() {
            if (this.property.map) {
                let propertyPosition = {
                    lat: this.property.latitude * 1,
                    lng: this.property.longitude * 1
                };
                let map = new google.maps.Map(document.getElementById('propertyPageMapAlt'), {
                    center: propertyPosition,
                    zoom: 18,
                    mapTypeId: 'satellite',
                    // styles: mapThemes.blackAndWhite
                });
                let markerOptions = {
                    position: propertyPosition,
                    map: map,
                    // icon: 'images/mls/marker.png'
                };
                let linkQuery;
                if (!this.property.address || this.property.address === 'Call for Address') {
                    linkQuery = this.property.latitude + ',' + this.property.longitude;
                } else {
                    linkQuery = this.property.address;
                    markerOptions.title = this.property.title;
                }
                let linkUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(linkQuery);
                let marker = new google.maps.Marker(markerOptions);
                marker.addListener('click', function () {
                    window.open(linkUrl, '_blank');
                })
            }
        }
    }

});

// window.jQuery = window.$ = require('jquery');

