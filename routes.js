const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()
const lang = ':lang(en|cn|th)'

routes.add('/', 'index')
.add(`/${lang}`, 'index')
.add(`/${lang}/index`, 'index')
.add(`/${lang}/package`, 'package')
.add(`/${lang}/package/:id`, 'package')
.add(`/${lang}/popular-package`, 'popular-package')
