import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { geocodeAddress } from "../clients/nominatimClient.js"
import { GeocodeParams } from "../types/geocodeTypes.js"
import handleGeocodeResult from "./toolUtils.js"

const registerGeocodeTool = (server: McpServer) => {
  server.tool(
    "geocode",
    `Geocoding generates a coordinate from an address.

The search API allows to look up a location from a textual description or address. Nominatim supports structured and free-form search queries.
The search query may also contain special phrases which are translated into specific OpenStreetMap (OSM) tags (e.g. Pub => amenity=pub). This can be used to narrow down the kind of objects to be returned.
    Note: Special phrases are not suitable to query all objects of a certain type in an area. Nominatim will always just return a collection of the best matches.

Input:
- query: Free-form string to search for. In this form, the query can be unstructured. Free-form queries are processed first left-to-right and then right-to-left if that fails.
        Commas are optional, but improve performance by reducing the complexity of the search. The free-form may also contain special phrases to describe the type of place to be returned or a coordinate to search close to a position.
- format: Format of the response. One of: xml, json, jsonv2, geojson, geocodejson. Default: jsonv2
- addressdetails: When set to 1, include a breakdown of the address into elements. The exact content of the address breakdown depends on the output format.
- extratags: When set to 1, the response include any additional information in the result that is available in the Nominatim database.
- namedetails: When set to 1, include a full list of names for the result. These may include language variants, older names, references and brand.
- countrycodes: Filter that limits the search results to one or more countries. The country code must be the ISO 3166-1alpha2 code of the country.
                Each place in Nominatim is assigned to one country code based on OSM country boundaries. In rare cases a place may not be in any country at all, for example, when it is in international waters. These places are also excluded when the filter is set.
- layer: The layer filter allows to select places by themes. Comma-separated list of: address, poi, railway, natural, manmade
        address:  This layer contains all places that make up an address: address points with house numbers, streets, inhabited places (suburbs, villages, cities, states etc.) and administrative boundaries.
        poi:      The poi layer selects all point of interest. This includes classic points of interest like restaurants, shops, hotels but also less obvious features like recycling bins, guideposts or benches.
        railway:  The railway layer includes railway infrastructure like tracks. Note that in Nominatim's standard configuration, only very few railway features are imported into the database.
        natural:  The natural layer collects features like rivers, lakes and mountains while the manmade layer functions as a catch-all for features not covered by the other layers.
        manmade:
- featureType: Allows to have a more fine-grained selection for places from the address layer. Results can be restricted to places that make up the 'state', 'country' or 'city' part of an address. A featureType of settlement selects any human inhabited feature from 'state' down to 'neighbourhood'.
              When featureType is set, then results are automatically restricted to the address layer.
- polygon_geojson: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_kml: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_svg: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_text: Add the full geometry of the place to the result output. Output formats in GeoJSON, KML, SVG or WKT are supported. Only one of these options can be used at a time.
- polygon_threshold: When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry.

Output:
See https://nominatim.org/release-docs/latest/api/Output/ for the output format.
`,
    GeocodeParams,
    async (params: GeocodeParams) => {
      const result = await geocodeAddress(params)

      return handleGeocodeResult(result)
    },
  )
}

export default registerGeocodeTool
