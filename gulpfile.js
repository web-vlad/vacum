const {src, dest, series, watch} = require('gulp'),
      gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel'),
      cleanCSS = require('gulp-clean-css'),
      uglify = require('gulp-uglify-es').default,
      del = require('del'),
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass'),
      svgSprite = require('gulp-svg-sprite'),
      sprite = require('gulp.spritesmith'),
      fileInclude = require('gulp-file-include'),
      sourcemaps = require('gulp-sourcemaps'),
      rev = require('gulp-rev'),
      revRewrite = require('gulp-rev-rewrite'),
      revDel = require('gulp-rev-delete-original'),
      gulpif = require('gulp-if'),
      notify = require('gulp-notify'),
      cache = require('gulp-cache'),
      imagemin = require('gulp-imagemin'),
      imgCompress  = require('imagemin-jpeg-recompress'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminZopfli = require('imagemin-zopfli'),
      { readFileSync } = require('fs'),
      concat = require('gulp-concat'),
      cssmin = require('gulp-cssmin'),
      rigger = require('gulp-rigger'),
      merge = require('merge-stream');

let isProd = false; // dev by default

const clean = () => {
	  return del(['dist/*'])
}

//svg sprite
const svgSprites = () => {
    return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg" //sprite file name
        }
      },
    }))
    //.pipe(dest('./dist/img'));
}

//sprite
const sprites = () => {
  let spriteData =
    gulp.src('./src/sprite/*.png')
    .pipe(sprite({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss',
        algorithm: 'binary-tree',
        padding: 1,
        imgPath: '../img/sprite.png',
        //cssTemplate: 'scss.template.mustache',
/*         cssVarMap: function(sprite) {
          sprites.name = 's-' + sprites.name;
        } */
    })); 

  let imgStream = spriteData.img
  // DEV: We must buffer our stream into a Buffer for `imagemin`
  //.pipe(buffer())
  //.pipe(imagemin())
      //.pipe(gulp.dest('dist/img/'));
  .pipe(gulp.dest('./dist/img'));
  let cssStream = spriteData.css
  .pipe(gulp.dest('./src/sass/'));
  return merge(imgStream, cssStream);
};

const styles = () => {
  return src('./src/sass/**/*.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    //.pipe(sass().on("error", notify.onError()))
    .pipe(sass({
      indentType: 'tab',
      indentWidth: 1,
      outputStyle: 'expanded'
  })).on('error', sass.logError)
  .pipe(autoprefixer( {
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
  }))
  .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
  .pipe(gulpif(!isProd, sourcemaps.write('.')))
  .pipe(dest('./dist/css/'))
  .pipe(browserSync.stream());
};

const libsCss = () => {
  return src('./src/css/plagins/*.css')
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream());
};

const stylesBackend = () => {
	return src('./src/sass/**/*.scss')
		.pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer({
      cascade: false,
		}))
		.pipe(dest('./dist/css/'))
};


const scripts = () => {
	src('./src/js/vendor.js')
		//.pipe(concat('vendor.js'))
    .pipe(rigger())
		.pipe(gulpif(isProd, uglify().on("error", notify.onError())))
		.pipe(dest('./dist/js/'))
  return src('./src/js/main.js')
    //src(['./src/js/global.js', './src/js/components/**.js', './src/js/main.js'])
    .pipe(rigger())
    .pipe(gulpif(!isProd, sourcemaps.init()))
		.pipe(babel({
			presets: ['@babel/env']
		}))
    //.pipe(concat('main.js'))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

const scriptsBackend = () => {
	src('./src/js/vendor/**.js')
    .pipe(concat('vendor.js'))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
		.pipe(dest('./dist/js/'))
	return src('./src/js/main.js')
    .pipe(dest('./dist/js'))
};

const fonts = () => {
  return src('./src/fonts/**')
    .pipe(dest('./dist/fonts/'))
}

const media = () => {
  return src('./src/media/**')
    .pipe(dest('./dist/media/'))
}

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./dist'))
}

const images = () => {
  return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
    './src/img/*.gif',
		'./src/img/*.svg',
		'./src/img/**/*.jpg',
		'./src/img/**/*.png',
		'./src/img/**/*.jpeg',
    './src/img/**/*.gif',
    './src/img/*.cur'
		])
    //.pipe(gulpif(isProd, imagemin([
    .pipe(cache(imagemin([
      imgCompress({
        loops: 4,
        min: 70,
        max: 80,
        quality: 'high'
    }),
    /*imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo()
        imageminGiflossy({
            optimizationLevel: 3,
            optimize: 3, 
            lossy: 80 
      }),*/
      imageminPngquant({
          /* speed: 5,
          quality: [0.4, 0.6]
          //quality: [0.6, 0.8] */
          quality: [0.4, 0.6], 
          speed: 1, 
          floyd: 1 
      }),
      imageminZopfli({
          more: true
      }),
      imagemin.svgo({
          plugins: [
              { removeViewBox: false },
              { removeUnusedNS: false },
              { removeUselessStrokeAndFill: false },
              { cleanupIDs: false },
              { removeComments: true },
              { removeEmptyAttrs: true },
              { removeEmptyText: true },
              { collapseGroups: true }
          ]
      })
    ])))
    .pipe(dest('./dist/img'))
};

const htmlInclude = () => {
  return src(['./src/pages/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });
  // synchronization OpenServer
  /* browserSync({
    proxy: "ball.loc/build",
    notify: false,
  }); */

  watch('./src/css/**/*.css', libsCss);
  watch('./src/blocks/**/*.scss', styles);
  watch('./src/sass/**/*.scss', styles);
  watch('./src/**/**/*.js', scripts);
  watch('./src/pages/*.html', htmlInclude);
  watch('./src/templates/*.html', htmlInclude);
  watch('./src/blocks/**/*.html', htmlInclude);
  watch('./src/resources/**', resources);
  watch('./src/fonts/**', fonts);
  watch('./src/media/**', media);
  watch('./src/img/*.{jpg,jpeg,png,svg,gif}', images);
	watch('./src/img/**/*.{jpg,jpeg,png,gif}', images);
  watch('./src/img/svg/**.svg', svgSprites);
  watch('./src/sprite/*.png', sprites);
}

const rewrite = () => {
  const manifest = readFileSync('dist/rev.json');
	src('dist/css/*.css')
		.pipe(revRewrite({
      manifest
    }))
		.pipe(dest('dist/css'));
  return src('dist/**/*.html')
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest('dist'));
}

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(clean, sprites, htmlInclude, scripts, styles, libsCss, resources, fonts, media, images, svgSprites, watchFiles);

exports.build = series(toProd, clean, htmlInclude, scripts, styles, libsCss, resources, fonts, media, images, svgSprites);

exports.cache = series(cache, rewrite);

exports.backend = series(toProd, clean, htmlInclude, scriptsBackend, stylesBackend, libsCss, resources, fonts, media, images, svgSprites);
