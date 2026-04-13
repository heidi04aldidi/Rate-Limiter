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
    isAllowed(userID){
        const now = Date.now();
        if (!this.map.has(userID)) {
            this.map.set(userID, {
                count: 1,
                startTime: now
            })
            return true;
    }
    const userData = this.map.get(userID)
    //Reset Window
    if (now - userData.startTime > this.windowMs) {
        userData.count = 1;
        userData.startTime = now;
        return true;
    }
    //Limit Check
    if (userData.count > this.limit){
        return false;
    }
    userData.count++;
    return true;
    }
}
