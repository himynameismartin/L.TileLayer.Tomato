L.TileLayer.Tomato = L.TileLayer.extend({
    initialize: function(data, options) {
        this.attribution = options.attribution || '<strong>Tomato</strong>, a WebTorrent Map Tiles Provider';
        this.missing = options.missing || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAA1BMVEX///+nxBvIAAAAVElEQVR42u3BAQEAAACAkP6v7ggKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAEPAAEccgnDAAAAAElFTkSuQmCC';
        this.client = new WebTorrent();
        this.hashes = data;
        this.urls = {};
        this.promises = {};

        L.TileLayer.prototype.initialize.call(this, null, options);
    },

    getTorrentFile: function(magnet) {
        let _self = this;
        let promise = new Promise(function(resolve, reject) {
            _self.client.add(magnet, function (torrent) {
                 torrent.files.forEach(function (file) {
                     file.getBlobURL(function (err, url) {
                         if (err) reject(err);
                         resolve(url);
                     })
                 });
             });
        });

        return promise;
    },

    getTileUrl: async function(coords) {
        let hash = this.hashes[coords.z][coords.x][coords.y];

        if (!hash) {
            return false;
        }

        if (this.urls[hash]) {
            return this.urls[hash];
        }

        if (!this.promises[hash]) {
            this.promises[hash] = this.getTorrentFile(`magnet:?xt=urn:btih:${hash}&dn=tile_.png&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com`);
        }

        try {
            this.urls[hash] = await this.promises[hash];
        } catch(e) {
            this.urls[hash] = this.missing;
        }

        return this.urls[hash];
    },

    createTile: function(coords, done) {
    		let tile = document.createElement('img');

    		tile.alt = '';

    		tile.setAttribute('role', 'presentation');

        this.getTileUrl(coords).then((url) => {
            if (url) {
                tile.src = url;
            } else {
                tile.src = this.missing;
            }
        }).then(() => {
            done();
        }).catch((err) => {
            tile.src = this.missing;
            done();
        });

    		return tile;
  	},

    getAttribution: function() {
        return this.attribution;
    }
});

L.tileLayer.tomato = function(data, options) {
    return new L.TileLayer.Tomato(data, options);
}
