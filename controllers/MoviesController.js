const fs = require('node:fs')
const path = require('node:path')
const movies = require('../data/movies.json')

const MoviesController = {
  // Get all movies
  allMovies: (req, res) => {
    const data = fs.readFileSync(path.join('data', 'movies.json'), 'utf8')
    const movies = JSON.parse(data)
    res.render('index', { movies, title: 'Movies' })
  },
  // Movie especific
  indexMovie: (req, res) => {
    const movie = movies.find((movie) => movie.id === req.params.id)
    res.render('../views/movie/movie.ejs', { movie, title: 'Movie ID' })
  }
}
module.exports = MoviesController
