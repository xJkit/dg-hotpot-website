const ghpages = require('gh-pages');
ghpages.publish('dist', {
  branch: 'master',
  repo: 'https://github.com/joey54780/joey54780.git',
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('push to gh-pages successfully');
  }
});