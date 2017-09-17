const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

/**
 * -- TOP LEVEL FUNCTIONS --
 * gulp.task - Define tasks
 * gulp.src -Point tofiles to use
 * gulp.dest -Point to folder to output
 * gulp.watch -Watch files and folders for changes
 */

// Log Message
gulp.task('message', function(){
    return console.log('Gulp is running...');
});

// Copy All Html files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Minify JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

// Compile Sass
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['message', 'copyHtml', 'minify', 'sass']);

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/sass/*.scss', ['sass']);
});
