const appConfig = require('./config/app.config');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const ts = require("gulp-typescript");
const clean = require('gulp-clean');
const path = require('path');
const tslint = require('gulp-tslint');
const runSequence = require('run-sequence');
const server = require('gulp-express');

gulp.task('default', function() {
    runSequence('build-all');
});
gulp.task('build-all', function() {
    runSequence('clean-all', 'tslint-all', 'compile-all', 'test-all');
});
gulp.task('clean-all', function() {
    return gulp.src(appConfig.ALL.dist)
        .pipe(clean({
            force: true
        }));
});
gulp.task('compile-all', function() {
    return gulp.src(appConfig.ALL.src)
        .pipe(ts({
            module: 'commonjs',
            target: 'es5'
        }))
        .pipe(gulp.dest(appConfig.ALL.dist));
});
gulp.task('tslint-all', function() {
    return gulp.src(appConfig.ALL.lint_src)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});
gulp.task('test-all', function() {
    return gulp.src(appConfig.ALL.test, {
            read: false
        })
        .pipe(mocha())
        .pipe(mocha({
            reporter: 'nyan'
        }));
});
gulp.task('watch-all', function() {
   return gulp.watch(appConfig.ALL.src, function(event) {
        runSequence('build-all');
    });
});
gulp.task('build-basic-inventory', function() {
    runSequence('clean-basic-inventory', 'tslint-basic-inventory', 'compile-basic-inventory', 'test-basic-inventory');
});
gulp.task('clean-basic-inventory', function() {
    return gulp.src(appConfig.BASIC_INVENTORY.dist)
        .pipe(clean({
            force: true
        }));
})
gulp.task('compile-basic-inventory', function() {
    return gulp.src(appConfig.BASIC_INVENTORY.src)
        .pipe(ts({
            module: 'commonjs',
            target: 'es5'
        }))
        .pipe(gulp.dest(appConfig.BASIC_INVENTORY.dist));
});
gulp.task('tslint-basic-inventory', function() {
    return gulp.src(appConfig.BASIC_INVENTORY.lint_src)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});
gulp.task('test-basic-inventory', function() {
    return gulp.src(appConfig.BASIC_INVENTORY.test, {
            read: false
        })
        .pipe(mocha())
        .pipe(mocha({
            reporter: 'nyan'
        }));
});
gulp.task('watch-basic-inventory', function() {
   return gulp.watch(appConfig.BASIC_INVENTORY.src, function(event) {
        runSequence('build-basic-inventory');
    });
});
gulp.task('run-server', function() {
    server.run(appConfig.SERVER.main);
});