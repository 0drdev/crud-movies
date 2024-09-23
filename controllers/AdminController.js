const AdminController = {
  index: (req, res) => {
    res.render('admin/admin', {
      title: 'Admin Dashboard',
      message: 'Bienvenido al panel de administración',
      user: req.user
    })
  }
}

module.exports = AdminController
