# Movie management
This project is a movie management system that allows users to perform various actions related to movies, such as adding, updating, and deleting movies. It also provides user authentication features for creating and logging in users.

## Features

- User authentication with JWT tokens.
- Refresh token implementation
- CRUD operations for managing movies.
- For running tests used mocha, chai, chai-http jwt
- 

- database used MYSQL , sequelize, backend framework expressjs, 

- ## Getting Started

### Prerequisites
- Node.js and npm installed
- install mysql, data base details are provided in env file, and then config setup in config.js file, from 
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ameendv/KrishProjectManagementMachineTest.git

2. npm install
3. npm start to start the server
### API Endpoints
- POST /createUser: Create a new user.
- POST /login: User login.
- POST /refreshToken: Refresh authentication token.
- POST /addMovie: Add a new movie.
- GET /getMovies: Get a list of all movies.
- PUT /updateMovie/:id: Update details of a specific movie.
- DELETE /deleteMovie/:id: Delete a specific movie.

 
 
 This project is licensed under the MIT License.
