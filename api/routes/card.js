const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /card'
    })
})

router.post('/', (req, res, next) => {
    const card = {
        contents: req.body.contents
    }
    res.status(200).json({
        message: 'Handling POST request to /card',
        card: card
    })
})

router.get('/:cardId', (req, res, next) => {
    const id = req.params.cardId;
    res.status(200).json({
        method: 'GET',
        id: id
    })
})

router.patch('/:cardId', (req, res, next) => {
    const id = req.params.cardId;
    res.status(200).json({
        method: 'PATCH',
        id: id
    })
})

router.delete('/:cardId', (req, res, next) => {
    const id = req.params.cardId;
    res.status(200).json({
        method: 'DELETE',
        id: id
    })
})

module.exports = router;