import gulp from 'gulp'; // ES6 imports!
// Tasks
import environment from './gulp/environment';

// The default task (called when you run `gulp` from cli)
gulp.task('env', () => environment(process.env.REACT_APP_ENV));

gulp.task('default', gulp.series('env'));
