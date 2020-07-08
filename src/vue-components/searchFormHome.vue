<template>
    <div class="container">
        <div id="form" class="form-vue-container">
            <div class="row">

                <div class="col-md-3 col-xs-12">
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
                <div class="col-md-3 col-xs-12">
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

                <div class="col-md-3 col-xs-12">
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

                <div class="col-md-3 col-xs-12">
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
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label class="control-label">&nbsp;</label>
                        <button class="btn btn-dark btn-block btn-lg" @click.prevent="goToSearch">
                            <b>Ver {{ properties.total }} Propiedades</b>
                        </button>
                    </div>
                </div>

            </div>


        </div>
    </div>
</template>

<script>

    import qs from 'qs';
    import api from '../js/api_security';
    import searchForm from "./searchForm";

    export default {
        name: "searchForm",
        components: {
            // propertyPanel,
            // paginate,
            // vueSelect
            // loading
        },
        watch: {
            form: {
                handler: 'getApiProperties',
                deep: true
            }
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
            console.clear()

            this.getApiLists();
            this.getApiProperties();
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
            goToSearch() {
                localStorage.setItem('searchForm', JSON.stringify(this.form))
                document.location.href = 'search.html'
            },
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
                console.clear();
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
            getApiListsLocalities() {
                console.clear();
                this.form.id_location = '';
                this.form.id_zone = '';
                this.form.id_property_type = '';
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
            getApiListsZones() {
                console.clear();
                this.form.id_zone = '';
                this.form.id_property_type = '';
                this.form.id_property_condition = '';
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
            getApiListsPropertyTypes() {
                this.form.id_property_condition = '';
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
    /*    .form-vue-container {

            .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
                padding: {
                    left: $padding;
                    right: $padding;
                };
            }
        }*/
    .control-label {
        font-size: 1.5em;
        color: #fff;

    }

    .form-control {
        font-size: 1.5em;
    }
</style>