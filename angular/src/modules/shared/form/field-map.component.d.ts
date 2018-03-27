import { SimpleComponent } from './field-simple.component';
import { FieldBase } from './field-base';
import { Map } from 'leaflet';
/**
 * Map Model
 *
 *
 * @author <a target='_' href='https://github.com/andrewbrazzatti'>Andrew Brazzatti</a>
 *
 */
export declare class MapField extends FieldBase<any> {
    initialised: boolean;
    tabId: string;
    importDataString: string;
    layerGeoJSON: any;
    map: Map;
    importFailed: boolean;
    layers: any[];
    drawnItems: any;
    googleMaps: any;
    googleHybrid: any;
    masterDrawOptions: any;
    defaultDrawOptions: any;
    drawOptions: any;
    masterLeafletOptions: {
        layers: any[];
    };
    defaultLeafletOptions: {
        zoom: number;
        center: any;
    };
    leafletOptions: any;
    layersControl: {
        baseLayers: {
            'Google Maps': any;
            'Google Hybrid': any;
        };
    };
    constructor(options: any, injector: any);
    onMapReady(map: Map): void;
    registerMapEventHandlers(map: Map): void;
    drawLayers(): void;
    postInit(value: any): void;
    createFormModel(valueElem?: any): any;
    setValue(value: any): void;
    setEmptyValue(): any;
    importData(): boolean;
}
/**
* #### Map Component.
*
* Uses Leaflet.js to render a widget and the Leaflet.draw plugin to be able to select regions
*
* #### Usage
* ```
*  {
*   class: 'MapField',
*   compClass: 'MapComponent',
*   definition: {
*     name: 'geocoords',
*     label: '@dataRecord-coverage',
*     help: '@dataRecord-coverage',
*     tabId: 'coverage',
*     leafletOptions: {
*                      zoom: 3,
*                      center: latLng([108.94248962402342, 34.26516142452615)
*                     }
*     }
*   }
* ```
*
*| Property Name  | Description                                                                                                                                                                                                                                                                                                                       | Required | Default                                                                                                                                                                                                                                                                                  |
*|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
*| label          | The label to show above the component                                                                                                                                                                                                                                                                                             | No       *|                                                                                                                                                                                                                                                                                          |
*| help           | Help text                                                                                                                                                                                                                                                                                                                         | No       *|                                                                                                                                                                                                                                                                                          |
*| tabId          | The name of the tab the widget is placed, this is needed as Leaflet needs the map to be visible before the tiles can be loaded correctly. Leave empty if widget isn't placed in a tab.                                                                                                                                            | No       *|                                                                                                                                                                                                                                                                                          |
*| leafletOptions | The leaflet options object. See the [Leaflet's documentation](http://leafletjs.com/reference-1.3.0.html#map-option) for more information. Note: layers cannot be changed as other functionality depends on it being set as it is and will be overridden. Defaults to a map centred on Australia (if no elements are drawn on map) | No       | ```{zoom: 4, center:" latLng([-24.673148, 134.074574]) }```                                                                                                                                                                                                                              |
*| drawOptions    | The leaflet draw options object. See the [Leaflet Draw's documentation](https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#options) for more information. Note: the edit featureGroup cannot be changed as other functionality depends on it being set as it is and will be overridden.                         | No       | ```{position:"topright",draw:{marker:{icon:icon({iconSize:[25,41],iconAnchor:[13,41],iconUrl:"http://localhost:1500/default/rdmp/images/leaflet/marker-icon.png",shadowUrl:"http://localhost:1500/default/rdmp/images/leaflet/marker-shadow.png"})},circlemarker:false,circle:false}}``` |
*/
export declare class MapComponent extends SimpleComponent {
    field: MapField;
}
