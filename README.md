# Thesis K16 - Build system recognize Vietnamese voice
#### Trần Thanh Tịnh - 1612704
#### Trần Thị Khánh Linh - 1612339

<p align="center">
  <img src="https://cdn-images-1.medium.com/max/1200/1*feM_-VHhK670LlEQekesKg.png" width="320" alt="Logo" />
</p>
  
<p align="center">A Node.js CQRS/ES Swagger API Microservice Boilerplate</p>

## Demo

- [Web ASR ViSpeech]


[Web ASR ViSpeech]: http://asr.vietspeech.com:3200
## Description

This is an application boilerplate that demonstrates how to use Nest.js and Event Store to create a RESTful Users API microservice.

Please note that commands have been implemented and they do write into the Event Store, however, queries for denormalized views have some boilerplate but it is up to you to implement them using your favorite database technology of choice. (use MySql in my position, suggest use NoSql as Mongodb, PostgreSql)

In case you don't feel like downloading dependencies locally, I've added support for Docker so follow those instructions in "Running the app" and you'll have everything up and running in less than 2 minutes.

## Dependency Table
| Name        | Version           |
| ------------- |:-------------: |
| [EventStore](https://eventstore.org)      | latest |
| [Node.js](https://nodejs.org)      | Dubnium      |
| [TypeScript](https://www.typescriptlang.org) | 3      |
| [Docker Compose](https://docker.com) | 3      |

## Installation

<details>
<summary>With Docker</summary>

1. Install Docker ([from the Docker website](https://www.docker.com/get-started))
2. Fork and clone the ViSpeech repo ([see Contributing page](CONTRIBUTING.md))
3. From the src folder run: `docker-compose up`
4. Open a browser and navigate to http://localhost to see the application running
5. To shutdown the application run: `docker-compose down`
   </details>

<details>
<summary>With Docker and Kubernetes</summary>

1. Follow the steps to run with Docker
2. From the src directory run `docker-compose build`
3. Set the environment variables:
   ```bash
   export DOCKER_USER=localuser
   export BUILD_VERSION=0.0.0
   ```
4. Run the following command:
   ```bash
   docker stack deploy --orchestrator kubernetes --compose-file ./docker-compose.yml rtcstack
   ```
5. To see your services and pods running, run:
   ```bash
   kubectl get services
   kubectl get pods
   ```
6. Open a browser and navigate to http://localhost to see the application running

7. To shutdown / remove stack, run: `kubectl delete stack rtcstack`
   </details>
   

<details>
<summary>Without Docker (for development/debugging)</summary>

1. Fork and clone the ReactiveTraderCloud repo ([see Contributing page](CONTRIBUTING.md))

2. Install dependencies & add them to your path:

- [Node.js and npm](https://nodejs.org/en/download/)
- [Event Store](https://eventstore.com/downloads/)
- [Kafka](https://kafka.apache.org/downloads)

3. Enable Kafka

   ```bash
    tar -xzf kafka_2.12-2.5.0.tgz
    cd kafka_2.12-2.5.0
    bin/zookeeper-server-start.sh config/zookeeper.properties
    bin/kafka-server-start.sh config/server.properties
   ```

4. Populate Event Store:

   ```bash
   EventStore.ClusterNode.exe --db ./db --log ./logs
   ```

5. Start the ViSpeech server:

   ```bash
   cd src/server
   npm install
   npm run start
   ```

6. (Optional) Start Node services by running `npm run start:dev` from their respective folders, e.g.:

   ```bash
   cd src/server/node/priceHistory
   npm install
   npm run start:dev
   ```

7. Start the client against the local server components:

   ```bash
   cd src/client
   npm install
   npm run start:dev
   cd src/client/ui
   npm install
   npm run start
   ```
  </details>


## CI/CD

We practice continuous integration and deployment. Every merge to master causes a build and deployment to our [development environment](https://web-dev.adaptivecluster.com) to occur as follows:
<p align="center">
  <img src="https://topdev.vn/blog/wp-content/uploads/2019/05/jenkins.png" width="70%" alt="cicd" />
</p>

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# analyze production mode
$ yarn start:analyze

# using with Docker
$ ./scripts/up.sh # to start
$ ./scripts/down.sh # to stop
```

## Relateds Links
Medium Article (Part 1):
https://medium.com/@qasimsoomro/building-microservices-using-node-js-with-ddd-cqrs-and-event-sourcing-part-1-of-2-52e0dc3d81df

Medium Article (Part 2):
https://medium.com/@qasimsoomro/building-microservices-using-node-js-with-ddd-cqrs-and-event-sourcing-part-2-of-2-9a5f6708e0f

Swagger Explorer URL: http://localhost:7070/api

Event Store URL: http://localhost:2113

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Supported Node.js Versions

Our client libraries follow the [Node.js release schedule](https://nodejs.org/en/about/releases/).
Libraries are compatible with all current _active_ and _maintenance_ versions of
Node.js.

Client libraries targetting some end-of-life versions of Node.js are available, and
can be installed via npm [dist-tags](https://docs.npmjs.com/cli/dist-tag).
The dist-tags follow the naming convention `legacy-(version)`.

_Legacy Node.js versions are supported as a best effort:_

* Legacy versions will not be tested in continuous integration.
* Some security patches may not be able to be backported.
* Dependencies will not be kept up-to-date, and features will not be backported.

## Versioning

This library follows [Semantic Versioning](http://semver.org/).


This library is considered to be **General Availability (GA)**. This means it
is stable; the code surface will not change in backwards-incompatible ways
unless absolutely necessary (e.g. because of critical security issues) or with
an extensive deprecation period. Issues and requests against **GA** libraries
are addressed with the highest priority.
