import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import gulpWebpack from 'webpack-stream';
import replace from 'replace-in-file';
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const tsProject = ts.createProject('tsconfig.json');

// Needed for resolving __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamic import for Webpack configuration
const loadWebpackConfig = async () => {
    const webpackConfig = await import('./webpack.config.js');
    return webpackConfig.default || webpackConfig;
};

// Task to compile TypeScript files
gulp.task('compile', () => {
    return tsProject.src()
        .pipe(sourcemaps.init())  // Initialize sourcemaps
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))  // Write sourcemaps
        .pipe(gulp.dest('dist'));  // Output directory
});

// Task to replace paths in the compiled JavaScript files
gulp.task('replace-paths', (done) => {
    const options = {
        files: 'dist/**/*.js',
        from: [
            /((import|export)\s.*from\s+['"])(\..*?)(?=['"])/g, // Matches import/export statements
            /((require\(['"])(\..*?)(?=['"]\)))/g               // Matches require statements
        ],
        to: (match, p1, p2, p3) => {
            // Check if the path already ends with '.js', if not, append '.js'
            if (!p3.endsWith('.js')) {
                return `${p1}${p3}.js`;
            }
            return match;
        },
    };

    replace(options)
        .then(results => {
            console.log('Replacement results:', results);
            done();
        })
        .catch(error => {
            console.error('Error occurred:', error);
            done(error);
        });
});

// Task to minify the JavaScript files using Webpack
gulp.task('minify', async () => {
    const webpackConfig = await loadWebpackConfig();
    return gulp.src('dist/index.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/minified'));
});

// Default task to run all the steps in sequence
gulp.task('default', gulp.series('compile', 'replace-paths', 'minify'));
