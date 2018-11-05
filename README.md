# How to Hypermedia 🎓

[How to Hypermedia](https://howtohypermedia.semanticlink.io) is a tutorial website to learn all about how you could implement a REST-style of architecture on a TODO list! The layout and functionality is a fork of [howtographql.com](https://www.howtographql.com/) which was built by [Prisma](https://www.prisma.io) and many amazing contributors. All content on the site is completely free and open-source.

[![](howtohypermedia.png)](https://howtohypermedia.semanticlink.io)

## Content

The content for all tutorials is located in the  [`/content`](https://github.com/semanticlink/howtohypermedia/tree/master/content) directory. Here is an overview of all the tutorials that are available at the moment:

#### Hypermedia and the todo domain

- Fundamentals
- Advanced ideas

#### Frontend

- Vue over the API as a browser
- Vue as a rich user interaction

#### Backend

- C#/ASP.NET Core (for serverless)

## Contributions / Fixes

As the whole project is open-source, you're more than welcome to fix typos and other small issues yourself and create a PR for the fix. If you want to contribute a whole tutorial track, please [get in touch](mailto:hypermedia@semanticlink.io).

## Installation & Running locally

You can run a local instance by executing the following commands in a terminal:

```sh
git clone git@github.com:semanticlink/howtohypermedia.git howtohypermedia
cd howtohypermedia
yarn install
yarn start # http://localhost:4000/
```
> Note: If you are running Node 10, you might need to downgrade (ie use `nvm`)

> Note2: If you're using Node 8, you might need to invoke `npm install -g node-gyp` before you're starting the app. More info [here](https://github.com/gatsbyjs/gatsby/issues/1754).

## Build

Environment variables required for production build:

```
ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
GA_TRACKING_ID=
```

> Note: the build script will pick up either environment variables or `.env.production` variables.

## Publish

See [readme](./deployment/Readme.md).