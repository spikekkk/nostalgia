npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:spikekkk/nostalgia.git main

cd ../
rm -rf public