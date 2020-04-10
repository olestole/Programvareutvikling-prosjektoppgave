# Fancyhotell AS booking system

# Skikkelig Fancy Hotell AS

[Skikkelig Fancy Hotell AS](https://fancyhotell-staging.now.sh/) is a web application that allow users to book rooms at the hotel.
It is seperated into two parts, the `frontend` and `backend`.

See [frontend](frontend/README.md) for details about the webapp.
See [backend](backend/README.md) for details about the backend.

# Deployment

The two applications are currently hosted on Heroku and Zeit now.

The deployment is configured in the gitlab ci pipleline, see [.gitlab-ci.yml](./.gitlab-ci.yml) for
details. The pipeline is separated into a couple stages: `setup`, `tests`, `build`, `review` and
`deploy`. These stages define what _jobs_ can be run concurrently.

The pipeline is setup to run jobs on a couple different conditions:

- The frontend jobs in the `setup` and `tests` stages run on merge requests, whenever any files in
  the `frontend` directory have been edited.
- Likewise, backend jobs under `setup` and `tests` run whenever any files have been edited in the
  `backend` directory in a merge request.
- The `review` stage only contains a frontend job to deploy a review app to _Zeit now_. This is
  manually triggered on a merge request, when the tests have passes.
- The `deploy` jobs will when a new commit is pushed to the `master` or `prod` branch.
  - On a push to `master`, the frontend is deployed to _zeit now_ under the staging environment.
    Meaning a new version is deployed, and the url `fancyhotell-staging.now.sh` is set to point to
    the new version. The backend is also deployed to the Heroku app `fancyhotell-staging`.
  - On a push to `prod`, the frontend is deploy to _zeit now_ with the `--prod` flag, indicating
    that it is to be deployed to production. The backend is also deployed to the heroku app
    `fancyhotell`.

> For more details, see the GitLab pipeline documentation

## Environment variables

The pipeline utilizes a couple environment variables when deploying. These are set in the GitLab
CI/CD settings page.

- `ZEIT_NOW_TOKEN`: A personal token giving access to the zeit now project.
- `API_URL`: The API url for the production environment.
- `STAGING_API_URL`: The API url for the staging environment.
- `HEROKU_API_KEY`: A personal API key for an account with access to both Heroku applications.

# License

The project incorporates the GNU license, see full disclosure under [LICENSE](./LICENSE).

> You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.

The GNU-license fits the project's need by making further development loose, but still enforcing that software built based on the project's source code is open-source.
