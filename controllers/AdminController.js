const fs = require('node:fs')
const path = require('node:path')
const movies = require('../data/movies.json')

const AdminController = {
  index: (req, res) => {
    res.render('admin/admin', {
      title: 'Admin Dashboard',
      message: 'Bienvenido al panel de administración',
      user: req.user /// / El usuario ya está disponible gracias al middleware
    })
  },
  allMovies: (req, res) => {
    const data = fs.readFileSync(path.join('data', 'movies.json'), 'utf8')
    const movies = JSON.parse(data)
    res.render('admin/admin-movies', { movies, title: 'Movies' })
  },
  createMovie: (req, res) => {
    res.render('admin/create-movie', { title: 'Crear movie' })
  },
  storeMovie: (req, res) => {
    // Verificar que los datos lleguen al servidor
    console.log('Datos recibidos:', req.body)

    // Leer las películas actuales
    const data = fs.readFileSync(
      path.join(__dirname, '../data/movies.json'),
      'utf8'
    )
    const movies = JSON.parse(data)

    // Crear una nueva película con los datos recibidos
    const newMovie = {
      id: movies.length + 1, // Generar un ID único
      title: req.body.title || 'Título desconocido', // Asignar valores por defecto si falta algún campo
      year: req.body.year || 'Año no especificado',
      director: req.body.director || 'Director no especificado',
      duration: req.body.duration || 'Duración no especificada',
      genre: req.body.genre || 'Género no especificado',
      rate: req.body.rate || '0',
      poster: req.body.poster || 'URL no especificada'
    }

    // Verificar los valores de la nueva película
    console.log('Nueva película:', newMovie)

    // Agregar la nueva película al array de movies
    movies.push(newMovie)

    // Guardar los cambios en el archivo movies.json
    fs.writeFileSync(
      path.join(__dirname, '../data/movies.json'),
      JSON.stringify(movies, null, 2),
      'utf8'
    )

    // Redirigir a la lista de películas después de crear la nueva película
    res.redirect('/admin/movies')
  },
  showEditMovie: (req, res) => {
    const movie = movies.find((movie) => movie.id === req.params.id)
    if (movie) {
      res.render('admin/edit-movie', { movies, movie, title: 'Edit movie' })
    } else {
      res.status(404).send('Movie not found')
    }
  },
  editMovie: (req, res) => {
    // Encontrar el índice de la película
    const movieIndex = movies.findIndex((movie) => movie.id === req.params.id)

    if (movieIndex !== -1) {
      // Actualizar la película con los datos recibidos
      movies[movieIndex] = {
        ...movies[movieIndex],
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        duration: req.body.duration,
        poster: req.body.poster,
        genre: req.body.genre,
        rate: req.body.rate
      }

      // Escribir los cambios en el archivo movies.json
      fs.writeFileSync(
        path.join('data', 'movies.json'),
        JSON.stringify(movies, null, 2),
        'utf8'
      )

      // Redirigir a la página de películas después de guardar los cambios
      res.redirect('/admin/movies')
    } else {
      res.status(404).send('Movie not found')
    }
  },
  deleteMovie: (req, res) => {
    // Convertir req.params.id a un número
    const movieId = Number(req.params.id)

    // Encontrar el índice de la película
    const movieIndex = movies.findIndex((movie) => movie.id === movieId)

    if (movieIndex !== -1) {
      // Eliminar la película del array de movies
      movies.splice(movieIndex, 1)

      // Escribir los cambios en el archivo movies.json
      fs.writeFileSync(
        path.join(__dirname, '../data/movies.json'),
        JSON.stringify(movies, null, 2),
        'utf8'
      )
      // Redirigir a la lista de películas después de eliminar
      return res.status(200).redirect('/admin/movies')
    } else {
      return res.status(404).send('Movie not found')
    }
  },
  allGenres: (req, res) => {
    const data = fs.readFileSync(path.join('data', 'movies.json'), 'utf8')
    const movies = JSON.parse(data)

    // Extraer todos los géneros y convertirlos en un solo array
    let allGenres = movies.flatMap((movie) => [].concat(movie.genre))

    // Eliminar duplicados
    allGenres = [...new Set(allGenres)]

    // Renderizar la vista con los géneros únicos
    res.render('admin/admin-genres', { genres: allGenres, title: 'Géneros' })
  },
  createGenre: (req, res) => {
    res.render('admin/genre-create', { title: 'Crear Genero' })
  },
  storeGenre: (req, res) => {
    const newGenre = req.body.genre // Obtiene el género desde el formulario

    // Leer los datos de las películas
    const moviesData = fs.readFileSync(path.join('data', 'movies.json'), 'utf8')
    const movies = JSON.parse(moviesData)

    // Agregar el nuevo género a cada película (o a las que consideres necesarias)
    movies.forEach((movie) => {
      if (!movie.genre.includes(newGenre)) {
        // Evita duplicados
        movie.genre.push(newGenre)
      }
    })

    // Guardar de nuevo en el archivo
    fs.writeFileSync(
      path.join('data', 'movies.json'),
      JSON.stringify(movies, null, 2)
    )

    // Redirigir a la lista de géneros
    res.redirect('/admin/genres')
  }
}

module.exports = AdminController
