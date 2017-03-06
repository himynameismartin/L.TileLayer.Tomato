'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

L.TileLayer.Tomato = L.TileLayer.extend({
    initialize: function initialize(data, options) {
        this.attribution = options.attribution || '<strong>Tomato</strong>, a WebTorrent Map Tiles Provider';
        this.missing = options.missing || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAA1BMVEX///+nxBvIAAAAVElEQVR42u3BAQEAAACAkP6v7ggKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAEPAAEccgnDAAAAAElFTkSuQmCC';
        this.client = new WebTorrent();
        this.hashes = data;
        this.urls = {};
        this.promises = {};

        L.TileLayer.prototype.initialize.call(this, null, options);
    },

    getTorrentFile: function getTorrentFile(magnet) {
        var _self = this;
        var promise = new Promise(function (resolve, reject) {
            _self.client.add(magnet, function (torrent) {
                torrent.files.forEach(function (file) {
                    file.getBlobURL(function (err, url) {
                        if (err) reject(err);
                        resolve(url);
                    });
                });
            });
        });

        return promise;
    },

    getTileUrl: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(coords) {
            var hash;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            hash = this.hashes[coords.z][coords.x][coords.y];

                            if (hash) {
                                _context.next = 3;
                                break;
                            }

                            return _context.abrupt('return', false);

                        case 3:
                            if (!this.urls[hash]) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt('return', this.urls[hash]);

                        case 5:

                            if (!this.promises[hash]) {
                                this.promises[hash] = this.getTorrentFile('magnet:?xt=urn:btih:' + hash + '&dn=tile_.png&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com');
                            }

                            _context.prev = 6;
                            _context.next = 9;
                            return this.promises[hash];

                        case 9:
                            this.urls[hash] = _context.sent;
                            _context.next = 15;
                            break;

                        case 12:
                            _context.prev = 12;
                            _context.t0 = _context['catch'](6);

                            this.urls[hash] = this.missing;

                        case 15:
                            return _context.abrupt('return', this.urls[hash]);

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[6, 12]]);
        }));

        function getTileUrl(_x) {
            return _ref.apply(this, arguments);
        }

        return getTileUrl;
    }(),

    createTile: function createTile(coords, done) {
        var _this = this;

        var tile = document.createElement('img');

        tile.alt = '';

        tile.setAttribute('role', 'presentation');

        this.getTileUrl(coords).then(function (url) {
            if (url) {
                tile.src = url;
            } else {
                tile.src = _this.missing;
            }
        }).then(function () {
            done();
        }).catch(function (err) {
            tile.src = _this.missing;
            done();
        });

        return tile;
    },

    getAttribution: function getAttribution() {
        return this.attribution;
    }
});

L.tileLayer.tomato = function (data, options) {
    return new L.TileLayer.Tomato(data, options);
};