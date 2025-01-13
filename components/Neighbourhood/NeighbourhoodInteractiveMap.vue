<template>
    <div id="map hidden md:block">
        <div class="inset-from-left location-map-holder">
            <div class="location-map-holder__holder">
                <div class="svg-placeholder map" style="background-image: none" id="map_l"></div>
                <div class="component-map__menu-holder">
                    <div class="component-map__menu">
                        <!-- CATEGORY PAGE -->

                        <!-- END CATEGORY PAGE -->
                        <!-- LOCATION LIST PAGE -->
                        <div class="component-map__menu__card --right" id="location-menu">
                            <div class="map__header nolink" id="other-locations">
                                <div class="map__button --flip"></div>
                                <div class="pl-3 tracking-widest">YOUR NEIGHBOURHOOD</div>
                            </div>
                            <div id="mininav-title">
                                <img class="w-75 h-10" src="/img/location/icons/map-title.svg" alt="" />
                            </div>
                            <div class="map__list">
                                <ul
                                    id="sub-retail"
                                    class="subnav slidedown"
                                    style="margin-left: 0; padding-left: 0"
                                ></ul>
                            </div>
                        </div>
                        <!-- END LOCATION LIST PAGE -->
                        <!-- DETAILS PAGE -->
                        <div class="component-map__menu__card --right" id="loc-details">
                            <div class="map__header" id="backtocat-details">
                                <div class="map__button arrow --flip"></div>
                                <div class="pl-3">Back to List</div>
                            </div>
                            <div class="map__info">
                                <div class="map__info__image pb-8">
                                    <img id="loc-image" src="/img/location/icons/Embassy-Gardens-Cafe-2.jpg" alt="" />
                                </div>
                                <div id="loc-title" class="map__info__title text-8 font-semibold pb-8">Title</div>
                                <div id="loc-text" class="map__info__desc text-4 pb-8">Text</div>
                            </div>
                            <div class="nxt-prv-btn-wrp">
                                <a href="#" id="loc-prev" class="prev">
                                    <span class="btn-txt">Previous</span>
                                    <span class="arrow-circle"></span>
                                </a>
                                <a href="#" id="loc-next" class="next">
                                    <span class="btn-txt">Next</span>
                                    <span class="arrow-circle"></span>
                                </a>
                            </div>
                        </div>
                        <!-- END DETAILS PAGE -->
                    </div>
                </div>
                <!-- small rollover -->
                <div id="short_popup">
                    <a href="#" class="i-point-popup" data-page="desktop-ctiland-marker-details-0">
                        <h3 id="popup_title">Location Title</h3>
                        <div class="img-box-wrap" id="img_container"><img id="popup_img" /></div>
                    </a>
                </div>
                <!-- end small rollover -->
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.min'

gsap.registerPlugin(ScrollTrigger)

