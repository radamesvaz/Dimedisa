<template>
    <div>

        <div>

            <h3>{{label}}</h3>
        </div>
        <div class="blog">
            <template v-for="(v,k,i) in properties.list">
                <property-panel :key="k" :info="v"></property-panel>
            </template>
        </div>
        <div>
            <paginate
                    :page-count="totalPages"
                    :click-handler="onChangePage"
                    :prev-text="'<<'"
                    :next-text="'>>'"
                    :container-class="'pagination'">
            </paginate>
        </div>
    </div>
</template>

<script>

    import api from '../js/api_security';
    import propertyPanel from './propertyPanel';
    import paginate from 'vuejs-paginate';
    import qs from 'qs';

    export default {
        name: "localProperties",
        props: {
            take: {
                type: Number,
                default: 6,
            },
            label: {
                type: String,
                default: 'Propiedades en la zona:'
            },
            id_city: {
                type: String,
                default: ''
            },
            id_location: {
                type: String,
                default: ''
            },
            id_zone: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.getApiProperties();
        },
        computed: {
            totalPages() {
                return Math.ceil(this.properties.total / this.take)
            }
        },
        data() {
            return {
                skip: 0,
                inLoad: false,
                properties: {
                    list: [],
                    total: 0
                }
            }
        },
        methods: {
            onChangePage(pageNum) {
                this.skip = this.take * (pageNum - 1)
                this.getApiProperties(true);

            },
            getApiProperties(toTop = false) {

                this.inLoad = true;
                let data = qs.stringify({
                    action: 'property/search',
                    form_data: _.pickBy({
                        id_company: api.companyId,
                        wasi_token: api.token,
                        id_city: this.id_city,
                        id_location: this.id_location,
                        id_zone: this.id_zone,
                        take: this.take,
                        skip: this.skip,

                    }, _.identity)
                });
                this.$http.post('/', data)
                    .then(response => {
                        this.properties.total = response.data.total;
                        this.properties.list = _.filter(response.data, (o) => _.isObject(o));
                        this.skip = 0;
                        this.inLoad = false;
                    })
            },
        },
        components: {
            propertyPanel,
            paginate
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