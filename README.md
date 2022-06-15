Storefront Backend Project:

This is a back end project aiming to produce store web or E commerce web app using postgres, express and node js.
 
Instruction: 
-To install all packages run <npm install>
-Start the server: <npm run start>
-compile: <npm run build>
-test all files <npm run test>
-migration up/down: <npm run migrate-up>/<npm run migrate down>
-All End Points are provided in requirement.md file.

Packages:
express as server framework; npm i express and @types/express
typescript as typing language supeset of javascript; npm i -d typescript
pg; npm i pg
bcrypt to hash password; npm i bcrypt
jsonwebtoken; npm i jsonwebtoken
jasmine; npm i jasmine --save-dev
supeset; npm i superset --save-dev

Set Up The Database:
in root terminal type <psql -U postgres>
in postgres root <create database store> and <create database store_test>
you can run psql commands through migration up and test up to initiate the relations of users, orders, products and order_products tables.


Environmental Variables:
PORT = 3000
PASS_SEC = Mostes
SALTROUND= 10
JWT_SEC= Mostes
PGHOST =localhost
PGPORT =5432
PGDATABASE_DEV =store
PGDATABASE_TEST =store_test
PGUSER =postgres
PGPASSWORD =123
ENV = development
token= Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im1vc3RhZmEiLCJlbWFpbCI6Im1vc3RhZmEiLCJwYXNzd29yZCI6IiQyYiQxMCRRMkNQTE5zTWpic1NEcnA2eWx5UC8uYzQzQ1JqbzN2b3pCSmFkV2J5ZERpcS80YzRMQUVDVyJ9LCJpYXQiOjE2NTMyNjMxNTl9.-M--i2sU8Slr8Pwjj68OqWiHpxIYLQoc04WfVdA36Yk <used in testing routes as authorization header>

