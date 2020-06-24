NestJS Jumpstart

## Installation

```bash
$ yarn install
```
### Database configuration
Install postgres latest version. Copy `.env.example -> .env` and config database variables.

```bash
$ yarn migration:run
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Open browser and visit `localhost:3000/api`.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