export default {
    mounted() {
        const mapboxgl = require('mapbox-gl')
        var estate = true
        var opencat = 'retail'

        const map_l = new mapboxgl.Map({
            accessToken:
                'pk.eyJ1IjoiYm9iYmVudGxleWRlc2lnbiIsImEiOiJjajgxaHc5OWQ3M2FqMzRxcG1pb205OHM0In0.NihUrjv2BWxovbztawQjkQ',
            container: 'map_l', // <div id="map"></div>
            style: 'mapbox://styles/bobbentleydesign/ckmc80hrei02y17ryhqd32vah', // default style
            center: [-0.1375408259800679, 51.48384492956325], // starting position as [lng, lat]
            zoom: 15,
        })

        var eg_lat = '-0.1340820745742235'
        var eg_long = '51.482634272787095'
        var zoomstart = '15.9'

        //default category
        var cur_cat = 'retail'
        var minZoom = 15
        var maxZoom = 16.8

        var categories = ['retail']

        var mobile_flag = false
        //Settings based on resolution
        const mq = window.matchMedia('(min-width: 1024px)')
        const low_res = window.matchMedia('(max-width: 1400px)')
        var nav = new mapboxgl.NavigationControl()
        //if (mq.matches) {
        // desktop
        //Zoom buttons

        map_l.addControl(nav, 'bottom-right')
        /*} else {
                // mobile
                mobile_flag = true;
            
            }*/

        if (estate) {
            if (low_res.matches) {
                var zoomset = 16.3
            } else {
                var zoomset = 16.6
            }
        } else if (mobile_flag) {
            var zoomset = 12
        } else {
            var zoomset = 14.6
        }

        var cur_area = 0
        var places_areas = {
            eg: {
                title: 'Embassy Gardens',

                center: [eg_lat, eg_long],
                bearing: 0,
                zoom: zoomset,
                curve: 2,
                pitch: 0,
            },
        }

        map_l.on('load', function () {
            map_l.scrollZoom.disable()

            // add markers to map

            categories.forEach(function (cat) {
                window['counter' + cat] = 0
            })

            //plot markers on map
            geojson_places.features.forEach(function (marker) {
                if ((marker.properties.estate != 'y' && !estate) || (marker.properties.estate == 'y' && estate)) {
                    if (marker.properties.riverside == 'y') {
                        // create a HTML element for each feature
                        var el = document.createElement('div')
                        el.className = 'marker-redpin ' + marker.properties.icon + '-icon'
                        //el.className = 'marker-redpin';

                        el.id = 'marker-redpin-' + marker.properties.id

                        // make a marker for each feature and add to the map
                        new mapboxgl.Marker(el, {
                            anchor: 'center',
                        })
                            .setLngLat(marker.geometry.coordinates)
                            .addTo(map_l)

                        //show on left menu filter list

                        var lbl = marker.properties.icon
                        if (document.getElementById('sub-' + lbl)) {
                            window['counter' + lbl]++
                            var ul = document.getElementById('sub-' + lbl)

                            var li = document.createElement('li')
                            //li.appendChild(document.createTextNode(marker.properties.title));

                            var htmldata =
                                '<div class="index text-5">' +
                                window['counter' + lbl] +
                                '</div><div class="text text-5 pl-4">' +
                                marker.properties.title +
                                '</div><div class="arrow"></div>'

                            //var htmldata = '<a href="#">'+marker.properties.title+'</a>';
                            li.classList.add('map__button', '--cat-button')
                            li.id = 'link-popup-' + marker.properties.id
                            li.innerHTML = htmldata
                            ul.appendChild(li)

                            li.addEventListener('click', function (event) {
                                event.preventDefault()
                                var popupid = this.id.substr(11)

                                show_details(popupid)

                                //center the pin in the map
                                if (estate != true) {
                                    map_l.flyTo({
                                        center: geojson_places.features[popupid].geometry.coordinates,
                                    })
                                    show_popup(popupid, true)
                                }
                            }) //end add event listener on li

                            li.addEventListener('mouseover', function (event) {
                                var popupid = this.id.substr(11)

                                //remove selected state of other locations
                                var selected_class = document.getElementsByClassName('link-sel')
                                var y
                                for (y = 0; y < selected_class.length; y++) {
                                    selected_class[y].classList.remove('link-sel')
                                }

                                //hightlight selected location link
                                this.classList.add('link-sel')

                                //remove selected state of other pins
                                var selected_class = document.getElementsByClassName('marker-redpin')
                                var y
                                for (y = 0; y < selected_class.length; y++) {
                                    selected_class[y].classList.remove('marker-highlight')
                                }

                                //hightlight location pin
                                document.getElementById('marker-redpin-' + popupid).classList.add('marker-highlight')
                            }) //end add event listener on li

                            //disable hover on mobile
                            if (!mobile_flag) {
                                el.addEventListener('mouseover', function () {
                                    if (map_l.getZoom() >= 10) {
                                        var markerid = this.id.substr(14)

                                        //var rect = this.getBoundingClientRect();

                                        show_popup(markerid)

                                        //remove selected state of other locations
                                        var selected_class = document.getElementsByClassName('link-sel')
                                        var y
                                        for (y = 0; y < selected_class.length; y++) {
                                            selected_class[y].classList.remove('link-sel')
                                        }
                                        //hightlight location pin
                                        this.classList.add('marker-highlight')

                                        //hightlight selected location link
                                        document.getElementById('link-popup-' + markerid).classList.add('link-sel')
                                    }
                                })
                                el.addEventListener('mouseout', function () {
                                    document.getElementById('short_popup').classList.remove('show-popup')
                                    this.classList.remove('marker-highlight')
                                    //remove selected state of other locations
                                    var selected_class = document.getElementsByClassName('link-sel')
                                    var y
                                    for (y = 0; y < selected_class.length; y++) {
                                        selected_class[y].classList.remove('link-sel')
                                    }
                                })
                            } //if mobile

                            el.addEventListener('click', function (event) {
                                event.preventDefault()
                                var markerid = this.id.substr(14)

                                show_details(markerid)
                            })

                            el.innerHTML = window['counter' + lbl]
                        } //end if ul exists
                    } //end if riverside checkbox checked
                } //end if location or estate
            }) //end foreach

            //allow drag after map movmement
            map_l.on('moveend', function (e) {
                if (flying) {
                    //enable dragging
                    map_l.dragPan.enable()
                    flying = false
                }
            })

            var cur_id = 0
            var cur_area = 0

            function show_popup(thispopupid, is_center = false) {
                //show small popup
                if (is_center) {
                    var rect2 = {
                        left: 0,
                        top: 0,
                    }
                    rect2.left = window.innerWidth / 2
                    rect2.top = window.innerHeight / 2
                } else {
                    var rect2 = document.getElementById('marker-redpin-' + thispopupid).getBoundingClientRect()
                }
                document.getElementById('img_container').style.backgroundImage =
                    'url(' + geojson_places.features[thispopupid].properties.image_small + ')'
                document.getElementById('popup_title').innerHTML = geojson_places.features[thispopupid].properties.title
                document.getElementById('short_popup').style.left = rect2.left + 'px'
                document.getElementById('short_popup').style.top = rect2.top + 'px'
                document.getElementById('short_popup').setAttribute('data-stylecode', thispopupid)
                document.getElementById('short_popup').classList.add('show-popup')
                document.getElementById('marker-redpin-' + thispopupid).classList.add('marker-highlight')
            } // show popup

            //show large details panel
            function show_details(location_id) {
                //remove highlighted state of other markers
                var selected_class = document.getElementsByClassName('marker-highlight')
                var y
                for (y = 0; y < selected_class.length; y++) {
                    selected_class[y].classList.remove('marker-highlight')
                }

                cur_id = location_id
                document.getElementById('loc-details').classList.add('--active')
                //document.getElementById('mob-location-menu').classList.remove('--active');
                document.getElementById('location-menu').classList.remove('--active')
                document.getElementById('loc-title').innerHTML = geojson_places.features[location_id].properties.title
                document.getElementById('loc-text').innerHTML =
                    geojson_places.features[location_id].properties.description
                document.getElementById('loc-image').src = geojson_places.features[location_id].properties.image
                //document.getElementById('loc-url').href = geojson_places.features[location_id].properties.url;

                // document.querySelector("#loc-details .breadcrumb__details").innerHTML = geojson_places.features[location_id].properties.title;

                if (cur_cat) {
                    //need a better solution for this - TODO
                    var real_name = cur_cat.replace('-', ' & ')

                    if (cur_cat == 'bars-pubs' || cur_cat == 'art-culture') {
                        var real_name = cur_cat.replace('-', ' & ')
                    } else {
                        var real_name = cur_cat.replace('-', ' ')
                    }
                    //document.getElementById('backtocategory').innerHTML = real_name;
                }

                //hightlight selected location pin
                document.getElementById('marker-redpin-' + location_id).classList.add('marker-highlight')

                document.getElementById('map_l').scrollIntoView({
                    behavior: 'smooth',
                })
                flythere('eg')
            } //end function

            function set_mininav(nav_id) {
                var place = places_array[nav_id]
                cur_area = nav_id
                flythere(place)
            }

            document.getElementById('short_popup').addEventListener('mouseover', function () {
                document.getElementById('short_popup').classList.add('show-popup')
            })
            document.getElementById('short_popup').addEventListener('mouseout', function () {
                document.getElementById('short_popup').classList.remove('show-popup')
            })
            document.getElementById('short_popup').addEventListener('click', function (event) {
                event.preventDefault()
                document.getElementById('short_popup').classList.add('show-popup')
                var popup_id = this.getAttribute('data-stylecode')
                show_details(popup_id)
            })

            function next_id(id, direction) {
                var start_id = id

                //search from id up
                while (geojson_places.features[id] != null) {
                    if (
                        geojson_places.features[id].properties.icon == cur_cat &&
                        geojson_places.features[id].properties.riverside == 'y'
                    )
                        return id

                    if (direction == 'next') {
                        id++
                    } else {
                        id--
                    }
                }

                if (direction == 'next') {
                    id = 0
                } else {
                    id = geojson_places.features.length - 1
                }
                //search from beginning or end depending on direction

                while (geojson_places.features[id] != null) {
                    if (id == start_id) {
                        break
                    }

                    if (
                        geojson_places.features[id].properties.icon == cur_cat &&
                        geojson_places.features[id].properties.riverside == 'y'
                    )
                        return id

                    if (direction == 'next') {
                        id++
                    } else {
                        id--
                    }
                }

                return direction == 'next' ? start_id - 1 : start_id + 1
            } //end function

            function next_location(id) {
                if (id >= 0) {
                    show_details(id)

                    //remove highlighted state of other markers
                    var selected_class = document.getElementsByClassName('marker-highlight')
                    var y
                    for (y = 0; y < selected_class.length; y++) {
                        selected_class[y].classList.remove('marker-highlight')
                    }

                    //hightlight selected location pin
                    document.getElementById('marker-redpin-' + id).classList.add('marker-highlight')

                    if (estate != true) {
                        map_l.flyTo({
                            center: geojson_places.features[id].geometry.coordinates,
                        })
                        show_popup(id, true)
                    }
                }
            } //end function

            document.getElementById('loc-next').addEventListener('click', function (event) {
                event.preventDefault()
                var new_id = next_id(parseInt(cur_id) + 1, 'next')
                next_location(new_id)
            })
            document.getElementById('loc-prev').addEventListener('click', function (event) {
                event.preventDefault()
                var new_id = next_id(parseInt(cur_id) - 1, 'prev')
                next_location(new_id)
            })

            function toggleMarkers(sel_cat) {
                //first remove all markers
                var marker_class = document.getElementsByClassName('marker-redpin')
                var i
                for (i = 0; i < marker_class.length; i++) {
                    marker_class[i].classList.remove('popup')
                }

                for (i = 0; i < sel_cat.length; i++) {
                    // show all selected category/categories
                    var newmarker_class = document.getElementsByClassName(sel_cat[i])
                    var a
                    for (a = 0; a < newmarker_class.length; a++) {
                        newmarker_class[a].classList.add('popup')
                    }
                } //end for
            } //end function togglemarkers

            function show_subnav(navid) {
                //remove selected state of other navs
                var selected_class = document.getElementsByClassName('loc-selected')
                var b
                for (b = 0; b < selected_class.length; b++) {
                    selected_class[b].classList.remove('loc-selected')
                }

                //show selected (ticked) state of clicked nav
                // document.getElementById("toggle-"+navid).classList.add("loc-selected");

                //toggle subnav of clicked nav
                document.getElementById('sub-' + navid).classList.remove('slidedown')

                //then collapse all other subavs
                var subnav_class = document.getElementsByClassName('subnav')
                var a
                for (a = 0; a < subnav_class.length; a++) {
                    var this_name = subnav_class[a].id.substr(4)

                    //not selected one
                    if (this_name != navid) {
                        subnav_class[a].classList.add('slidedown')
                    }
                }
            } //end function

            cur_area = 0

            function backtofilters(first = null) {
                cur_area = 0

                //document.getElementById('mob-location-menu').classList.remove('--active');
                document.getElementById('loc-details').classList.remove('--active')
                document.getElementById('location-menu').classList.add('--active')
                document.getElementById('short_popup').classList.remove('show-popup')
                if (!first) {
                    flythere('eg')
                }

                //remove highlighted state of other markers
                var selected_class = document.getElementsByClassName('marker-highlight')
                var y
                for (y = 0; y < selected_class.length; y++) {
                    selected_class[y].classList.remove('marker-highlight')
                }
            } //end function

            document.getElementById('backtocat-details').addEventListener('click', function (event) {
                event.preventDefault()
                backtofilters()
                document.getElementById('map_l').scrollIntoView({
                    behavior: 'smooth',
                })
            })

            function closeall() {
                document.getElementById('loc-details').classList.add('slide-in')
                //document.getElementById('mob-location-menu').classList.add('slide-in');
                document.getElementById('location-menu').classList.add('slide-in')
            }

            //Image overlays

            map_l.addSource('myImageSource', {
                type: 'image',
                url: '/img/location/icons/embassy-gardens-buildings.png',
                coordinates: [
                    [-0.13671310036403383, 51.48494759915815],
                    [-0.12870773901573784, 51.4850245104285],
                    [-0.1285702608454926, 51.481009505783504],
                    [-0.13665744959462245, 51.4811082308332],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'overlay',
                source: 'myImageSource',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            //Image overlay
            map_l.addSource('battersea', {
                type: 'image',
                url: '/img/location/icons/battersea.png',
                coordinates: [
                    [-0.14571341987027608, 51.48355794236397],
                    [-0.1422814167922013, 51.48347961403289],
                    [-0.14229938539406817, 51.480995416962685],
                    [-0.1457313884729956, 51.481028988023866],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'overlay2',
                source: 'battersea',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('nineelmslane', {
                type: 'image',
                url: '/img/location/icons/nine-elms-lane.png',
                coordinates: [
                    [-0.13438670842359102, 51.483090414983906],
                    [-0.13331987063199335, 51.48313513205585],
                    [-0.13328567711425876, 51.48286044068257],
                    [-0.13438670842489842, 51.482832758511904],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'overlay3',
                source: 'nineelmslane',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('riverthames', {
                type: 'image',
                url: '/img/location/icons/river-thames.png',
                coordinates: [
                    [-0.1352511520342432, 51.48375072395936],
                    [-0.13408857239133454, 51.483750723886516],
                    [-0.13408857238863447, 51.48340576709282],
                    [-0.13523063592327844, 51.48339299083571],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'overlay4',
                source: 'riverthames',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('embassysquare', {
                type: 'image',
                url: '/img/location/icons/embassy-square.png',
                coordinates: [
                    [-0.13248386861314998, 51.48193153344229],
                    [-0.1319863529111558, 51.48193153344104],
                    [-0.13197951420789877, 51.481751595374874],
                    [-0.13248899764070643, 51.48175478954582],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'overlayembassysquare',
                source: 'embassysquare',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('embassybuilding', {
                type: 'image',
                url: '/img/location/icons/us-embassy.png',
                coordinates: [
                    [-0.1325395141336685, 51.48355742669358],
                    [-0.13215597272653667, 51.4835556866868],
                    [-0.13215179406313382, 51.48303819504238],
                    [-0.1325393526153391, 51.48303867175392],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'overlayembassybuilding',
                source: 'embassybuilding',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('rivbuilding', {
                type: 'image',
                url: '/img/location/icons/riverside-pin.png',
                coordinates: [
                    [-0.13123180142181923, 51.483840407340125],
                    [-0.1302769197821192, 51.48384821059835],
                    [-0.13028236078150712, 51.483418793542114],
                    [-0.13123177460863644, 51.48341656914724],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'riversidebuilding',
                source: 'rivbuilding',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('battersea-pk', {
                type: 'image',
                url: '/img/location/icons/embassy-gardens-battersea-pk.png',
                coordinates: [
                    [-0.16570514552921622, 51.48323722814462],
                    [-0.14904715142714053, 51.48353996061377],
                    [-0.1483989804503949, 51.47504251250581],
                    [-0.16489493180915815, 51.47467916605447],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'batterseapk',
                source: 'battersea-pk',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            map_l.addSource('union-sq', {
                type: 'image',
                url: '/img/location/icons/embassy-gardens-new-union-sq.png',
                coordinates: [
                    [-0.1354186640098476, 51.48301266160814],
                    [-0.13477060797748663, 51.48301181039514],
                    [-0.13476264271812965, 51.48206518623434],
                    [-0.1354226466386308, 51.482060152327534],
                ],
            }) //end add source

            map_l.addLayer({
                id: 'unionsq',
                source: 'union-sq',
                type: 'raster',
                paint: {
                    'raster-opacity': 0.95,
                },
            })

            //POI Markers
            window['numbered_icons'] = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.15615588768207544, 51.492267330798796],
                        },
                        properties: {
                            id: 11,
                            type: 'label',
                            classname: 'tube',
                            title: 'Sloane Square',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.142679958019869, 51.47991065663339],
                        },
                        properties: {
                            id: 12,
                            type: 'label',
                            classname: 'tube',
                            title: 'Battersea Power Station',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.1346203423835277, 51.479660611444444],
                        },
                        properties: {
                            id: 12,
                            type: 'label',
                            classname: 'tube',
                            title: 'Nine Elms',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.13353642555392753, 51.489203210453525],
                        },
                        properties: {
                            id: 12,
                            type: 'label',
                            classname: 'tube',
                            title: 'Pimlico',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.1445339678619746, 51.49468958907312],
                        },
                        properties: {
                            id: 12,
                            type: 'label',
                            classname: 'tube',
                            title: 'Victoria',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.12269684892274313, 51.48589752303354],
                        },
                        properties: {
                            id: 13,
                            type: 'label',
                            classname: 'tube',
                            title: 'Vauxhall',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.14626723656704144, 51.475218033858965],
                        },
                        properties: {
                            id: 14,
                            type: 'label',
                            classname: 'rail',
                            title: 'Queenstown Road',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.1475910548664956, 51.477543163061114],
                        },
                        properties: {
                            id: 15,
                            type: 'label',
                            classname: 'rail',
                            title: 'Battersea Park',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.15728778625086193, 51.47866875717526],
                        },
                        properties: {
                            id: 16,
                            type: 'label',
                            classname: 'textlabels',
                            title: 'Battersea Park',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.13553175746281454, 51.48093049930563],
                        },
                        properties: {
                            id: 17,
                            type: 'label',
                            classname: 'textlabels',
                            title: 'Nine Elms',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.14460785044678914, 51.48106198295025],
                        },
                        properties: {
                            id: 18,
                            type: 'label',
                            classname: 'textlabels',
                            title: 'Battersea Power Station',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.1314598199499244, 51.48321914946615],
                        },
                        properties: {
                            id: 19,
                            type: 'label',
                            classname: 'eglogo',
                            title: '',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            coordinates: [-0.13218098333243233, 51.48183463527522],
                        },
                        properties: {
                            id: 20,
                            type: 'label',
                            classname: 'plainlabel',
                            title: '',
                        },
                    },
                ],
            }
            // Add POI markers
            var thisroutename = 'numbered'
            window[thisroutename + '_icons'].features.forEach(function (marker) {
                // create an HTML element for each marker
                var el = document.createElement('div')
                el.id = thisroutename + marker.properties.id

                el.innerHTML = marker.properties.title
                el.className = 'marker marker-labels marker-' + marker.properties.classname

                if ((estate == true && marker.properties.classname != 'eglogo') || estate == false) {
                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el, 'top-left').setLngLat(marker.geometry.coordinates).addTo(map_l)
                }
            })

            if (opencat !== false && opencat !== '') {
                cur_cat = opencat
                backtofilters('first')
                show_subnav(opencat)
                var cat_array = [`${opencat}-icon`]
                toggleMarkers(cat_array)
                //flyThereStart()
            }
        }) //map onload

        var flying = false
        function flythere(place) {
            flying = true
            if (mobile_flag) {
                document.getElementById('mob-location-menu').classList.add('slide-in')
                document.getElementById('location-menu').classList.add('slide-in')
            }
            map_l.dragPan.disable()
            map_l.flyTo(places_areas[place])
        } //end flythere

        function flyThereStart() {
            flythere('eg') //initial area
        }

        ScrollTrigger.create({
            trigger: this.$el.querySelector('.map'),
            // markers: true,
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
            toggleActions: 'play play reverse reverse',
            onEnter: flyThereStart,
        })
    }, //mounted
    head() {
        return {
            script: [
                {
                    hid: 'locations',
                    src: 'https://www.embassygardens.com/app/themes/egwp/locations.js',
                    defer: true,
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
#map {
    min-height: 50vh;
}
</style>
