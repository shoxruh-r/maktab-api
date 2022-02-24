const News = require('../models/News')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')


exports.create = async (req, res) => {
    try {
        const { file } = req

        await sharp(file.path)
            .webp({ quality: 65 })
            .toFile(file.path + '.webp')

        fs.unlink(file.path, e => {
            if (e) throw e
        })

        req.body.image = file.filename + '.webp'

        const data = new News(req.body)
        await data.save()
        res.status(201).json({ success: true })
    } catch (e) {
        res.status(400).json({ success: false })
        console.error(e)
    }
}


exports.readAll = async (req, res) => {
    try {
        const data = await News.find({}, { title: 1, image: 1 })
        res.json({ success: true, data })
    } catch (e) {
        res.status(400).json({ success: false })
        console.error(e)
    }
}


exports.read = async (req, res) => {
    try {
        const data = await News.findById(req.params.id, { __v: 0 })
        res.json({ success: true, data })
    } catch (e) {
        res.status(400).json({ success: false })
        console.error(e)
    }
}


exports.update = async (req, res) => {
    try {
        const { file } = req

        if (file) {
            await sharp(file.path)
                .webp({ quality: 65 })
                .toFile(file.path + '.webp')

            fs.unlink(file.path, e => {
                if (e) throw e
            })

            req.body.image = file.filename + '.webp'
        }

        const { image } = await News.findByIdAndUpdate(req.params.id, req.body)

        if (file)
            fs.unlink(path.join(__dirname, '../../public/images', image), e => {
                if (e) throw e
            })

        res.json({ success: true })
    } catch (e) {
        res.status(400).json({ success: false })
        console.error(e)
    }
}


exports.delete = async (req, res) => {
    try {
        const { image } = await News.findByIdAndDelete(req.params.id)

        if (image)
            fs.unlink(path.join(__dirname, '../../public/images', image), e => {
                if (e) throw e

                res.json({ success: true })
            })
    } catch (e) {
        res.status(400).json({ success: false })
        console.error(e)
    }
}
