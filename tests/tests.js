const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); 
const expect = chai.expect;
const jwt = require("jsonwebtoken");
const config = require("../config");
const { Sequelize } = require("sequelize");

chai.use(chaiHttp);

describe("API", () => {
  before(async () => {
    try {
      const { host, port, user, password, database } = config.database;

      const sequelize = new Sequelize(database, user, password, {
        dialect: "mysql",
        define: { freezeTableName: true },
        host,
        port,
        password,
        retry: {
          match: [/Deadlock/i],
          max: 3, // Maximum rety 3 times
          backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
          backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
        },
      });

      await sequelize.sync({ force: true }); // Adjust options as needed
      console.log("Database synchronized");
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  });

  const token = jwt.sign({ sub: 1 }, config.secret, { expiresIn: "10m" });
  console.log(token, "token is getting");

  describe("POST /createUser", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "John Doe1",
        username: "john.doe3",
        password: "password123",
        role: "user",
      };

      const res = await chai.request(app).post("/createUser").send(newUser);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.have.property("message")
        .equal("User added successfully");
    });
  });

  describe("POST /login", () => {
    it("should login and return a token", async () => {
      const loginDetails = {
        username: "john.doe3",
        password: "password123",
      };

      const res = await chai.request(app).post("/login").send(loginDetails);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("token");
      expect(res.body).to.have.property("user");
      // Optionally, you can add more assertions based on your specific use case
      // For example, check that the 'user' property contains expected data
      expect(res.body.user).to.have.property("name")
    });
  });

  describe("POST /addMovie", () => {
    it("should add a new movie", async () => {
      const res = await chai
        .request(app)
        .post("/addMovie")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Inception 2",
          release_date: "2023-11-10",
          director: "Christopher Nolan",
          genre: "Sci-fi",
          trailer_url: "https://www.youtube.com",
          budget: 3200000000,
          budget_unit: "USD",
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
    });
  });

  describe("GET /getMovies", () => {
    it("should get a list of movies", async () => {
      const res = await chai
        .request(app)
        .get("/getMovies")
        .set("Authorization", `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("PUT /updateMovie/:id", () => {
    it("should update a movie", async () => {
      const movieId = 10;

      const updatedMovieData = {
        title: "Updated Movie Title",
        release_date: "2023-12-01",
        director: "New Director",
        genre: "New Genre",
        trailer_url: "https://www.example.com/trailer",
        budget: 5000000,
        budget_unit: "USD",
      };

      // Make a PUT request to update the movie
      const res = await chai
        .request(app)
        .put(`/updateMovie/${movieId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedMovieData);

      expect(res).to.have.status(200);

      expect(res.body)
        .to.have.property("message")
        .equal("Movie updated successfully");
    });
  });

  describe("PUT /deleteMovie/:id", () => {
    it("should delete a movie", async () => {
      const movieId = 10;

      const res = await chai
        .request(app)
        .delete(`/deleteMovie/${movieId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res).to.have.status(200);

      expect(res.body).to.have.property("message").equal("Movie deleted");
    });
  });

  // after(() => {
  // });
});
