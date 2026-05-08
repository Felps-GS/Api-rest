const rateLimit = require('express-rate-limit');


    const limiter = rateLimit({
        windowMs: 60 * 1000,
        max: 5,
        message: "Muitas requisição, tente novamente. Felipe RGM 2417636"
    });


module.exports = limiter;