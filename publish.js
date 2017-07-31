const ghpages = require('gh-pages');

const repoBranch = 'master';
const repoUrl = 'https://github.com/joey54780/joey54780.github.io.git';

ghpages.publish('dist', {
  branch: repoBranch,
  repo: repoUrl,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`push to: ${repoUrl} on branch ${repoBranch} successfully.`);
  }
});