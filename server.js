const express = require('express');
const app = express();
app.use(RateLimiter);

app.get('/', (req, res) => {
    console.log('Server Hit')
    res.send('Hello!');
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

class RateLimiter {
    limit;
    windowMS;
    map;
    constructor(limit, windowMS) {
        this.limit = limit;
        this.windowMs = windowMS;
        this.map = new Map();
    }
}