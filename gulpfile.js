var gulp 							= require('gulp');
var less							= require('gulp-less');
var livereload 				= require('gulp-livereload');
var connect 					= require('gulp-connect');
var postcss						= require('gulp-postcss');
var autoprefixer			=	require('gulp-autoprefixer');
var gutil							= require('gulp-util');
var concat 						= require('gulp-concat');
var jshint						= require('gulp-jshint');
var webstandards 			= require('gulp-webstandards');

var cssnext 					= require('postcss-cssnext');
var cssnano						= require('cssnano');
var sourcemaps				= require('gulp-sourcemaps');
var sorting						= require('postcss-sorting');
var nested 						= require('postcss-nested');
var autoprefixer 			= require('autoprefixer');

var uglify						= require('gulp-uglify');

var processors = [
    autoprefixer,
	  cssnext,
    cssnano,
    nested,
];



gulp.task('server', function(){
	connect.server({
		root: '../code/',
		livereload: true
	});
});


gulp.task('html', function(){
	gulp.src('*.html')
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src('assets/css/*.css')
		.pipe(connect.reload());
});



gulp.task('less', function(){
	var processors =[
			autoprefixer({ browser: ['last 2 version']}),
			cssnano,
			cssnext,
			sorting,

	];
	return gulp.src('assets/less/main.less')
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(gulp.dest('assets/css/'))
		.pipe(connect.reload());
});





// gulp.task('my-js', function(){
// 	gulp.src('assets/js/*.js')
// 		.pipe(uglify('all.js', {
// 			outSourceMap: true
// 		}))
// 		.pipe(gulp.dest('assets/js/'));
// });

gulp.task('webstandards', function(){
	return gulp.src('assets/**/*')
		.pipe(webstandards());
});


gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['assets/sass/main.css'] ['less']);
	gulp.watch(['assets/css/*.css'], ['css']);
	// gulp.watch(['assets/**/*'], ['webstandards'])
	// gulp.watch(['assets/js/*.js'] ['my-js']);

});

gulp.task('default', ['server','watch', 'less', 'webstandards'/*, 'my-js'*/ ]);