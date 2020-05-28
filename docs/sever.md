# Asr VietSpeech - Server

## Overview

The server is made up of separate distributed services. They communicate with the client via a broker and can each be run in its own Docker container.

The cross-platform capability opens the door to a wide range of deployment tools and techniques such as Docker and Kubernetes. These in turn allow for consistent deployment environments and ease of management for deployed containers.

An event sourcing approach is used for persistence, with [Event Store](https://geteventstore.com/) as the backing implementation. This provides many advantages, including data resiliency and facilitates re-hydration of state.

Multiple instances of each service run concurrently for fail-over purposes. Each service instance broadcasts heartbeats, and the client is able to switch to a different instance if the connected instance is no longer reachable. Using this mechanism, load balancing strategies can also be implemented.

## Nestjs server components

[Getting Started](./setup/setup.md)
