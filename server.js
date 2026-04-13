const express = require('express');
const app = express();
app.use(RateLimiter);

app.get('/', (req, res) => {
    console.log('Server Hit')
    res.send('Hello!');
});

function RateLimiter(req, res, next){
    console.log('RateLimiter initialized');
    next();
}

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
