define([
    "dojo/_base/declare",
    "dojo/Deferred",
    "dojo/i18n!./nls/resources",
    "dojo/on",
    "dojo/dom",
    "dojox/widget/ColorPicker",
    "esri/toolbars/draw",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/graphic",
    "esri/Color"
], function (
    declare,
    Deferred,
    i18n,
    on,
    dom,
    ColorPicker,
    Draw,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Graphic,
    Color
) {
    return declare(null,
    {
        startup: function(app,toolConfig,toolbar)
        {
            var repoBranch = "DrawTool";
            this.app = app;
            this.config = this.app.config;
            this.toolConfig = toolConfig;
            this.toolbar = toolbar;
            this.map = toolbar.map;

            var deferred = new Deferred();
            
            // Set the tooltip for the module name...
            this.config.i18n.tooltips[toolConfig.name] = i18n.toolName;
            
            this.tool = toolbar.createTool(toolConfig, "large");
            
            this.tool.innerHTML = "loading new content??."
            // application map variable
            var map = app.map;

            //create the drawToolbox
            var drawTB = new Draw(this.map);
            drawTB.on("draw-end", addGraphic);

            //create and add the color picker
            var colorPicker = new ColorPicker({}, "picker1");

            // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples
            var markerSymbol = new SimpleMarkerSymbol();
            markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
            markerSymbol.setColor(new Color("#00FFFF")
            );

            // lineSymbol used for freehand polyline, polyline and line.
            var lineSymbol = new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 10
            );

            // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
            // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
            var fillSymbol = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_DIAGONAL_CROSS,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,0,0]), 10),
                new Color('#000')
            );

            // create buttons and add them to the tool
            //point
            var pointBtn = document.createElement("BUTTON");
            pointBtn.id = "point";
            var pointText = document.createTextNode("Point");
            pointBtn.appendChild(pointText);
            this.tool.appendChild(pointBtn);
            //line
            var lineBtn = document.createElement("BUTTON");
            var lineBtnText = document.createTextNode("Line");
            lineBtn.id ="polyline"
            lineBtn.appendChild(lineBtnText);
            this.tool.appendChild(lineBtn);
            //polygon
            var polyBtn = document.createElement("BUTTON");
            var polyBtnText = document.createTextNode("Polygon");
            polyBtn.id="polygon"
            polyBtn.appendChild(polyBtnText);
            this.tool.appendChild(polyBtn);
            //free hand polygon
            var freePolyBtn = document.createElement("BUTTON");
            var freePolyBtnText = document.createTextNode("Freehand Polygon");
            freePolyBtn.id ="FreehandPolygon"
            freePolyBtn.appendChild(freePolyBtnText);
            this.tool.appendChild(freePolyBtn);

            //button click event handlers for POINT, LINE, POLY, and FREEHAND POLY
            //point
            on(dom.byId("point"), "click", function(evt) {
                if ( evt.target.id === "info" ) {
                    return;
                }
                var tool = evt.target.id.toLowerCase();
                map.disableMapNavigation();
                drawTB.activate(tool);
            });
            //polyline
            on(dom.byId("polyline"), "click", function(evt) {
                if ( evt.target.id === "info" ) {
                    return;
                }
                var tool = evt.target.id.toLowerCase();
                map.disableMapNavigation();
                drawTB.activate(tool);
            });
            //polygon
            on(dom.byId("polygon"), "click", function(evt) {
                if ( evt.target.id === "info" ) {
                    return;
                }
                var tool = evt.target.id.toLowerCase();
                map.disableMapNavigation();
                drawTB.activate(tool);
            });
            //freehand polygon
            on(dom.byId("FreehandPolygon"), "click", function(evt) {
                if ( evt.target.id === "info" ) {
                    return;
                }
                var tool = evt.target.id.toLowerCase();
                map.disableMapNavigation();
                drawTB.activate(tool);
            });


            //add graphic to map event handler
            function addGraphic(evt) {
                //deactivate the toolbar and clear existing graphics
                drawTB.deactivate();
                map.enableMapNavigation();

                // figure out which symbol to use
                var symbol;
                if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                    symbol = markerSymbol;
                } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                    symbol = lineSymbol;
                }
                else {
                    symbol = fillSymbol;
                }

                map.graphics.add(new Graphic(evt.geometry, symbol));
            }




            toolbar.activateTool(this.config.activeTool || toolConfig.name);
            
            deferred.resolve(true);

            return deferred.promise;
        }
    });
});
