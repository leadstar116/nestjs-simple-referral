NestJS Jumpstart

## Description
The Problem
The company wants to implement a customer referral program, in order to acquire new paying customers. Here are the product requirements that we are given:
```● An existing user can create a referral to invite people, via a shareable sign-up link that contains a unique code
● When 5 people sign up using that referral, the inviter gets $10.
● When somebody signs up referencing a referral, that person gets $10 on signup.
Signups that do not reference referrals do not get any credit.
● Multiple inviters may invite the same person. Only one inviter can earn credit for a
particular user signup. An inviter only gets credit when somebody they invited signs up; they do not get credit if they invite somebody who already has an account.
```
Use cases:
```● Alice, an existing user, creates a referral. She gets a link that has a unique code in it.
She emails that link to 5 of her friends.
● Bob, one of Alice’s friends, clicks on the link. He goes through the signup process to
create a new account. Once he has created his account, he sees that he has $10 in
credit.
● Four more people follow the same process as Bob, clicking on the link Alice sent them.
They all get $10 in credit. Once the fifth person has signed up, Alice sees that she has
$10 in credit.
● Jeffrey signs up using a link that does not contain a unique referral code. After he
creates a new account, he has $0 in credit.
```

You can check live demo here: (https://nestjs-referral-staging.herokuapp.com/api)


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

Open browser and visit `localhost:8080/api`.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
