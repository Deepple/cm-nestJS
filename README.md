# NestJs

## Version
- node `v18.13.0`
- Postgres `v14.6`

## Installation

- Root 경로에 `.env` 파일 생성 (`.env.example` 참조)

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API

### Auth
- sign up
- login
- refresh (jwt refresh token)

### User
- users list
- get user
- modify user