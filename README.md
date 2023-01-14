# Azazone
## _Full stack PERN online store_

This e-commerce app was created for educational purposes with the following technologies:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [PostgresSQL] - open source relational database
- [Sequelize] - a modern TypeScript and Node.js ORM 
- [React] - a JavaScript library for building user interfaces
- [Tailwind] - a utility-first CSS framework
- [MobX] - simple and scalable state management

## Features:

### Server: 

   - interect with PostresSQL via Sequelize ARM.
   - DB schema is provided
   - routes are covered with tests (jest and supertest)
   - server can upload files
   - authentification with jwt token that is confirn and refreshed on every page reload


### Client:
   - Client-side part is created with React and styled with Tailwind. 
   - Mobx is used as state manager
   - There are restricted routes for adimin use only. 
   - Admin can manage content of the website: create item cards with description and pictures
   - Paginatiion is implemented for goods representation

### Testing:
 In order to run tests, you should get JWT user token and JWT admin token and specify them in .env file as shown in the example.env. 
To register user send the post request to SERVER_URL/api/user/registration with body: 

{    "email": "anyemail@mail.ru",
    "password": 123456    }

To register admin send the post request to SERVER_URL/api/user/registration with body: 

{  "email": "anyemail@mail.ru",
    "password": 123456,
    "role": "ADMIN"   }

You will get appropriate tokens in response. They are valid for 24hours.
  
   [node.js]: <http://nodejs.org>
   [PostgresSQL]: <https://www.postgresql.org>
   [express]: <http://expressjs.com>
   [Sequelize]: <https://sequelize.org>
   [React]: <https://reactjs.org>
   [Tailwind]: <https://tailwindcss.com>
   [MobX]: <https://mobx.js.org/README.html>
