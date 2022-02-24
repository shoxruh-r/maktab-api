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

        fs.unlink(file.path, e => { if (e) throw e })

        req.body.image = file.filename + '.webp'

        const success = News.save(req.body)
        res.status(201).json({ success })
    } catch (e) {
        res.status(400).json({ success: false })
    }
}


exports.readAll = async (req, res) => {
    try {
        const data = await News.find()
        console.log(data)
        res.json({ success: true, data: data })
    } catch (e) {
        res.status(400).json({ success: false })
    }
}


exports.read = async (req, res) => {
    try {
        const data = News.findById(req.params.id)
        res.json({ success: true, data })
    } catch (e) {
        res.status(400).json({ success: false })
    }
}


exports.update = async (req, res) => {
    try {
        const { file } = req

        if (file) {
            const { image } = News.findById(req.params.id)

            fs.unlink(path.join(__dirname, '../public', image), e => {
                if (e) throw e
            })

            await sharp(file.path)
                .webp({ quality: 65 })
                .toFile(file.path + '.webp')

            fs.unlink(file.path, e => { if (e) throw e })

            req.body.image = file.filename + '.webp'
        }

        const success = News.findByIdAndUpdate(req.params.id, req.body)
        res.json({ success })
    } catch (e) {
        res.status(400).json({ success: false })
    }
}


exports.delete = async (req, res) => {
    try {
        const { image } = News.findById(req.params.id)

        if (image)
            fs.unlink(path.join(__dirname, '../public', image), e => {
                if (e) throw e
            })

        const success = News.findByIdAndDelete(req.params.id)
        res.json({ success })
    } catch (e) {
        res.status(400).json({ success: false })
    }
}
