/**
 * Created by naelelshawwa on 2014-04-12.
 */
define([
    "js/collections/Tiles.js",
    "text!templates/tiles.html"
],
    function(Tiles, TilesTemplate){
        var GameView = Backbone.View.extend({
            grid: 25,        //grid size so 9=3x3, 16=4x4 and so on
            hideTilesAfter: 5,  //seconds before hiding,
            tile1: 0,
            tile2: 0,
            initialize: function() {
                this.tiles = new Tiles();
                this.tiles.fetch();

                this.tiles.on("sync", this.renderTiles, this);

                this.render();

            },
            events: {
                "click .btn-restart"    : "renderTiles",
                "click .tile-image"     :   "clickTile"
            },
            render: function(){

            },
            clickTile: function(e){
                tileId = $(e.target).data("id");
                console.log("Tile ID", tileId);
                console.log("Tile Image", this.tiles.get(tileId).get("image").src)
                this.$el.find("[data-id="+tileId+"]").attr("src", this.tiles.get(tileId).get("image").src);

                if(this.tile1 == 0){
                    this.tile1 = tileId;
                }else if(this.tile2 == 0){
                    this.tile2 = tileId;
                }

                var delayCheckTiles = _.bind(this.checkTiles, this);
                _.delay(delayCheckTiles, 500);
            },
            checkTiles: function(){
                if(this.tile1 != 0 && this.tile2 != 0 ){
                    //are they the same picture? then keep them open
                    if(this.tile1 == this.tile2){

                    }else{

                        //hide both pictures
                        this.$el.find("[data-id="+this.tile1+"]").attr("src","/data/logo.png");
                        this.$el.find("[data-id="+this.tile2+"]").attr("src","/data/logo.png");

                        //theyre not the same, reset both
                        this.tile1 = 0;
                        this.tile2 = 0;

                    }
                }

            },
            renderTiles: function(){
                console.log("Loaded " + this.tiles.length + " tiles",this.tiles);

                var randomizedTiles = new Tiles();
                for(var i=0; i < this.grid; i++){
                    var rand = _.random(this.tiles.length);
                    var tile = this.tiles.at(rand);
                   randomizedTiles.add(tile);
                }

                var viewModel = {
                    tiles: randomizedTiles,
                    grid: this.grid,
                    timer: this.hideTilesAfter
                }
                this.$el.html(_.template(TilesTemplate, viewModel));

                var delayCountdown = _.bind(this.countDown, this);
                _.delay(delayCountdown, 1000);

                this.countUp = false;

            },
            hideTiles: function(){
                this.$el.find(".tile-image").attr("src", "/data/logo.png");
            },
            countDown: function(){
                var newTime = this.$el.find(".tile-timer").html()-1;
                this.$el.find(".tile-timer").html(newTime);

                if(newTime == 0){
                    this.hideTiles();
                    this.countUp = true;
                    var delayCountUp = _.bind(this.countUp, this);
                    _.delay(delayCountUp, 1000);
                }else{
                    var delayCountdown = _.bind(this.countDown, this);
                    _.delay(delayCountdown, 1000);
                }
            },
            countUp: function(){

                if(this.countUp){
                    var newTime = new Number(this.$el.find(".tile-timer").html())+1;
                    this.$el.find(".tile-timer").html(newTime);

                    var delayCountUp = _.bind(this.countUp, this);
                    _.delay(delayCountUp, 1000);
                }

            }
        });


        return GameView;
    });
