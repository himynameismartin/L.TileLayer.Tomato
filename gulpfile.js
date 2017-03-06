var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
    return gulp.src('src/L.TileLayer.Tomato.js')
        .pipe(babel({
            presets: ['es2015', 'stage-3']
        }))
        .pipe(gulp.dest(''))
});

gulp.task('default', ['babel']);
