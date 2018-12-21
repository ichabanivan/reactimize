/* eslint-disable global-require, import/no-dynamic-require */
import gulp from 'gulp';
import replace from 'gulp-token-replace';
import rename from 'gulp-rename';

/**
 * Prepare app configuration based on environment variable]
 *
 * @param  {String} env
 *
 * @return {Object} task
 */
const environment = (env = 'development') => {
  const config = { /* default properties */ };
  // Store env path
  const ENV_FILE = env && `${env}.json`;
  // Clear cash before require a json file
  const regCache = new RegExp(ENV_FILE);
  for (const name in require.cache) {
    if (regCache.test(name)) {
      delete require.cache[name];
      break;
    }
  }
  // Path to environment file
  const envPath = `../environment/${ENV_FILE}`;

  // Merge gulp configs with environment
  Object.assign(config, {
    timestamp: (new Date()).valueOf(),
    version: require('../package.json').version,
  }, require(envPath));

  // Beautify json
  const beautifulConfig = JSON.stringify(config, null, 2);

  // eslint-disable-next-line no-console
  console.log('\nENVIRONMENT from =>', envPath, beautifulConfig, '\n');

  // Action
  return gulp
    .src('./environment/config.template.js')
    .pipe(replace({ global: { config: beautifulConfig } }))
    // eslint-disable-next-line no-param-reassign
    .pipe(rename(path => path.basename = 'app-config'))
    .pipe(gulp.dest('./src/constants'));
};

// Export gulp task
export default environment;
