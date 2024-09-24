const AdminController = {
  index: (req, res) => {
    res.render('admin/admin', {
      title: 'Admin Dashboard',
      message: 'Bienvenido al panel de administración',
      user: req.user /// / El usuario ya está disponible gracias al middleware
    })
  }
}

module.exports = AdminController
