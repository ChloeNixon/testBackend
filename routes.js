const express = require('express')
const router = express.Router()
const Word = require('./models/Word')

const axios = require('axios').default;

const getWordAPI = async () => {
    const response = await axios.get("https://random-word-api.vercel.app/api?");
    return response.data
}

// get all words from dictionary
router.get('/words', async (req, res) => {
    try {
        const word = await Word.find()
        return res.status(200).json(word)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// gets one word from words
router.get('/words/:id', async(req, res) => {
    try {
        const _id = req.params.id

        const word = await Word.findOne({_id})
        if(!word){
            return res.status(404).json({})
        }else{
            return res.status(200).json(word)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one scrambled word
router.post('/words', async(req, res) => {
    try {
        const { fullWord } = await getWordAPI()
        const { scrambledWord } = fullWord
        const { alternatives } = req.body

        const word = await Word.create({
            fullWord,
            scrambledWord,
            alternatives
        })

        return res.status(201).json(word)
    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

// update one scrambled word based on user input
router.put('/words/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { fullWord, scrambledWord, alternatives } = req.body

        let word = await Word.findOne({_id})

        if(!word){
            word = await Word.create({
                fullWord,
                scrambledWord,
                alternatives
            })
            return res.status(201).json(word)
        }else{
            word.fullWord = fullWord
            word.scrambledWord = scrambledWord
            word.alternatives = alternatives
            await word.save()
            return res.status(200).json(word)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/words/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const word = await Word.deleteOne({_id})

        if(word.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// this one is just a test
router.get('/', async (req, res) => {
    const response = await getWordAPI();
    res.send(response);
})


module.exports = router