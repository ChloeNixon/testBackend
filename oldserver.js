//Backend file which grabs taylor swift lyrics and song titles from an online API,
//and projects them to a server accessible by the frontend.

const express = require("express");
const cors = require("cors")
const axios = require('axios').default;

//uses an online API to create a list of ten taylor swift songs
const getTaylorAPI = async () => {
    //list used to store API data
    const lyriclist = [];

    for (let i=0; i < 10; ++i) {
        //gets a song from API, adds it to the list
        const response = await axios.get("https://random-word-api.herokuapp.com/word");
        lyriclist.push(response.data);
    }
    //uncomment console log to see data within the list
    //console.log("test quote: ", lyriclist[3].quote);
    return lyriclist;
};


const app = express();
const PORT = 4000;
app.use(cors());

app.get('/songs', async (req, res) => {
    //retrieves full list of songs
    const lyrics = await getTaylorAPI();
    //sends list to server
    res.status(200).send({
        message: lyrics,
    });
});

app.listen(PORT, () => {
    console.log("app running");
});
