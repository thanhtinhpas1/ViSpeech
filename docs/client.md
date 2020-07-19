# VietSpeech - UI

The trading client GUI is a single page app (SPA) built using Typescript, React, Redux and Styled components. It can run as a desktop application using Openfin, in the browser, or on mobile as a PWA.

## High level technologies

- HTML5, Typescript, Redux and React
- Tests use [Jest](https://jestjs.io/)
- Streaming data abstractions are build with [RxJs](https://github.com/Reactive-Extensions/RxJS).
- GUI state management is done with [redux](https://redux.js.org/).
- Connectivity to the backend is done via [AutobahnJs](https://github.com/crossbario/autobahn-js).
- Styles build using [Styled Components](https://www.styled-components.com/).

## Machine Setup

Please ensure you have [Node](https://nodejs.org)(>=v10), [npm](https://github.com/npm/npm)(>=v5) and [Git](https://git-scm.com/downloads) installed on your machine and on your path.

### Mac

There are no additional packages to install other than Git and a recent build of Node.

### Linux

You might want to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Windows

## RT Enviroments

We deploy ViSpeech to three enviroments:

## Starting the GUI

Clone the repo and install the necessary node modules:

```sh
npm install  # Install Node modules listed in ./package.json
npm start    # Compile and launch the webpack dev server. By default, the client connects to the dev environment.
```

You can then browse the app at [http://localhost:3000](http://localhost:3000)

### Additional command line options

Run the client with pointing to your local backend server:

```sh
npm run start
```

Run the client with a back end on the cloud:

```sh
npm run start

# or

npm run start
```

Runs unit tests with Jest.

```sh
npm run test
```

Create a production version of the application in the dist folder

```sh
npm run build

# You can also build versions for particular enviroment
npm run build:demo-backend
npm run build:dev-backend

```

## Openfin

Starts the application in Openfin pointing to an enviroment

```sh
npm start:openfin:demo-backend
npm start:openfin:dev-backend
```
