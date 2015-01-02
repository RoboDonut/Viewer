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
    "esri/symbols/CartographicLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/graphic",
    "esri/Color",
    "dijit/ColorPalette",
    "dijit/form/DropDownButton",
    "dijit/TooltipDialog"
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
    CartographicLineSymbol,
    SimpleFillSymbol,
    Graphic,
    Color,
    DijitColorPalette,
    DijitDropDownButton,
    DijitToolTipDialog
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

//            //create the drawToolbox
//            var drawTB = new Draw(this.map);
//            drawTB.on("draw-end", addGraphic);
//
//            //dojo color picker
//            var djColorDiv = document.createElement('div');
//            djColorDiv.id="dijitColorPicker";
//            this.tool.appendChild(djColorDiv);
//            var dijitCP = new DijitColorPalette({palette: "7x10"},"dijitColorPicker")
//
//            //alpha color Input
//            var alphaValueDiv = document.createElement('div');
//            alphaValueDiv.id="alphaDiv";
//            alphaValueDiv.innerHTML="Set Transparent (0-10): ";
//            this.tool.appendChild(alphaValueDiv);
//            var space = document.createElement("span");
//            this.tool.appendChild(space);
//            //alpha input
//            var alphaInput = document.createElement('input');
//            alphaInput.id="alphaInput";
//            alphaInput.value=2;
//            alphaInput.size="1";
//            alphaValueDiv.appendChild(alphaInput);
//
//            // create buttons for point, line, polygons, and clear, and add them to the tool. this is pretty long hand
//            //point
//            var pointBtn = document.createElement("BUTTON");
//            pointBtn.id = "point";
//            pointBtn.style.width="100%";
//            pointBtn.style.height="50px";
//            pointBtn.style.fontSize="x-large";
//            var pointText = document.createTextNode("Point");
//            pointBtn.appendChild(pointText);
//            this.tool.appendChild(pointBtn);
//            //line
//            var lineBtn = document.createElement("BUTTON");
//            var lineBtnText = document.createTextNode("Line");
//            lineBtn.id ="polyline";
//            lineBtn.style.width="100%";
//            lineBtn.style.height="50px";
//            lineBtn.style.fontSize="x-large";
//            lineBtn.appendChild(lineBtnText);
//            this.tool.appendChild(lineBtn);
//            //polygon
//            var polyBtn = document.createElement("BUTTON");
//            var polyBtnText = document.createTextNode("Polygon");
//            polyBtn.id="polygon";
//            polyBtn.style.width="100%";
//            polyBtn.style.height="50px";
//            polyBtn.style.fontSize="x-large";
//            polyBtn.appendChild(polyBtnText);
//            this.tool.appendChild(polyBtn);
//            //free hand polygon
//            var freePolyBtn = document.createElement("BUTTON");
//            var freePolyBtnText = document.createTextNode("Freehand Polygon");
//            freePolyBtn.id ="FreehandPolygon";
//            freePolyBtn.style.width="100%";
//            freePolyBtn.style.height="50px";
//            freePolyBtn.style.fontSize="x-large";
//            freePolyBtn.appendChild(freePolyBtnText);
//            this.tool.appendChild(freePolyBtn);
//            //clear graphics
//            var clearBtn = document.createElement("BUTTON");
//            var clearBtnText = document.createTextNode("Clear Graphics");
//            clearBtn.id ="clearBtn";
//            clearBtn.style.width="100%";
//            clearBtn.style.height="25px";
//            clearBtn.style.fontSize="medium";
//            clearBtn.appendChild(clearBtnText);
//            this.tool.appendChild(clearBtn);
//            //adjust the luminance of the poly color for the line color
//            function ColorLuminance(hex, lum) {
//                // validate hex string
//                hex = String(hex).replace(/[^0-9a-f]/gi, '');
//                if (hex.length < 6) {
//                    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
//                }
//                lum = lum || 0;
//
//                // convert to decimal and change luminosity
//                var rgb = "#", c, i;
//                for (i = 0; i < 3; i++) {
//                    c = parseInt(hex.substr(i*2,2), 16);
//                    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
//                    rgb += ("00"+c).substr(c.length);
//                }
//
//                return rgb;
//            }
//            function lineColorToRGBA(){
//                var darker = ColorLuminance(dijitCP.value, -.2);
//                var rgb = new Color.fromHex(darker);
//                return [rgb.r,rgb.g,rgb.b]
//            }
//            //build a color r,g,b,a fill color array from fillColorPicker. would be good to change this to accept value parameters so it can be used for line colors too
//            function fillColorToRGBA(){
//                var rgb = new Color.fromHex(dijitCP.value)
//                var a = document.getElementById('alphaInput').value/10;
//                return [rgb.r,rgb.g,rgb.b,a]
//            }
//            //functions to create symbols dynamically
//            //marker
//            function createMarkerSymbol(){
//                var rgbaColor = fillColorToRGBA();
//                var lineColor = lineColorToRGBA();
//                var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
//                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
//                        new Color(lineColor), 1),
//                    new Color(rgbaColor));
//                return markerSymbol;
//            }
//            //line
//           /*//this is a cartographic line symbol to add when the ArcGIS Server print tasks can handle such things
//           new CartographicLineSymbol(
//                CartographicLineSymbol.STYLE_SOLID,
//                new Color('#'+lineColorPicker.color), 5,
//                CartographicLineSymbol.CAP_ROUND,
//                CartographicLineSymbol.JOIN_ROUND, 5)*/
//            function createLineSymbol(){
//                var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
//                    new Color(dijitCP.value), 3);
//                return lineSymbol;
//            }
//            //fill
//            function createFillSymbol(){
//                var rgbaColor = fillColorToRGBA();
//                var lineColor = lineColorToRGBA();
//                var fillSymbol = new SimpleFillSymbol(
//                    SimpleFillSymbol.STYLE_SOLID,
//                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
//                        new Color(lineColor), 3),
//                    new Color(rgbaColor)
//                );
//                return fillSymbol;
//            }
//
//            //button click event handlers for POINT, LINE, POLY, and FREEHAND POLY
//            //point
//            on(dom.byId("point"), "click", function(evt) {
//                if ( evt.target.id === "info" ) {
//                    return;
//                }
//                var tool = evt.target.id.toLowerCase();
//                map.disableMapNavigation();
//                map.setInfoWindowOnClick(false);
//                drawTB.activate(tool);
//            });
//            //polyline
//            on(dom.byId("polyline"), "click", function(evt) {
//                if ( evt.target.id === "info" ) {
//                    return;
//                }
//                var tool = evt.target.id.toLowerCase();
//                map.disableMapNavigation();
//                map.setInfoWindowOnClick(false);
//                drawTB.activate(tool);
//            });
//            //polygon
//            on(dom.byId("polygon"), "click", function(evt) {
//                if ( evt.target.id === "info" ) {
//                    return;
//                }
//                var tool = evt.target.id.toLowerCase();
//                map.disableMapNavigation();
//                map.setInfoWindowOnClick(false);
//                drawTB.activate(tool);
//            });
//            //freehand polygon
//            on(dom.byId("FreehandPolygon"), "click", function(evt) {
//                if ( evt.target.id === "info" ) {
//                    return;
//                }
//                var tool = evt.target.id.toLowerCase();
//                map.disableMapNavigation();
//                map.setInfoWindowOnClick(false);
//                drawTB.activate(tool);
//            });
//            //clear graphics
//            on(dom.byId("clearBtn"), "click", function(evt) {
//                map.graphics.clear();
//            });
//
//            //add graphic to map event handler
//            function addGraphic(evt) {
//                //deactivate the toolbar and clear existing graphics
//                drawTB.deactivate();
//                map.enableMapNavigation();
//                map.setInfoWindowOnClick(true);
//                // figure out which symbol to use
//                var symbol;
//                if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
//                    symbol = createMarkerSymbol();
//                } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
//                    symbol = createLineSymbol();
//                }
//                else {
//                   symbol= createFillSymbol();
//                }
//
//                map.graphics.add(new Graphic(evt.geometry, symbol));
//            }

            toolbar.activateTool(this.config.activeTool || toolConfig.name);
            
            deferred.resolve(true);

            return deferred.promise;
        }
    });
});
