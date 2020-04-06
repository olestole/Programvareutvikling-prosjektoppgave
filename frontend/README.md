# Skikkelig Fancy Hotell

This is the front-end app for `Skikkelig Fancy Hotell`. It serves to be a user friendly way of interacting with the back-end to book hotels, edit user information etc.

**Built with**

- [Next.js](https://nextjs.org/)
- [MATERIAL-UI](https://material-ui.com/)

<img src="public/FancyHotell01.png"/>

# Table of Content

- [How to use](#how-to-use)
  - [Setup](#setup)
  - [Development](#development)
  - [Linting and checking formatting](#linting-and-checking-formatting)
  - [Apply formatting](#apply-formatting)
  - [Run tests](#run-tests)
- [Structure](#structure)
  - [Pages](#pages)
  - [Components](#components)
  - [Utilities](#utilities)
    - [API](#api)
  - [Tests](#tests)
  - [Static files](#static-files)

# How to use

## Setup

```
$ git clone ...
$ cd frontend
$ yarn
```

## Development

```
$ yarn dev
# Open http://localhost:3000
```

## Linting and checking formatting

Linted with [ESLint](https://eslint.org/)

```
$ yarn lint
```

## Apply formatting

Formatted with [Prettier](https://prettier.io/)

```
$ yarn prettier
```

## Run tests

Tests written with [Jest](https://jestjs.io/)

<!-- and makes sure the most vital parts of the application are intact. -->

```
$ yarn test
```

# Structure

The app is very modular and divided into different sections to keep it clear.

## Pages

Every page other than the root `index.js` is in its own folder within `pages` with possible subfolders.

## Components

For every page there's an equal folder in the `components`-folder in which every component used in the given page should be placed.

If a given component is used by several pages it should be placed in the `shared`-folder.

## Utilities

Utility-functions should be placed in the `utils`-folder.

### API

Every function that communicates through an API should be defined in `api.js`.

## Tests

Test are defined in `test`.

## Static files

Static files that need to be served should be placed within the `public`-folder.
