const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000; // You can change the port as needed

app.use(express.json());

app.use((req, res, next) => {
    // Set appropriate headers to enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/getTweet', async (req, res) => {
    try {
        const username = req.query.username;
        const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAAnjfQEAAAAAxz09uNFwhX%2BPiAPGMg0syQJkNEY%3DbD52dZiV0I5ZnT5mmgEGzWi0kGmvOpWViVwYxk6G4zcV5vMvsO'; // Replace with your actual Twitter Bearer Token
        const response = await fetch(`https://api.twitter.com/2/tweets?tweet.fields=text&user.fields=description&expansions=author_id&usernames=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
