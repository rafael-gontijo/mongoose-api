const express = require('express');
const Film = require('../models/Film')

const router = express.Router();

router.get('/', async(req, res)=> {
    const films = await Film.find();
    return res.send(films);
})

router.get('/:id', async (req,res) =>{
    const film = await Film.findById(req.params.id);
    return res.send(film);
})

router.post('/', async (req,res) =>{
    const film = new Film(req.body);
    await film.save();
    return res.send(film);
})

router.delete('/:id', async (req,res)=>{
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.send(film);
})

router.put('/:id', async (req,res) =>{
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    return res.send(film)
})

module.exports = router;