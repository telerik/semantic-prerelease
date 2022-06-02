# semantic-prerelease

A set of scripts for [semantic-release](https://github.com/semantic-release/semantic-release) that allow publishing of prerelease versions from branches.

This projects allows you to push prerelease package versions to NPM, hidden behind a dist-tag, and trigger deployments by fast-forwarding a release branch.

## Prerequisites

- semantic-release **6.x+**
- git **2.13+** (used for tag parsing)

This project has been tested in Travis-CI and Jenkins builds.

## Usage

1. Install the node module through the following command:

       npm install --save-dev @progress/semantic-prerelease

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
          "analyzeCommits": "@progress/semantic-prerelease/analyzeCommits",
          "generateNotes": "@progress/semantic-prerelease/generateNotes",
          "getLastRelease": "@progress/semantic-prerelease/getLastRelease",
          "verifyConditions": "@progress/semantic-prerelease/verifyConditions",
          "verifyRelease": "@progress/semantic-prerelease/verifyRelease"
        }

4. Use `semantic-prerelease publish` instead of `npm publish` in the end of your build. This publishes the prerelease versions behind dist-tags.

5. (Optionally) Publish scoped packages as public by using `semantic-prerelease publish --public`

With the above setup, new official releases (bearing the `latest` dist-tag) can be published from `master` by fast-forwarding it to `develop`:

    git checkout master && git merge --ff-only develop && git push

> Your first official release will be published with version 0.1.0 to enable automatic releases during initial development. You must mark a commit as a [major release](https://github.com/semantic-release/semantic-release#major-breaking-release) to bump the major version to 1. This is different than vanilla semantic-release where your first release is 1.0.0
