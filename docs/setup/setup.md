## NB! This manual is for running backend without docker, if you don't plan to debug back-end it may be easier to follow docker route:

[Understand rtc build and deployments guide](../deployment/readme.md)

#### Install Node


#### Get External Dependencies

Grab the source, then restore the packages used by the application

```bash
$ cd ./src/services/eventStore
$ 
```

Alternatively on Windows, you can run `GetDependencies.bat` (this runs `dotnet restore` and downloads the relevant NuGet packages to your machine)

#### Install and start Event Store

If you want to persist data across sessions then you should run a local Event Store.

- [Download Event Store](https://eventstore.com/downloads/)
- Follow the [getting started instructions](https://eventstore.org/docs/getting-started/index.html?tabs=tabid-1%2Ctabid-dotnet-client%2Ctabid-dotnet-client-connect%2Ctabid-4) and run Event Store locally

Or, [use the docker image](https://hub.docker.com/r/eventstore/eventstore/).

#### Populate Event Store

Populate eventstore with the following command from the`/src/services/eventStore` directory:

```bash
$ EventStore.ClusterNode.exe --db ./db --log ./logs
```

Alternatively on Windows, you can run `Populate Event Store.bat` to add some dummy data

#### Run Broker (Kafka)


#### Start Services

To start the backend services, run the following command from the`/src/services/` directory:

```bash
$ 
```

The services should now run and connect to Kafka and Event Store.

To run each service individually, cd into each of the services

On Windows, once the stand-alone Event Store and Kafka are running, you can fire up the services by running

This calls the Launcher console application and will start all the services, the messaging broker and Event Store.

The services can also be debugged from Visual Studio like any another console app.

#### Interactive Mode

The console process started via `dotnet run dev` from the Launcher project is interactive, and can be used to bring various services up and down. This lets you investigate how the application responds to component failures. Simply type 'help' within the Launcher process.

#### Client

For the web client follow these [instructions](../client.md)

### Problem running the app?

If you find any issue running the app or anything is missing in the docs, please create [an issue on github](https://github.com/thanhtinhpas1/ViSpeech/issues)
