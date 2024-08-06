(function ($) {
    "use strict";

    /**
     *
     * @constructor
     */
    var WebManagerMap = function () {
        this.confData = {};
        this.selfCount = {};
        this.mapInstance = {};
        this.mapMarkers = {};
        this.activeMap = null;

        if ($(".js-mapComponent").length) {
            this.initialize();
        }
    };

    /**
     *
     * @param postcode
     * @returns {string}
     */
    WebManagerMap.prototype.getAddressForPostcode = function (componentName, postcode, houseNum) {
        var address = "",
            locations = this.confData[componentName].locations;

        for (var i = 0; i < locations.length; i++) {
            if (locations[i].address.indexOf(postcode) !== -1) {
                if (houseNum !== null) {
                    if (locations[i].address.indexOf(houseNum) !== -1) {
                        address = locations[i].address;
                        break;
                    }
                } else {
                    address = locations[i].address;
                    break;
                }
            }
        }
        return address;
    };

    /**
     * Set up map instance for the map elements on the page
     */
    WebManagerMap.prototype.initialize = function () {
        var self = this;

        // Get all the map elements with the same class.
        var mapElements = $('.js-mapComponent');
        var mapsUrl = '//smbmaps.ibsrv.net/world_tiles/{z}/{x}/{y}.png';

        window.mapPopupTriggered = false;

        // For each container that will hold a map.
        mapElements.each(
            function () {
                // Get the component alias
                var componentName = $(this).closest('[data-component-name]').data('componentName');

                // Initialize a map
                self.mapInstance[componentName] = L.map(this);

                L.tileLayer(
                    mapsUrl,
                    {
                        attribution: 'Map data provided by <a href="http://www.internetbrands.com/">Internet Brands</a>',
                        maxZoom: 18
                    }
                ).addTo(self.mapInstance[componentName]);

                self.mapInstance[componentName].scrollWheelZoom.disable();

                self.confData[componentName] = JSON.parse($(this).closest('[data-component-name]').find('input[type=hidden]').val());

                self.setupMap(self.mapInstance[componentName], self.confData[componentName]);

                self.mapSize(this, self.confData[componentName], componentName);

                self.attachEvents(this, self.confData[componentName], componentName);

                var searchSubmit = false;
                self.searchByZipCode(this, self.confData[componentName], self.mapInstance[componentName], componentName, searchSubmit);

                var locations = self.confData[componentName].locations;
                // have to make array reverse because the centered marker should be the first one in the listing
                // of locations manager
                if(locations.length > 1 && !self.confData[componentName].fitBounds){
                    locations =  locations.reverse();
                }

                for (var i = 0; i < locations.length; i++) {

                    // markup for the cta with icon
                    if (locations[i].cta != null) {
                        if (locations[i].cta.buttonStyle == 2) {
                            locations[i].cta.iconHtm =
                                '\n<span aria-label="' + locations[i].cta.iconClass.replace(/-/g, " ") + '">\n' +
                                '<span class="' + locations[i].cta.iconClass + ' icon" aria-hidden="true"></span>\n</span>\n'
                        }
                        if (locations[i].cta.buttonStyle == 3) {
                            locations[i].cta.iconHtm = '\n<span class="' + locations[i].cta.iconClass + ' icon" aria-hidden="true"></span>\n' + locations[i].cta.buttonText + '\n'
                        }
                    }

                    //if there is latitude and longitude for the location
                    if (locations[i].latitude != null && locations[i].longitude != null) {
                        var json = [{
                            "lat": locations[i].latitude,
                            "lon": locations[i].longitude,
                            "address": {
                                "name": locations[i].address,
                            }
                        }];

                        // create the marker
                        self.applyData(json, componentName, this, i);
                    }
                    // if there is an address for the location
                    else {
                        //get the latitude for the current location
                        self.geolocateLocation(locations[i], componentName, this);
                    }
                }

                var xaxisPan = self.confData[componentName].xaxis,
                yaxisPan = self.confData[componentName].yaxis;

                // set map X/Y - Axis Offset for desktop resolution
                if ($(window).width() > 768) {
                    if(xaxisPan != 0 || yaxisPan != 0) self.mapInstance[componentName].panBy([xaxisPan, yaxisPan])
                }
            }
        );

        // Toggle map scrolling
        $("body").click(function (e) {
            if ($(e.target).hasClass("js-mapComponent")) {
                var componentName = $(e.target).closest('[data-component-name]').data('componentName');
                // Disable scroll on other map instance if already enabled
                if (self.activeMap !== null) {
                    self.mapInstance[self.activeMap].scrollWheelZoom.disable();
                }
                self.activeMap = componentName;

                if(self.confData[componentName].zoomControl){
                    self.mapInstance[componentName].scrollWheelZoom.enable();
                }
            } else {
                if (self.activeMap !== null) {
                    self.mapInstance[self.activeMap].scrollWheelZoom.disable();
                    self.activeMap = null;
                }
            }
        });
    };
    
    /**
     * Attach events
     *
     * @param map
     * @param mapData
     * @param componentName
     */
    WebManagerMap.prototype.attachEvents = function (map, mapData, componentName) {
        var self = this,
            winResizeTimer;
        
        $(window).resize(function () {
            self.mapSize(map, mapData, componentName);
            clearTimeout(winResizeTimer);
            //Call mapCenter function when the resizing completely will stop/finish
            winResizeTimer = setTimeout(function () {
                if (self.mapMarkers[componentName].length > 1 && self.confData[componentName].fitBounds) {
                    var markerGroup = L.featureGroup(self.mapMarkers[componentName]);
                    self.mapCenter(componentName, markerGroup);
                }
            }, 250);
        });
    }

    /**
     *
     * @param mapInstance
     * @param mapData
     */
    WebManagerMap.prototype.setupMap = function (mapInstance, mapData) {
        var zoomControl = mapData.zoomControl;

        if (!zoomControl) {
            // Drawing a square area to zoom
            mapInstance.boxZoom.disable();

            // The zoom on double click
            mapInstance.doubleClickZoom.disable();

            // Like when you hit the keys for + and -
            mapInstance.keyboard.disable();

            // The zoom with scroll
            mapInstance.scrollWheelZoom.disable(); 

            if (mapInstance.tap) {
                mapInstance.tap.disable();
            }

            // The zoom via touch
            mapInstance.touchZoom.disable();

            // The + and - buttons
            $(".leaflet-control-zoom").css("visibility", "hidden");
        }
    };

    /**
     * Set fit bound for map instance with multiple locations
     * @param componentName Alias of the map component
     * @param markerLayer   The layer containing all the markers
     */
    WebManagerMap.prototype.mapCenter = function (componentName, markerLayer) {
        var self = this;

        self.mapInstance[componentName].fitBounds(markerLayer.getBounds().pad(0.5));

        if (self.confData[componentName].alwaysShowInfoWindow) {
            if(self.mapMarkers[componentName][self.mapMarkers[componentName].length - 1].isPopupOpen()){
                if (!window.mapPopupTriggered) {
                    //TODO - mapCenter function triggers endless resize event
                    //SMBWMGR-19261 - this does the trick, togglePopup does not help since need some timeout to correct the position
                    self.mapMarkers[componentName][self.mapMarkers[componentName].length - 1].closePopup(); 
                    self.mapMarkers[componentName][self.mapMarkers[componentName].length - 1].openPopup(); 
                    window.mapPopupTriggered = true;
                }
           }
       }
    };


    /**
     * Calculates the size of the map based on the settings
     * @param element Map instance
     * @param mapData Settings for the map
     */
    WebManagerMap.prototype.mapSize = function (element, mapData, componentName) {
        var self = this, parent = $(element).parent();

        if (mapData.autoFit) {
            var titleCaptionHeight, pleMapAwrapHeight;
            (!self.confData[componentName].isPle) ? titleCaptionHeight = parent.children('.component__title-caption-wrap').outerHeight(true) : pleMapAwrapHeight = parent.find('.map__wrap').outerHeight(true);
            
            parent.css('height', '100%');
            var elementHeight = parent.height();

            // If there title or caption is shown in the component subtract it from the parent height
            if (!self.confData[componentName].isPle && titleCaptionHeight !== null) {
                elementHeight = elementHeight - titleCaptionHeight;
            } else {
                if ($(window).width() <= 768 && pleMapAwrapHeight !== null) {
                    elementHeight = elementHeight - pleMapAwrapHeight;
                }
            }

            // Resize the map and trigger map.resize event
            $(element).css({width: parent.width(), height: elementHeight});
            $(element).trigger('map.resize');

        } else {
            $(element).css({width: mapData.width, height: mapData.height});
        }
    };

    /**
     * Notice the param json_callback=jsonMapCallback
     * Check more here: http://wiki.openstreetmap.org/wiki/Nominatim
     * json_callback=<string> - Wrap json output in a callback function (JSONP) i.e. <string>(<json>)
     * @type {string}
     */
    WebManagerMap.prototype.geocodeURL = "https://nominatim.openstreetmap.org/search?[QUERY]&format=json&polygon=1&addressdetails=1&limit=1";

    /**
     *
     * @param location
     */
    WebManagerMap.prototype.geolocateLocation = function (location, componentName, mapElement) {
        var self = this,
            geocodeURL = this.geocodeURL;

        geocodeURL = geocodeURL.replace("[QUERY]", location.query);

        // Geocode the location and apply the response to the map instance
        $.ajax({
            url: geocodeURL,
            dataType: "jsonp",
            jsonp: 'json_callback',
            success: function (json) {
                self.applyData(json, componentName, mapElement);
            }
        });
        // @todo: Maybe find another solution for this cross-domain query
    };


     /**
     * Geocode the location, search by zip code or city
     * @param map
     * @param mapData
     * @param mapInstance
     * @param componentName
     */
     WebManagerMap.prototype.searchByZipCode = function (map, mapData, mapInstance, componentName, searchSubmit) {
        var self = this,
            geocodeURL = this.geocodeURL;

        $("#location-zip").submit(function (event) {
            event.preventDefault();

            var zipCodeVal = $('#location-search').val();

            if (!zipCodeVal || zipCodeVal == "Enter your zip code and state") {
                alert("Please enter your current city or ZIP code.");
                return;
            }

            geocodeURL = "https://nominatim.openstreetmap.org/search?q=" + zipCodeVal + "&format=json";

            $.ajax({
                url: geocodeURL,
                dataType: "jsonp",
                jsonp: 'json_callback',
                success: function (json) {
                    self.getDistance(json, mapData, mapInstance, componentName, searchSubmit);
                }
            });
        });
    };


    /**
    * Calculate the distance between the locations
    * @param json
    * @param mapData
    * @param mapInstance
    * @param componentName
    */
    WebManagerMap.prototype.getDistance = function (json, mapData, mapInstance, componentName, searchSubmit) {
        var self = this;
        self.markerTemp;
    
        if (Object.keys(json).length !== 0) {
    
            // get the coordinates
            var location = mapData.locations,
                lat = json[0].lat,
                lon = json[0].lon;
    
            // create green icon for the new marker
            var greenIcon = new L.Icon({
                iconUrl: mapData.assetsPath + 'css/images/marker-icon-green.png',
                shadowUrl: mapData.assetsPath + 'images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
    
            // create and attach the new marker to the map instace
            var marker = new L.marker([lat, lon], { icon: greenIcon });
            marker.addTo(mapInstance);
    
            // set the view to the new marker
            // mapInstance.setView([lat, lon], mapData.zoom, {animation: true});
    
            // remove the previous markers generated by the search
            if (typeof (self.markerTemp) != "undefined") {
                self.markerTemp.removeFrom(mapInstance);
                this.mapMarkers[componentName].pop(marker);
            }
    
            // keep in temp previous marker and push the new one
            if (marker != null) self.markerTemp = marker;
            this.mapMarkers[componentName].push(marker);
    
            // close all of the popups
            mapInstance.closePopup();
    
            // set the view based on the grouped markers
            var markerGroup = L.featureGroup(this.mapMarkers[componentName]).addTo(mapInstance);
            mapInstance.fitBounds(markerGroup.getBounds().pad(0.5));
    
            // loop and set the miles values
            for (var i = 0; i < location.length; i++) {
    
                if (location[i].latitude != null && location[i].longitude != null) {
    
                    var distanceMeters = L.latLng([location[i].latitude, location[i].longitude]).distanceTo([lat, lon]),
                        // distanceTo returns meters, convert this to miles - 1m = 0.000621371
                        distanceMiles = Math.round(distanceMeters * 0.000621371),
                        $gmapLocTitle = $(".gmap-location b"),
                        $gmapLocDistance = $(".gmap-location .gmap-distance");
    
                    for (var j = 0; j < $gmapLocTitle.length; j++) {
    
                        if ($gmapLocTitle[j].innerText.indexOf(location[i].title) !== -1) {
                            $($gmapLocTitle[j]).closest('.gmap-location').data('distanceMiles', distanceMiles);
                            
                            distanceMiles = distanceMiles.toLocaleString();
                            $gmapLocDistance.show();
                            $gmapLocDistance[j].innerHTML = distanceMiles + " mi";
                        }
                    }
                }
            }
    
            // order the location list by distance
            $(".gmap-location-list li").sort(function (a, b) { return ($(b).data('distanceMiles')) < ($(a).data('distanceMiles')) ? 1 : -1; }).appendTo('.gmap-location-list');
    
            // trigger the click and change the location info
            searchSubmit = true;
            $(".gmap-location-list li").first().children().trigger('click',[ searchSubmit ]);
    
        } else {
    
            // clean up the distance data
            var $gmapLocTitle = $(".gmap-location b"),
                $locDistanceInfo = $(".map-search__location-distance > b"),
                $gmapLocDistance = $(".gmap-location .gmap-distance");
    
            for (var i = 0; i < $gmapLocDistance.length; i++) {
                $gmapLocDistance.show();
                $gmapLocDistance[i].innerHTML = " -- mi";
            }
            for (var i = 0; i < $locDistanceInfo.length; i++) {
                $locDistanceInfo.show();
                $locDistanceInfo[i].innerHTML = " -- mi";
            }
            for (var i = 0; i < $gmapLocTitle.length; i++) {
                $($gmapLocTitle[i]).closest('.gmap-location').data('distanceMiles', "--");
            }
        }
    };


    /**
     * Apply the location data on the map instance
     * @param json
     * @param componentName
     */
    WebManagerMap.prototype.applyData = function (json, componentName, mapElement, index) {

        var self = this;
        if (json.length > 0) {
            self.selfCount[componentName] = self.selfCount[componentName] || 0;

            var data = json[0],
                lat = data.lat,
                lon = data.lon;

            
            self.mapInstance[componentName].setView([lat, lon], self.confData[componentName].zoom, {animation: true});
            self.selfCount[componentName]++;

            var markerOptions = [];
            markerOptions['alt'] = 'Map Marker';

            var assetsPath = self.confData[componentName].assetsPath;

            if (self.confData[componentName].iconUrl) {
                var iconUrl = self.confData[componentName].iconUrl,
                    icon = new L.Icon({
                        iconUrl: iconUrl,
                        shadowUrl: assetsPath + 'images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });

                markerOptions['icon'] = icon;
            }

            // var marker = L.marker([lat, lon], markerOptions).addTo(self.mapInstance[componentName]);
            var marker = L.marker([lat, lon], markerOptions);

            if (self.confData[componentName].alwaysShowInfoWindow || self.confData[componentName].showAddressOnHover) {
                var location = data.display_name || null; // Default to display_name attribute or null
                var addressFromPostcode = null;

                if ('postcode' in data.address) {
                    var houseNum = ('house_number' in data.address) ? data.address.house_number : null;

                    addressFromPostcode = self.getAddressForPostcode(componentName, data.address.postcode, houseNum);
                    location = (addressFromPostcode != '') ? addressFromPostcode : location;
                }
                else if (data.address.name) {
                    location = data.address.name;
                }

                if (location) {
                    marker.bindPopup(location);
                }
            }
            self.mapMarkers[componentName] = self.mapMarkers[componentName] || [];
            self.mapMarkers[componentName].push(marker);

            // TODO: this needs to be in the map init section?
            if (self.confData[componentName].hue) {
                var hueObj = self.confData[componentName].hue,
                    hueStylers = hueObj.stylers,
                    // @todo: Maybe find a way to convert gama, lightness and the hue (rbg color by some reason) into a rgb?
                    gama = hueStylers[0].gama,
                    lightness = hueStylers[1].lightness,
                    hue = hueStylers[2].hue;

                if (hue !== "none") {
                    $(mapElement).css("background-color", hue);
                    $("div.leaflet-tile-pane", mapElement).css("opacity", "0.9");
                }
            }

            // Add the markers to the map
            if (self.selfCount[componentName] >= self.confData[componentName].locations.length) {
                var markerGroup = L.featureGroup(self.mapMarkers[componentName]).addTo(self.mapInstance[componentName]);

                // Center the map if more then one marker
                if (self.mapMarkers[componentName].length > 1 && self.confData[componentName].fitBounds) {
                    self.mapCenter(componentName, markerGroup);
                }

                // Open the info window if the setting is set
                if (self.confData[componentName].alwaysShowInfoWindow) {
                    //SMBWMGR-19261 - this does the trick, togglePopup does not help since need some timeout to correct the position
                    self.mapMarkers[componentName][self.mapMarkers[componentName].length - 1].closePopup(); 
                    self.mapMarkers[componentName][self.mapMarkers[componentName].length - 1].openPopup(); 
                }
            }
        } else {
            console.log("No data found.");
        }
    };

    /**
     * PLE specific to change text based on clicked location
     */
    function pleMap(){
        var locationFields = [
            {
                selector: '.map-search__location-distance h3 b',
                property: 'title',
                type: 'text'
            },
            {
                selector: '.map-search__location-address p',
                property: 'address_format',
                type: 'text'
            },
            {
                selector: '.map-search__location-phone',
                property: 'phone',
                type: 'text'
            },
            {
                selector: '.map-search__location-phone2',
                property: 'phone2',
                type: 'text'
            },
            {
                selector: '.map-search__location-fax',
                property: 'fax',
                type: 'text'
            },
            {
                selector: '.map-search__location-directions a',
                property: ['cta','buttonText'],
                type: 'text'
            },
            {
                selector: '.map-search__location-directions a',
                property: ['cta','linkPage'],
                type: 'href'
            },
            {
                selector: '.map-search__email',
                property: 'email',
                type: 'text'
            }
        ];

        $('#gmap-location-list').on('click', '.gmap-location a', function (event, searchSubmit) {
            event.preventDefault();
            var componentName = $(this).closest('[data-component-name]').data('componentName');
            var locations = window.webManagerMap.confData[componentName].locations;
            var clickedID = $(this).parent().attr('id');
            var location = locations.find(function(obj) {
                return obj.ID === clickedID
            });
            var locMarker = window.webManagerMap.mapMarkers[componentName].find(function(obj) {
                return (obj._latlng.lat == location.latitude && obj._latlng.lng == location.longitude);
            });

            // set the view to the clicked marker
            var mapInstance = window.webManagerMap.mapInstance[componentName],
                mapData = window.webManagerMap.confData[componentName];

            if (typeof(searchSubmit) == "undefined") { 
                mapInstance.setView([location.latitude, location.longitude], mapData.zoom, {animation: true});
                if(typeof(locMarker) != "undefined") locMarker.openPopup();
            }

            // set the distance
            var distance = $(this).closest('.gmap-location').data('distanceMiles'),
                $locDistanceInfo = $('.map-search__location-distance > b');

            if (typeof(distance) != "undefined") { 
                $locDistanceInfo.show();
                distance = distance.toLocaleString();
                $locDistanceInfo[0].innerHTML = distance + " mi";
            } else {
                $locDistanceInfo[0].innerHTML = " -- mi";
            }

            locationFields.forEach(function (field, i) {
                var loc = {};
                var prop = field.property;

                // manage cta buttons/links
                if (field.selector == '.map-search__location-directions a') {
                    var btnStyle = '';
                    for (var i = 0; i <= 3; i++) {
                        if (location.cta.buttonStyle == i) {
                            //get the cta style class
                            switch (location.cta.buttonStyle) {
                                case '0':
                                    btnStyle = 'cta__link component__link--';
                                    break;
                                case '1':
                                    btnStyle = 'cta__button component__button--';
                                    break;
                                case '2':
                                    btnStyle = 'cta__link--icon ';
                                    break;
                                case '3':
                                    btnStyle = 'cta__button--icon component__button--';
                                    break;
                                default:
                            }
                            // set the cta markup
                            location.cta.buttonStyle == 2 || location.cta.buttonStyle == 3 ? $(field.selector).html(location.cta.iconHtm) : $(field.selector).text(location.cta.buttonText);
                            // set the cta style class
                            $(field.selector).removeClass().addClass(btnStyle + location.cta.displayStyle);
                            // set the href
                            if (location.cta.linkType == 2) {
                                $(field.selector).attr('href', '#');
                            } else {
                                location.cta.linkType == 1 ? $(field.selector).attr('href', location.cta.linkUrl) : $(field.selector).attr('href', location.cta.linkPage);
                            }
                            // set the target
                            location.cta.openInNew ? $(field.selector).attr('target', '_blank') : $(field.selector).attr('target', '');
                            // set the rel
                            location.cta.openInNew && location.cta.linkType == 1 ? $(field.selector).attr('rel', 'noopener') : $(field.selector).attr('rel', '');
                        }
                    }
                }
                else {
                    if (typeof prop === 'string' || prop instanceof String) {
                        loc = location[prop]
                    } else {
                        var lc = location;
                        prop.forEach(function (pr) {
                            lc = lc[pr];
                        });
                        loc = lc;
                    }
                    if (typeof loc === 'string' || loc instanceof String) {
                        if (field.type === 'text') {
                            $(field.selector).text(loc);
                            if (field.selector == '.map-search__location-phone' || field.selector == '.map-search__location-phone2') {
                                $(field.selector).attr('href', 'tel:' + loc);
                            }
                        } else if (field.type === 'href') {
                            $(field.selector).attr('href', loc);
                            debugger;
                        }
                        if (loc.length > 0) {
                            $(field.selector).show();
                        } else {
                            $(field.selector).hide();
                        }
                    } else {
                        var vals = Object.values(Object.keys(location[prop]).map(function (e) {
                            return location[prop][e];
                        }));
                        $(field.selector).html(vals.join("<br>"));
                    }
                }
            });
        });
    }

    $(document).ready(
        function () {
            window.webManagerMap = new WebManagerMap();

            if($('.map-a').length > 0){
                pleMap();
            }
        }
    );
})(window.jQuery);
