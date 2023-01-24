# ![RealWorld Example App](logo.png)

> ### NestJS + Angular + GraphQL + Kafka + Cassandra + Astra DB + Nx codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://demo.realworld.io/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **NestJS** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **NestJS** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works
The database is Cassandra with Astra DB, it's in cloud. So don't worry about setting up a database locally. Just follow below instructions to run the application locally.

# Getting started

We are using Kafka in this project, you can use Kafdrop to run Kafka locally. Please goto this repo https://github.com/obsidiandynamics/kafdrop and clone the Kafdrop to local.

Then we can easily start the Kafdrop docker-compose by running:

> cd docker-compose/kafka-kafdrop

> docker-compose up

This application needs Node vesion v18.12.1 (npm v8.19.2). Then run:
> npm install

Run Backend Services:
> nx run-many --target=serve --projects=auth-service,conduit-gateway,profile-service,article-service --parallel=4

Run Frontend Angular Application:
> nx serve client
