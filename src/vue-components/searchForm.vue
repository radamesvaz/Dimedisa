<template>
    <div class="container-fluid">
        <div id="form" class="form-vue-container">
            <div class="row">
                <div class="col-md-12">
                    <hr>
                </div>
            </div>
            <div class="row">


                <div class="col-md-2 col-xs-12">
                    <label class="control-label">Contrato</label>
                    <select @change="changeForAction" class="form-control">
                        <option :value="null">Todos</option>
                        <option :value="1">Venta</option>
                        <option :value="2">Alquiler</option>
                    </select>

                </div>

                <div class="col-md-3 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Ciudad</label>
                        <select class="form-control" v-model="form.id_city"
                                @change="onChangeCity">
                            <option value="">Todos</option>
                            <option v-for="(val , i) in api.cities" :key="val.id_city" :value="val.id_city">
                                {{`${val.name}, ${val.country_label} (${val.total})`}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Localidad</label>
                        <select class="form-control" v-model="form.id_location"
                                @change="onChangeLocalities">
                            <option value="">Todos</option>
                            <option v-for="(val , i) in api.locations" :key="val.id_location" :value="val.id_location">
                                {{`${val.name} (${val.quantity})`}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Zona</label>
                        <select class="form-control" v-model="form.id_zone" @change="onChangeZones">
                            <option value="">Todos</option>
                            <option v-for="(val , i) in api.zones" :key="val.id_zone" :value="val.id_zone">
                                {{`${val.name} (${val.quantity})`}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Inmueble</label>
                        <select class="form-control" v-model="form.id_property_type">
                            <option value="">Todos</option>
                            <option v-for="(val , i) in api.property_types" :key="val.id_property_type"
                                    :value="val.id_property_type">
                                {{`${val.name} (${val.quantity})`}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Condici&oacute;n</label>
                        <select class="form-control" v-model="form.id_property_condition">
                            <option value="">Todos</option>
                            <option v-for="(val , i) in api.property_conditions" :key="val.code"
                                    :value="val.code">
                                {{val.name}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Rec&aacute;maras</label>
                        <select class="form-control" v-model="form.bedrooms">
                            <option value="">Todos</option>
                            <option :value="v" v-for="(v,i) in [1,2,3,4,5,6,7]">
                                {{v}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Ba&ntilde;os</label>
                        <select class="form-control" v-model="form.bathrooms">
                            <option value="">Todos</option>
                            <option :value="v" v-for="(v,i) in [1,2,3,4,5,6,7]">
                                {{v}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Desde</label>
                        <input class="form-control" v-model="form.min_price" type="number" step="5">
                    </div>
                </div>
                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">Hasta</label>
                        <input class="form-control" v-model="form.max_price" type="number" step="5">
                    </div>
                </div>
                <div class="col-md-2 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">&nbsp;</label>
                        <button class="btn btn-primary btn-block" @click.prevent="getApiProperties">
                            <b>Consultar</b>
                        </button>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12">
                    <hr>
                </div>
            </div>
        </div>
        <div id="results">
            <div class="row">
                <div class="col-lg-offset-10 col-md-offset-10 col-sm-offset-6 col-lg-2 col-md-2 col-sm-4 col-xs-12">
                    <select v-model="form.order_by" class="form-control" @change="getApiProperties">
                        <option v-for="(v,i) in api.order_by" :value="v.value" :key="i">{{v.label}}</option>
                    </select>

                </div>
            </div>
            <div class="row">
                <div class="blog">
                    <template v-for="(v,i) in properties.list">
                        <property-panel :key="i" :info="v"></property-panel>
                    </template>

                </div>
            </div>
        </div>
        <div id="paginate">
            <div class="row">
                <div class="col-xs-12">
                    <paginate
                            :page-count="totalPages"
                            :click-handler="onChangePage"
                            :prev-text="'<<'"
                            :next-text="'>>'"
                            :container-class="'pagination'">
                    </paginate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import propertyPanel from './propertyPanel';

    // const token = 'U2e6_ZgnB_E7N9_baV8';
    // const companyId = '5352707';

    // import 'vue-loading-overlay/dist/vue-loading.css';
    // import loading from 'vue-loading-overlay';

    import paginate from 'vuejs-paginate';
    import qs from 'qs';
    import api from '../js/api_security';

    export default {
        name: "searchForm",
        components: {
            propertyPanel,
            paginate,
            // vueSelect
            // loading
        },
        data() {
            return {
                inLoad: true,
                /* searchOpt: {
                     cities: [],
                     locations: [],
                     zones: []
                 },*/
                properties: {
                    list: [],
                    total: 0
                },
                form: {
                    id_company: api.companyId,
                    wasi_token: api.token,
                    skip: 0,
                    take: 9,
                    order_by: 'max_price',
                    //-----
                    id_city: "",
                    id_location: "",
                    id_zone: "",
                    id_property_type: "",
                    id_property_condition: "",
                    bedrooms: "",
                    bathrooms: "",
                    min_price: "",
                    max_price: ""
                },
                api: {
                    countries: [],
                    cities: [],
                    locations: [],
                    zones: [],
                    property_types: [],
                    property_conditions: [
                        {
                            code: 1,
                            name: 'Nuevo'
                        },
                        {
                            code: 2,
                            name: 'Usado'
                        },
                        {
                            code: 3,
                            name: 'Proyecto'
                        },
                        {
                            code: 4,
                            name: 'En Construccion'
                        }
                    ],
                    order_by: [
                        {
                            label: 'Mayor Precio',
                            value: 'max_price'
                        },
                        {
                            label: 'Menor Precio',
                            value: 'min_price'
                        },
                        {
                            label: 'Ultimos Publicados',
                            value: 'created_at'
                        }
                    ]
                }
            }
        },
        mounted() {
            //console.clear()
            if (localStorage.getItem('searchForm')) {
                this.form = JSON.parse(localStorage.getItem('searchForm'));
                localStorage.removeItem('searchForm');
                this.getApiListsCities();
                this.getApiListsLocalities(false);
                this.getApiListsZones(false);
                this.getApiListsPropertyTypes(false)
            } else {
                this.getApiLists();
            }
            this.getApiProperties();
            // this.getAutocompleteCities();
        },
        computed: {
            totalPages() {
                return Math.ceil(this.properties.total / this.form.take)
            }
        },

        methods: {
            changeForAction(e) {
                let val = e.target.value;
                this.form.for_sale = (val === 1);
                this.form.for_rent = (val === 2);
            },
            onChangePage(pageNum) {
                this.form.skip = this.form.take * (pageNum - 1)
                this.getApiProperties(true);

            },
            //--- autocomplete --start
            /* getAutocompleteCities(e) {
                 //console.clear();

                 // console.info(this.api.countries);
                 let data = qs.stringify({
                     action: `location/cities-with-property`,
                     form_data: {
                         id_company: api.companyId,
                         wasi_token: api.token,
                         with_region: 'true',
                         with_country: 'true'
                     }
                 });

                 this.$http
                     .post('/', data)
                     .then(response => {
                         let filteredData = _.filter(response.data, (obj) => _.isObject(obj));
                         this.searchOpt.cities = filteredData;
                         let promises = _.map(filteredData, (obj) => {
                             return this.getAutocompleteLocalities(obj);
                         });
                         return this.$http.all(promises);
                     })
                     .then((locations) => {
                         let cities = [];
                         locations.map((loc, i, a) => {
                             let city = {
                                 ...this.searchOpt.cities[i],
                                 locations: loc
                             };
                             cities.push(city);
                         });
                         this.searchOpt.cities = cities;
                     })
             },
             getAutocompleteLocalities(o) {
                 // //console.clear();

                 let data = qs.stringify({
                     action: `location/locations-from-city/${o.id_city}`,
                     form_data: {
                         id_company: api.companyId,
                         wasi_token: api.token,
                         quantity: true
                     }
                 });

                 return this.$http
                     .post('/', data)
                     .then(response => {
                         return _.filter(response.data, (obj) => {
                             return _.isObject(obj) && obj.quantity * 1 > 0
                         });

                     });
             },*/
            //-------------------------
            getApiProperties(toTop = false) {

                this.inLoad = true;
                let data = qs.stringify({
                    action: 'property/search',
                    form_data: _.pickBy(this.form, _.identity)
                });
                this.$http.post('/', data)
                    .then(response => {
                        this.properties.total = response.data.total;
                        this.properties.list = _.filter(response.data, (o) => _.isObject(o));
                        this.form.skip = 0;
                        this.inLoad = false;
                        if (toTop) {
                            let content = this.$el.querySelector('#results')
                            content.scrollIntoView({block: "start", behavior: "smooth"})
                        }
                    })
            },


            getApiListsCities() {
                //console.clear();
                // console.info(this.api.countries);
                let data = qs.stringify({
                    action: `location/cities-with-property`,
                    form_data: {
                        id_company: api.companyId,
                        wasi_token: api.token,
                        with_country: 'true'
                    }
                });
                this.$http
                    .post('/', data)
                    .then(response => {
                        this.api.cities = _.filter(response.data, (obj) => _.isObject(obj))
                    });
            },
            getApiListsLocalities(clear = true) {
                //console.clear();
                if (clear) {
                    this.form.id_location = '';
                    this.form.id_zone = '';
                    this.form.id_property_type = '';
                }
                if (this.form.id_city !== '') {
                    let data = qs.stringify({
                        action: `location/locations-from-city/${this.form.id_city}`,
                        form_data: {
                            id_company: api.companyId,
                            wasi_token: api.token,
                            quantity: true,
                            with_country: 'true'
                        }
                    });
                    this.$http
                        .post('/', data)
                        .then(response => {
                            this.api.locations = _.filter(response.data, (o) => {
                                return _.isObject(o) && (o.quantity * 1 > 0)
                            });
                        });

                } else {
                    this.api.locations = [];
                }
            },
            getApiListsZones(clear = true) {
                //console.clear();
                if (clear) {
                    this.form.id_zone = '';
                    this.form.id_property_type = '';
                    this.form.id_property_condition = '';
                }
                if (this.form.id_city !== '') {
                    let endpoint = (this.form.id_location !== '') ? `location/zones-from-location/${this.form.id_location}` : `location/zones-from-city/${this.form.id_city}`;
                    let data = qs.stringify({
                        action: endpoint,
                        form_data: {
                            id_company: api.companyId,
                            wasi_token: api.token,
                            quantity: true
                        }
                    });
                    this.$http
                        .post('/', data)
                        .then(response => {
                            this.api.zones = _.filter(response.data, (o) => {
                                return _.isObject(o) && (o.quantity * 1 > 0)
                            });
                        });

                } else {
                    this.api.zones = [];
                }
            },
            getApiListsPropertyTypes(clear = true) {
                if (clear) {
                    this.form.id_property_condition = '';
                }
                let data = qs.stringify({
                    action: `property-type/all`,
                    form_data: {
                        id_company: api.companyId,
                        wasi_token: api.token,
                        id_city: this.form.id_city,
                        id_location: this.form.id_location,
                        id_zone: this.form.id_zone,
                        quantity: true
                    }
                });
                return this.$http
                    .post('/', data)
                    .then(response => {
                        this.api.property_types = _.filter(response.data, (o) => {
                            return _.isObject(o) && (o.quantity * 1 > 0)
                        });
                    });

            },

            getApiLists() {
                this.getApiListsCities();
                this.getApiListsPropertyTypes();
            },

            onChangeCity() {

                this.getApiListsLocalities();
                this.getApiListsZones();
                this.getApiListsPropertyTypes()
            },
            onChangeLocalities() {
                this.getApiListsZones();
                this.getApiListsPropertyTypes()
            },
            onChangeZones() {
                this.getApiListsPropertyTypes()
            },
        }
    }
</script>

<style scoped lang="scss">
    $padding: 1.5rem;
    .form-vue-container {

        .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
            padding: {
                left: $padding;
                right: $padding;
            };
        }
    }
</style>