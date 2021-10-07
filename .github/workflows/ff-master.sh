#!/usr/bin/env bash
set -o verbose
set -o errexit

git checkout master

echo "Fast-forwarding master to develop"
git merge --ff-only --quiet origin/develop

echo "Pushing master"
git push origin master

