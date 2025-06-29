import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { reverseGeocode } from '@/clients/nominatimClient.js'
import { handleGeocodeResult } from '@/tools/prepareResponse.js'
import {
  ReverseGeocodeParamsSchema,
  type ReverseGeocodeParams,
} from '@/types/reverseGeocodeTypes.js'

export const registerReverseGeocodeTool = (server: McpServer) => {
  server.tool(
    'reverse_geocode',
    `Reverse geocoding generates an address from a coordinate given as latitude and longitude.

This tool finds the closest suitable OpenStreetMap (OSM) object and returns its address information.
The tool uses the Nominatim API to perform the reverse geocoding and returns the address information in a JSON object.

Input:
- lat: Latitude of the coordinate in WGS84 projection.
- lon: Longitude of the coordinate in WGS84 projection.
- zoom: Level of detail required for the address.
        This is a number that corresponds roughly to the zoom level used in XYZ tile sources in frameworks like Leaflet.js, Openlayers etc.
        In terms of address details the zoom levels are as follows:
        3:	country
        5:	state
        8:	county
        10:	city
        12:	town / borough
        13:	village / suburb
        14:	neighbourhood
        15:	any settlement
        16:	major streets
        17:	major and minor streets
        18:	buildings
- format: Format of the response. One of: xml, json, jsonv2, geojson, geocodejson. Default: jsonv2
- addressdetails: When set to 1, include a breakdown of the address into elements. The exact content of the address breakdown depends on the output format.
- extratags: When set to 1, the response include any additional information in the result that is available in the Nominatim database.
- namedetails: When set to 1, include a full list of names for the result. These may include language variants, older names, references and brand.
- layer: The layer filter allows to select places by themes. Comma-separated list of: address, poi, railway, natural, manmade
        address:  The address layer contains all places that make up an address: address points with house numbers, streets, inhabited places (suburbs, villages, cities, states etc.) and administrative boundaries.
        poi:      The poi layer selects all point of interest. This includes classic points of interest like restaurants, shops, hotels but also less obvious features like recycling bins, guideposts or benches.
        railway:  The railway layer includes railway infrastructure like tracks. Note that in Nominatim's standard configuration, only very few railway features are imported into the database.
        natural:  The natural layer collects features like rivers, lakes and mountains while the manmade layer functions as a catch-all for features not covered by the other layers.
        manmade:  The manmade layer collects features that are man-made.
- polygon_geojson: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_kml: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_svg: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_text: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_threshold: When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry.

Output:
See https://nominatim.org/release-docs/latest/api/Output/ for the output format.

License:
Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright
`,
    ReverseGeocodeParamsSchema,
    async (params: ReverseGeocodeParams) => {
      const result = await reverseGeocode(params)

      return handleGeocodeResult(result)
    },
  )
}
