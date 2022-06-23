
# NC News Back End API / PSQL database

This is back end project I completed for the Northcoders bootcamp. It connects to my React based front end application 
 and was built using node.js and node-postgress and is hosted with Heroku.

 This API intends to mimic the build of a real world back end service (such as Reddit) which can provide information to a front end architecture.
  



## Available Endpoints

Within my API you are able to make the following requests:

- GET /api
- GET /api/topics
- GET /api/articles/:article_id
- GET /api/users
- GET /api/articles
- GET /api/articles/:article_id/comments
- PATCH /api/articles/:article_id
- POST /api/articles/:article_id/comments
- DELETE /api/comments/:comment_id

## Front End Link and Hosted App

-  [Front end repo](https://github.com/rallosdrake/Frontend-nc-news).

- [Hosted API](https://extraordinary-semifreddo-268619.netlify.app/).
## Running Locally
1. `git clone` [this repo](https://github.com/rallosdrake/Backend-news-public-project)
2. `cd Backend-news-public-project`
3. Create a `.env.test` file and a `.env.development` file.
4. Add the following `PGDATABASE=<database_name_here>`, with the correct database name for that environment (nc_news, nc_news_test) forr each of the previous files.
5. run `npm install`
6. run `npm run setup-dbs`



## Tech Stack

This projects front end was built using 
- React
- Netlify
- Axios

The backend for this projects was completed using the following:

- node.JS
- node-postgres
- Supertest
 - SQL
 - Heroku

## Minimum version requirments


Minimum versions of packages required are: postgresql = v12.9 node.js = v17.5.0
