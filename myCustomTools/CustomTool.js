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
            
            //this.tool.innerHTML = "loading new content??."
            // application map variable
            var map = app.map;

            //create the drawToolbox
            var drawTB = new Draw(this.map);
            drawTB.on("draw-end", addGraphic);

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

            //create and add the line and fill color pickers
            //line color div
            var lineColorDiv = document.createElement('div');
            lineColorDiv.id="colorDiv";
            lineColorDiv.innerHTML="Select Line Color: ";
            this.tool.appendChild(lineColorDiv)
            //line color Picker
            var lineColorPicker = document.createElement('input');
            lineColorPicker.id="lineColorPicker";
            lineColorPicker.className = "color";
            lineColorPicker.value="#F6546A";
            lineColorDiv.appendChild(lineColorPicker)
            //fill color div
            var fillColorDiv = document.createElement('div');
            fillColorDiv.id="colorDiv";
            fillColorDiv.innerHTML="Select Fill Color: ";
            this.tool.appendChild(fillColorDiv);
            //fill color Picker
            var fillColorPicker = document.createElement('input');
            fillColorPicker.id="fillColorPicker";
            fillColorPicker.className = "color";
            fillColorPicker.value ="#F6546A" ;
            fillColorDiv.appendChild(fillColorPicker);

            //functions to create symbols dynamically
            //marker
            function createMarkerSymbol(lineColorFromPicker,fillColorFromPicker){
                var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 50,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color(lineColorFromPicker), 1),
                    new Color(fillColorFromPicker,0.25));
                return markerSymbol;
            }
            //line
            function createLineSymbol(lineColorFromPicker){
                var lineSymbol = new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color(lineColorFromPicker), 10
                );
                return lineSymbol;
            }
            //fill
            function createFillSymbol(lineColorFromPicker, fillColorFromPicker){
                var fillSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color(lineColorFromPicker), 10),
                    new Color(fillColorFromPicker,.5)
                );
                return fillSymbol;
            }

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
                    symbol = createMarkerSymbol('#'+lineColorPicker.color,'#'+fillColorPicker.color);
                } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                    symbol = createLineSymbol('#'+lineColorPicker.color);
                }
                else {
                   symbol= createFillSymbol('#'+lineColorPicker.color,'#'+fillColorPicker.color);
                }

                map.graphics.add(new Graphic(evt.geometry, symbol));
            }

            toolbar.activateTool(this.config.activeTool || toolConfig.name);
            
            deferred.resolve(true);

            return deferred.promise;
        }
    });
});
