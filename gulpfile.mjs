import gulp from 'gulp';
import ts from 'gulp-typescript';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';
import replace from 'replace-in-file';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', () => {
    return tsProject.src()
        .pipe(sourcemaps.init())  // Initialize sourcemaps
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))  // Write sourcemaps
        .pipe(gulp.dest('dist'));  // Output directory
});

gulp.task('replace-paths', (done) => {
    const options = {
        files: 'dist/**/*.js',
        from: [
            /((import|export)\s.*from\s+['"])(\..*?)(?=['"])/g, // Matches import/export statements
            /((require\(['"])(\..*?)(?=['"]\)))/g               // Matches require statements
        ],
        to: (match, p1, p2, p3) => {
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

gulp.task('minify', () => {
    const jsFilter = filter(['**/*.js', '!**/*.d.ts'], { restore: true });

    return gulp.src('dist/**/*.js')
        .pipe(sourcemaps.init({ loadMaps: true }))  
        .pipe(jsFilter)
        .pipe(uglify()) 
        .pipe(jsFilter.restore)
        .pipe(sourcemaps.write('.')) 
        .pipe(gulp.dest('dist'));  
});

gulp.task('default', gulp.series('compile', 'replace-paths', 'minify'));
