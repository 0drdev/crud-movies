const fs = require('node:fs')
const path = require('node:path')
const movies = require('../data/movies.json')

const MoviesController = {
  // Get all movies
  allMovies: (req, res) => {
    const data = fs.readFileSync(path.join('data', 'movies.json'), 'utf8')
    const movies = JSON.parse(data)
    res.render('index', { movies, title: 'Movies' })
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  },
  // Movie especific
  showMovie: (req, res) => {
    const movie = movies.find((movie) => movie.id === req.params.id)
    if (movie) {
      res.render('movie/movie', { movie, title: movie.title })
    } else {
      res.status(404).send('Movie not found')
    }
  }
}
module.exports = MoviesController
