<template>
    <div class="post" :id="info.id_property">
        <div href="#"
             :style="`background-image:url(${info.main_image.url})`"
             class="post-image"
        >
            <a :href="`./property.html?id=${info.id_property}`" :title="info.title">&nbsp</a>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div class="price">
                        <template v-if="info.for_sale=='true'">
                            <h2 class="label">
                                {{info.sale_price_label}} |
                                <small class="action">Venta</small>
                            </h2>
                        </template>
                        <template v-if="info.for_rent=='true'">
                            <h2 class="label">
                                {{info.rent_price_label}} |
                                <small class="action">Alquiler</small>
                            </h2>
                        </template>
                        <hr>
                    </div>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <a :href="`./property.html?id=${info.id_property}`">

                        <h5>
                            {{info.title}}
                        </h5>
                    </a>
                    <hr>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-danger">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-center padding-fix">
                            <i class="fa fa-map-marker fa-3x"></i>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 padding-fix ">
                            {{info.city_label}},<br>
                            <small>{{info.location_label}}-{{info.country_label}}</small>
                        </div>
                    </div>

                    <hr>
                </div>

                <!-- areas -->
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 data-info">

                    <div class="icon">
                        <div class="fa fa-building "></div>
                    </div>
                    <div class="title">
                        &Aacute;rea
                    </div>
                    <div class="info">
                        {{info.built_area}} m<sup>2</sup>
                    </div>
                </div>

                <!-- areas -->
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 data-info">

                    <div class="icon">
                        <div class="fa fa-bed "></div>
                    </div>
                    <div class="title">
                        Rec&eacute;maras
                    </div>
                    <div class="info">
                        {{info.bedrooms}}
                    </div>
                </div>

                <!-- areas -->
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 data-info">

                    <div class="icon">
                        <div class="fa fa-shower"></div>
                    </div>
                    <div class="title">
                        Baños
                    </div>
                    <div class="info">
                        {{info.bathrooms}}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "propertyPanel",
        props: [
            'info'
        ]
    }
</script>

<style lang="scss" scoped>

    h1, h2, h3, h4, h5, h6 {
        margin: 0em;
    }

    .padding-fix {
        padding: {
            left: 0.5rem;
            right: 0.5rem;
        };
    }

    .price {
        padding-top: 1em;

        & > h2.label {
            display: inline-block;
            color: #1b1b1b;
            font-weight: bold;
            font-size: 2rem;
        }

        & > span.action {
            color: #3c3e41;
            font-size: 1rem;
        }
    }

    .data-info {
        padding: {
            left: 0.5rem;
            right: 0.5rem;
        };
        text-align: center;

        .title {
            font-size: 1.2rem;
            color: #3c3e41;
            font-weight: bold;
        }

        .info {
            font-size: 1.4rem;
            color: #1b1b1b;
        }
    }

    hr {
        margin: {
            top: 0.2rem;
            bottom: 0.2rem;
        }
    }

    .post-image > a {
        height: 100%;
        width: 100%;
        display: block;
    }

</style>