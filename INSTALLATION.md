# Geocoding MCP Desktop Extension - Installation Guide

## Overview
This guide will help you install and configure the Geocoding MCP Desktop Extension (DXT) for Claude Desktop.

## Prerequisites
- Claude Desktop application installed
- macOS, Windows, or Linux operating system
- Internet connection for geocoding API calls

## Installation Steps

### Method 1: Manual Installation (Recommended)

1. **Locate the DXT file**
   - Find the `mcp.dxt` file in your project directory
   - File size: ~44MB

2. **Install via Claude Desktop**
   - Open Claude Desktop
   - Go to Settings → Extensions
   - Click "Install Extension"
   - Select the `mcp.dxt` file
   - Follow the installation prompts

3. **Verify Installation**
   - Restart Claude Desktop
   - Check that "Geocoding MCP" appears in your extensions list
   - The extension should show as "Active"

### Method 2: Command Line Installation (Advanced)

```bash
# If you have the DXT CLI installed
dxt install mcp.dxt

# Or using bunx
bunx @anthropic-ai/dxt install mcp.dxt
```

## Configuration

No additional configuration is required. The extension uses the free Nominatim API service.

## Usage

Once installed, you can use the following tools in Claude Desktop:

### Geocode Tool
Convert addresses to coordinates:
```
Find the coordinates for "Times Square, New York"
```

### Reverse Geocode Tool
Convert coordinates to addresses:
```
What address is at coordinates 40.7580, -73.9855?
```

## Available Parameters

### Geocode Parameters
- `query` (required): Address or place name to search
- `format`: Output format (json, xml, geojson, etc.)
- `addressdetails`: Include detailed address components (0 or 1)
- `countrycodes`: Limit search to specific countries
- `limit`: Maximum number of results
- `extratags`: Include additional tags
- `namedetails`: Include name details
- `polygon_*`: Include geometry data

### Reverse Geocode Parameters
- `lat` (required): Latitude (-90 to 90)
- `lon` (required): Longitude (-180 to 180)
- `zoom`: Detail level (0-18, higher = more detailed)
- `format`: Output format
- `addressdetails`: Include detailed address components
- `extratags`: Include additional tags
- `namedetails`: Include name details

## Troubleshooting

### Extension Not Loading
1. Check that the DXT file is not corrupted
2. Restart Claude Desktop
3. Verify system compatibility
4. Check Claude Desktop logs for errors

### API Errors
1. Verify internet connection
2. Check if Nominatim service is accessible
3. Ensure query parameters are valid
4. Try simpler queries if complex ones fail

### Performance Issues
1. Reduce the number of results requested
2. Avoid requesting polygon data unless needed
3. Use appropriate zoom levels for reverse geocoding

## Data Source & License

- **Data Source**: OpenStreetMap via Nominatim API
- **License**: Data © OpenStreetMap contributors, ODbL 1.0
- **Usage Policy**: Please respect Nominatim's usage policy
- **Rate Limits**: Be mindful of API rate limits for heavy usage

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the DXT_README.md for detailed documentation
3. Verify your query format and parameters
4. Check Claude Desktop extension logs

## Uninstallation

To remove the extension:
1. Open Claude Desktop Settings
2. Go to Extensions
3. Find "Geocoding MCP" in the list
4. Click "Uninstall" or "Remove"
5. Restart Claude Desktop

## Version Information

- **Extension Version**: 1.0.0
- **DXT Version**: 0.1
- **MCP SDK Version**: Latest
- **Node.js Compatibility**: 18.x, 20.x, 22.x

---

**Note**: This extension runs locally and does not store or transmit personal data beyond the geocoding queries sent to the Nominatim API.