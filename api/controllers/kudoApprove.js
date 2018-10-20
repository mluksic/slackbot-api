const botResponse = require('../helpers/botResponse');

exports.create = (req, res, next) => {
    res.status(200).json({ test: true });
    const payload = req.body;
    console.log(payload);
    const kudoId = payload.actions.value;
};
