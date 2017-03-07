# L.TileLayer.Tomato

a WebTorrent Map Tiles Provider for Leaflet

## Requirements

* Leaflet 1.0.0
* WebTorrent

## Demo

* seed the tiles unless there are enough other seeders [https://codepen.io/](https://codepen.io/himynameismartin/pen/ryWLeJ)
* open a map with **Tomato** `tileLayer` [https://codepen.io/](http://codepen.io/himynameismartin/pen/peNbKp)

**Disclaimer:** both tasks may take ~1min. The images you are about to share with others through WebTorrent network are CC licensed with proper attribution.

## API

```javascript
/* Z/X/Y axis, hash of the tile for given coordinates */
let data = {1:{0:{0:'fb69c6d71016baebfac1c7b1a9773be39b63fdd2'}},2:{0:{0:'acc4896f46f6265577d51a932cafd8be11739076',1:'850680b59826071728832e9d85f2a85f05e95670'},1:{0:'20bfecceb44e169ad85d69bb065ad6f22d2aedc7',1:'2472a7fdebfd1634063d5a612af0b9e4499ec7c6'}}};

/* attribution and missing options are optional */
let tomatoLayer = L.tileLayer.tomato(data, {attribution: '<strong>Tomato</strong>, a WebTorrent Map Tiles Provider, comics by <a href="https://xkcd.com/553/">https://xkcd.com/553/</a>', missing: 'URL to an image of a missing tile'});
```

## License

CC0 (except for the content of `/tiles`, which is by Randall Munroe [https://xkcd.com/553/](https://xkcd.com/553/))
