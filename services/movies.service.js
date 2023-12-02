const db = require("../_helpers/db");

module.exports = {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie
};

async function addMovie(movieDetails) {
  try {
    const movieAdd = await db.Movie.create(movieDetails);
    return movieAdd;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
}

async function getMovies(){

    try {
        return await db.Movie.findAll()

    } catch (error) {
        console.log(error)
        throw error.message
    }
}

async function updateMovie(id, updateDetails) {
  try {
    const update = await db.Movie.update(updateDetails, { where: { id } });
    return { message: `Movie updated successfully` };
  } catch (error) {
    console.log(error)
    throw error.message
  }
}

async function deleteMovie(movieId) {
  try {
    const deleteMovie = await db.Movie.destroy({ where: { id: movieId } });
    return { message: `Movie deleted` };
  } catch (error) {
    console.log(error);
    throw error.message;
  }
}