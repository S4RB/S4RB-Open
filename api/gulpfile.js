const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const PUBLIC_FILES = ['src/public/*', 'src/public/**/*'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    gulp.src(PUBLIC_FILES)
        .pipe(gulp.dest('dist/public'));

  const tsResult = tsProject.src()
      .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});


gulp.task('default', ['watch', 'assets', 'public']);
