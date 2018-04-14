# Adonis Graphql application

This is an opinionated boilerplate for creating an Graphql server with AdonisJs, based on [Adonis API boilerplate](https://github.com/adonisjs/adonis-api-app).

It comes pre-configured with:

1. Authentication
2. GraphQL Server
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Tests with Adonis vow

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --blueprint=vinicius-batista/adonis-graphql-app
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```bash
adonis migration:run
```
