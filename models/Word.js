const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
    fullWord: String,
    scrambledWord: String,
    alternatives: [
        {
            userInput: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Word', WordSchema)