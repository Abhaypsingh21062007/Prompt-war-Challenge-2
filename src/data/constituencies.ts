export const CONSTITUENCY_GEOJSON: any = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "DL-01",
      "properties": {
        "name": "South Delhi",
        "state": "Delhi",
        "turnout": "64.2%",
        "status": "Live",
        "candidates": [
          { "name": "Aradhana Sharma", "party": "PFP" },
          { "name": "Vikram Malhotra", "party": "NPA" }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [77.10, 28.50], [77.25, 28.50], [77.25, 28.60], [77.10, 28.60], [77.10, 28.50]
        ]]
      }
    },
    {
      "type": "Feature",
      "id": "DL-02",
      "properties": {
        "name": "Chandni Chowk",
        "state": "Delhi",
        "turnout": "68.5%",
        "status": "Counting",
        "candidates": [
          { "name": "Rajesh Kumar", "party": "PFP" },
          { "name": "Sunita Gupta", "party": "JUJ" }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [77.20, 28.65], [77.30, 28.65], [77.30, 28.75], [77.20, 28.75], [77.20, 28.65]
        ]]
      }
    },
    {
      "type": "Feature",
      "id": "DL-03",
      "properties": {
        "name": "East Delhi",
        "state": "Delhi",
        "turnout": "62.8%",
        "status": "Result",
        "winner": "Manish Sisodia (AAP)",
        "candidates": [
          { "name": "Manish Sisodia", "party": "AAP" },
          { "name": "Gautam Gambhir", "party": "BJP" }
        ]
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [77.28, 28.55], [77.40, 28.55], [77.40, 28.68], [77.28, 28.68], [77.28, 28.55]
        ]]
      }
    }
  ]
};
