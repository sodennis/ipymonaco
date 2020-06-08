# ipymonaco Docs

This folder contains the documentation.

## Develop

Run from terminal:

```bash
$ yarn docs:dev
```

## Deploy

You can manually deploy as follows:

```bash
# build
npm run docs:build

git add content/.vuepress/dist
git commit -m 'deploy'

# you are deploying to https://sodennis.github.io/ipymonaco
git push -f git@github.com:sodennis/ipymonaco.git master:gh-pages
```
