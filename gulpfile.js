var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    webserver = require('gulp-webserver'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    run = require('run-sequence');

gulp.task('build', function (cb) {
    run('less', 'move', 'js', cb);


});

gulp.task('js', function(){
    browserify({
        entries: './src/app.js',
        extensions: ['.js'],
        debug: true
    })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function(){
    return gulp.src(['dist/*'], {read:false})
        .pipe(clean());
});

gulp.task('move', function(){
    gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));

    gulp.src(['src/modules/**/*.html'])
        .pipe(gulp.dest('dist/templates/modules'));

    gulp.src(['./data/**/*.json'])
        .pipe(gulp.dest('./dist/data'));
});

gulp.task('webserver', function() {
    gulp.src('./dist')
        .pipe(webserver({
            port: 4001,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('less', function () {
    return gulp.src('./src/css/main.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function (cb) {
    run('build', 'webserver', cb);
    gulp.watch(['./src/**/*.js', './src/**/*.less', './src/**/*.html'], ['build']);
});