# ![RealWorld Example App](logo.png)

> ### NestJS + Angular + GraphQL + Kafka + Cassandra codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://demo.realworld.io/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **NestJS** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **NestJS** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

> Describe the general architecture of your app here

# Getting started

> npm install

Run Backend Services:
> nx run-many --target=serve --projects=auth-service,conduit-gateway,profile-service,article-service --parallel=4

Run Frontend Angular Application:
> nx serve client
