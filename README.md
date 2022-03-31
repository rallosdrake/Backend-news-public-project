Please create two .env files for your project: .env.test and .env.development. Into each, add the following PGDATABASE=<database_name_here>, with the correct database name for that environment (nc_news, nc_news_test).

Link to a hosted version - https://enigmatic-tor-40960.herokuapp.com/

To clone this project, first fork it to your github then copy the clone link in the newly forked repo, the git clone this to any location you choose, then run in your terminal "npm install2 followed by "npm run setup-dbs" to set up the databases. Then finally to run the tests simply type into your terminal "npm test".

Minimum versions of packages required are:
postgresql = v12.9
node.js = v17.5.0

This project is a backend api that can filter, get, update and delete articles, users, comments and topics via interlinked reference tables built in SQL.
