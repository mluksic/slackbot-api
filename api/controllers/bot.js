const botResponse = require('../helpers/botResponse');
const postMessageUrl = 'https://slack.com/api/chat.postMessage';

exports.connect = (req, res) => {
    res.send(req.body.challenge);
};

exports.getDataFromBot = (req, res) => {
    let payload = req.body;
    res.status(200);
};
