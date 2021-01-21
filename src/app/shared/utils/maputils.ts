import * as L from 'leaflet';
import * as GeoJSON from 'geojson';

export const DEFAULT_ZOOM = 4;

export const DEFAULT_CENTER: L.LatLng = L.latLng([-27, 121]);

export const DEFAULT_BOUNDS_SIZE = 100000;

export const DEFAULT_MARKER_ICON: L.Icon = L.icon({
    iconRetinaUrl: 'css/images/marker-icon-2x.png',
    iconUrl: 'css/images/marker-icon.png',
    shadowUrl: 'css/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const DEFAULT_ROW_LIMIT = 10;

export function getDefaultBaseLayer(): L.TileLayer {
    return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Open Street Map'
    });
}

export function getOverlayLayers(): any {
    return {
        'State Map Base 250K': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:state_map_base',
            format: 'image/png',
            transparent: true,
        }),
        'WA Townsites': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:townsite_poly',
            format: 'image/png',
            transparent: true,
        }),
        'P&W Estate': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:dpaw_tenure',
            format: 'image/png',
            transparent: true,
        }),
        'Unallocated Crown Land': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:unallocated_crown_land',
            format: 'image/png',
            transparent: true,
        }),
        'Local Government Authority Boundaries': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:local_gov_authority',
            format: 'image/png',
            transparent: true,
        }),
        'DPaW District Boundaries': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:dpaw_districts',
            format: 'image/png',
            transparent: true,
        }),
        'DPaW Region Boundaries': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:dpaw_regions',
            format: 'image/png',
            transparent: true,
        }),
        'Interim Biogeographic Regionalisation for WA': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:ibra_wa_subregions',
            format: 'image/png',
            transparent: true,
        }),
        'Remnant Vegetation': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:remnant_vegetation',
            format: 'image/png',
            transparent: true,
        }),
        'Scientific Study Sites': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:scientific_study_sites',
            format: 'image/png',
            transparent: true,
        }),
        'Road Centrelines': L.tileLayer.wms('https://kmi.dbca.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:road_centrelines',
            format: 'image/png',
            transparent: true,
        })
    };
}

export function getGeometryBoundsFromExtent(extent: GeoJSON.BBox): L.LatLngBounds {
    return L.latLngBounds(L.latLng(extent[1], extent[2]), L.latLng(extent[3], extent[0]));
}

export function getExtentFromPoint(point: GeoJSON.Point): GeoJSON.BBox {
    return JSON.parse(`[${L.latLng(point.coordinates[1], point.coordinates[0]).toBounds(DEFAULT_BOUNDS_SIZE).toBBoxString()}]`);
}
