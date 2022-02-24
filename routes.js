const router = require('express').Router()
const adminController = require('./controllers/adminController')
const infoController = require('./controllers/infoController')
const newsController = require('./controllers/newsController')
const upload = require('./middlewares/upload')
const auth = require('./middlewares/auth')


router.post('/login', adminController.read)


router.get('/info', infoController.read)
router.post('/info', auth, infoController.update)


router.post('/news', [auth, upload.single('image')], newsController.create)
router.get('/news', newsController.readAll)
router.get('/news/:id', newsController.read)
router.put('/news/:id', [auth, upload.single('image')], newsController.update)
router.delete('/news/:id', auth, newsController.delete)


module.exports = router
