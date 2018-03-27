var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { SimpleComponent } from './field-simple.component';
import { FieldBase } from './field-base';
import { FormControl } from '@angular/forms';
import * as _ from "lodash-es";
var MapField = (function (_super) {
    __extends(MapField, _super);
    function MapField(options, injector) {
        var _this = _super.call(this, options, injector) || this;
        _this.initialised = false;
        _this.importDataString = "";
        _this.layerGeoJSON = {};
        _this.importFailed = false;
        _this.layers = [];
        _this.drawnItems = new L.FeatureGroup();
        _this.googleMaps = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            detectRetina: true
        });
        _this.googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            detectRetina: true
        });
        _this.masterDrawOptions = {
            edit: {
                featureGroup: _this.drawnItems
            },
        };
        _this.defaultDrawOptions = {
            position: 'topright',
            edit: {
                featureGroup: _this.drawnItems
            },
            draw: {
                marker: {
                    icon: L.icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: 'http://localhost:1500/default/rdmp/images/leaflet/marker-icon.png',
                        shadowUrl: 'http://localhost:1500/default/rdmp/images/leaflet/marker-shadow.png'
                    })
                },
                circlemarker: false,
                circle: false
            }
        };
        _this.drawOptions = _this.defaultDrawOptions;
        _this.masterLeafletOptions = {
            layers: [_this.googleMaps, _this.drawnItems],
        };
        _this.defaultLeafletOptions = {
            zoom: 4,
            center: L.latLng([-24.673148, 134.074574])
        };
        _this.leafletOptions = _this.defaultLeafletOptions;
        _this.layersControl = {
            baseLayers: {
                'Google Maps': _this.googleMaps,
                'Google Hybrid': _this.googleHybrid
            }
        };
        _this.leafletOptions = options['leafletOptions'] || _this.defaultLeafletOptions;
        _this.leafletOptions = _.merge(_this.leafletOptions, _this.masterLeafletOptions);
        _this.drawOptions = options['drawOptions'] || _this.drawOptions;
        _this.drawOptions = _.merge(_this.drawOptions, _this.masterDrawOptions);
        _this.tabId = options['tabId'] || null;
        _this.layerGeoJSON = options.value;
        return _this;
    }
    MapField.prototype.onMapReady = function (map) {
        var _this = this;
        this.map = map;
        var that = this;
        this.registerMapEventHandlers(map);
        this.setValue(this.layerGeoJSON);
        if (this.tabId === null) {
            map.invalidateSize();
            map.fitBounds(this.drawnItems.getBounds());
        }
        else {
            if (this.editMode) {
                this.fieldMap._rootComp.fields[0]["onTabChange"].subscribe(function (tabName) {
                    if (tabName == _this.tabId) {
                        map.invalidateSize();
                        if (!that.initialised) {
                            try {
                                map.fitBounds(_this.drawnItems.getBounds());
                            }
                            catch (e) {
                            }
                            that.initialised = true;
                        }
                    }
                });
            }
            else {
                setTimeout(5000, function () { map.invalidateSize(); });
            }
        }
    };
    MapField.prototype.registerMapEventHandlers = function (map) {
        var that = this;
        map.on(L.Draw.Event.CREATED, function (e) {
            var type = e.layerType, layer = e.layer;
            that.layers.push(layer);
            that.layerGeoJSON = L.featureGroup(that.layers).toGeoJSON();
            that.layers = [];
            return false;
        });
        map.on('draw:edited', function (e) {
            var layers = e.layers;
            var that2 = that;
            layers.eachLayer(function (layer) {
                that2.layers[_.findIndex(that2.layers, function (o) { return o._leaflet_id == layer._leaflet_id; })] = layer;
            });
        });
        map.on('draw:editstop', function (e) {
            that.layerGeoJSON = L.featureGroup(that.layers).toGeoJSON();
            that.setValue(that.layerGeoJSON);
        });
        map.on('draw:deletestop', function (e) {
            that.layerGeoJSON = L.featureGroup(that.layers).toGeoJSON();
            that.setValue(that.layerGeoJSON);
        });
        map.on('draw:deleted', function (e) {
            var layers = e.layers;
            var that2 = that;
            layers.eachLayer(function (layer) {
                _.remove(that2.layers, function (o) { return o._leaflet_id == layer._leaflet_id; });
            });
        });
    };
    MapField.prototype.drawLayers = function () {
        this.drawnItems.clearLayers();
        var geoJSONLayer = L.geoJSON(this.layerGeoJSON);
        this.layers = [];
        var that = this;
        geoJSONLayer.eachLayer(function (layer) {
            layer.addTo(that.drawnItems);
            that.layers.push(layer);
        });
    };
    MapField.prototype.postInit = function (value) {
        if (!_.isEmpty(value)) {
            this.layerGeoJSON = value;
            this.drawLayers();
        }
    };
    MapField.prototype.createFormModel = function (valueElem) {
        if (valueElem === void 0) { valueElem = undefined; }
        if (valueElem) {
            this.layerGeoJSON = valueElem;
        }
        this.formModel = new FormControl(this.layerGeoJSON || {});
        return this.formModel;
    };
    MapField.prototype.setValue = function (value) {
        if (!_.isEmpty(value)) {
            this.layerGeoJSON = value;
            this.drawLayers();
            this.formModel.patchValue(this.layerGeoJSON, { emitEvent: false });
            this.formModel.markAsTouched();
        }
    };
    MapField.prototype.setEmptyValue = function () {
        this.layerGeoJSON = {};
        return this.layerGeoJSON;
    };
    MapField.prototype.importData = function () {
        var _this = this;
        if (this.importDataString.length > 0) {
            try {
                if (this.importDataString.indexOf("<") == 0) {
                    var parsedLayers = omnivore.kml.parse(this.importDataString);
                    if (parsedLayers.getLayers().length == 0) {
                        this.importFailed = true;
                        return false;
                    }
                    var that_1 = this;
                    parsedLayers.eachLayer(function (layer) {
                        layer.addTo(that_1.drawnItems);
                        that_1.layers.push(layer);
                        that_1.layerGeoJSON = L.featureGroup(that_1.layers).toGeoJSON();
                        _this.drawLayers();
                        that_1.map.fitBounds(that_1.drawnItems.getBounds());
                    });
                    this.importDataString = "";
                    this.importFailed = false;
                }
                else {
                    var parsedLayers = L.geoJSON(JSON.parse(this.importDataString));
                    var that_2 = this;
                    parsedLayers.eachLayer(function (layer) {
                        layer.addTo(that_2.drawnItems);
                        that_2.layers.push(layer);
                        that_2.layerGeoJSON = L.featureGroup(that_2.layers).toGeoJSON();
                        _this.drawLayers();
                        that_2.map.fitBounds(that_2.drawnItems.getBounds());
                    });
                    this.importDataString = "";
                    this.importFailed = false;
                }
            }
            catch (e) {
                this.importFailed = true;
            }
        }
        return false;
    };
    return MapField;
}(FieldBase));
export { MapField };
var rbMapDataTemplate = './field-map.html';
if (typeof aotMode == 'undefined') {
    rbMapDataTemplate = '../angular/shared/form/field-map.html';
}
var MapComponent = (function (_super) {
    __extends(MapComponent, _super);
    function MapComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapComponent = __decorate([
        Component({
            selector: 'rb-mapdata',
            templateUrl: './field-map.html'
        })
    ], MapComponent);
    return MapComponent;
}(SimpleComponent));
export { MapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpZWxkLW1hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxPQUFPLEVBQVMsU0FBUyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQWEsV0FBVyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZLENBQUM7QUFjaEM7SUFBOEIsNEJBQWM7SUErRTFDLGtCQUFZLE9BQVksRUFBRSxRQUFhO1FBQXZDLFlBQ0Usa0JBQU0sT0FBTyxFQUFFLFFBQVEsQ0FBQyxTQWF6QjtRQTFGRCxpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixzQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFFOUIsa0JBQVksR0FBUSxFQUFFLENBQUM7UUFFdkIsa0JBQVksR0FBVyxLQUFLLENBQUM7UUFDN0IsWUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGdCQUFVLEdBQVEsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsZ0JBQVUsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLG1EQUFtRCxFQUFFO1lBQzVFLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ3hDLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztRQUNILGtCQUFZLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxxREFBcUQsRUFBRTtZQUNoRixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtB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