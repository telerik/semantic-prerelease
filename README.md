# semantic-prerelease

A set of scripts for [semantic-release](https://github.com/semantic-release/semantic-release) that allow publishing of prerelease versions from branches.

This projects allows you to push prerelease package versions to NPM, hidden behind a dist-tag, and trigger deployments by fast-forwarding a release branch.

## Prerequisites

- semantic-release **4.x+**
- git **2.13+** (used for tag parsing)

This project has been tested in Travis-CI and Jenkins builds.

## Usage

1. Install the node module through the following command:

       npm install --save-dev @telerik/semantic-prerelease

2. Describe the branches that will publish prerelease versions.
     In this example, commits in the `develop` branch pushes prerelease versions to the `dev` dist-tag. Use `fallbackTags` to bootstrap the versions.

        // package.json
        "release": {
          "branchTags": {
            "develop": "dev"
          },
          "fallbackTags": {
            "dev": "latest"
          }
        }

3. Configure semantic-release to use the included plug-ins:

        // package.json
        "release": {
          "analyzeCommits": "@telerik/semantic-prerelease/analyzeCommits",
          "generateNotes": "@telerik/semantic-prerelease/generateNotes",
          "getLastRelease": "@telerik/semantic-prerelease/getLastRelease",
          "verifyConditions": "@telerik/semantic-prerelease/verifyConditions",
          "verifyRelease": "@telerik/semantic-prerelease/verifyRelease"
        }

4. Use `semantic-prerelease publish` instead of `npm publish` in the end of your build. This publishes the prerelease versions behind dist-tags.

With the above setup, new official releases (bearing the `latest` dist-tag) can be published from `master` by fast-forwarding it to `develop`:

    git checkout master && git merge --ff-only develop && git push
