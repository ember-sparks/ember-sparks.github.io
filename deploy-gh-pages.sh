#!/bin/bash
set -xe

ember github-pages:commit --branch master --message "Deploy gh-pages from commit $(git rev-parse HEAD)";

# Add Symlinks:
git checkout master;
ln -s index.html 404.html;
ln -s index.html docs.html;
git add .;
git commit -m "Re-add symlinks";
git push -u origin master;
git checkout ember;

