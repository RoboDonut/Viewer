/**
 * Created by robodonut on 9/15/2014.
 * This document represents a web map built in JSON format. It is used to circumvent this templates dependence on ArcGIS Online.
 */
var customWebmap = {};
customWebmap.item = {
    "title": "Cane Basemap",
    "snippet": "This base map represents operational layers for USSC.",
    "extent": [
        [-81.6564, 26.244],
        [-80.0539, 27.5949]
    ]
};

customWebmap.itemData = {
    "operationalLayers": [{
        "url": "http://10.6.1.68:6080/arcgis/rest/services/cane_base_simplemap/MapServer",
        "visibility": true,
        "opacity": 1,
        "title": "Cane Base Map",
        "itemId": "204d94c9b1374de9a21574c9efa31164",
        "id":"CaneBaseMap"
    }],
    "baseMap": {
        "baseMapLayers": [{
            "opacity": 1,
            "visibility": true,
            "url": "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
        }, {
            "isReference": true,
            "opacity": 1,
            "visibility": true,
            "url": "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer"
        }],
        "title": "Imagery"
    },
    "exportOptions":{
        "dpi": 300,
        "outputSize": [500,500]
    },
    "layoutOptions": {
        "titleText": "Cane Base",
        "authorText": "Print by: XYZ",
        "copyrightText": "© USSC",
        "scaleBarOptions":
        {
            "metricUnit": "kilometers" ,
            "metricLabel": "km",
            "nonMetricUnit": "miles" ,
            "nonMetricLabel": "mi"
        },
        "customTextElements":
            [
                {"townshipName" : "Town ABC"}
            ],
        "legendOptions":
        {
            "operationalLayers":
                [
                    {
                        "id": "204d94c9b1374de9a21574c9efa31164"
                    }
                ]
        }
    },
    "bookmarks":[{
        "extent": {
            "spatialReference": {
                "wkid": 102100
            },
            "xmin":-14201669,
            "ymin":4642975,
            "xmax":-13021482,
            "ymax":5278931
        },
        "name": "Northern California"
    }, {
        "extent": {
            "spatialReference": {
                "wkid":102100
            },
            "xmin":-8669334,
            "ymin":4982379,
            "xmax":-8664724,
            "ymax":4984864
        },
        "name": "Central Pennsylvania"
    }],
"version": "1.1"
};