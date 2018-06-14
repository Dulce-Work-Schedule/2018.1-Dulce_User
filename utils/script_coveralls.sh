#!/bin/bash
repo=$(git rev-parse --show-toplevel)
echo "COVERALLS_REPO_TOKEN=${COVERALLS_REPO_TOKEN}" > ${repo}/Environments/Test/Variables/coveralls.env && exit 0
