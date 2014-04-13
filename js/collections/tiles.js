define([
    "js/models/tile.js"
],
    function(Tile){
        var Tiles = Backbone.Collection.extend({
            model: Tile,
            url: "/data/tiles.json",
            initialize: function() {

            }
        });


        return Tiles;
    });
