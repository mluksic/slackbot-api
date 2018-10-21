const botResponse = require('../helpers/botResponse');
const Kudo = require('../models/kudo');

const approveTexts = ['You did the right thing!', 'From ChatBot perspective you chose is correct'];
const rejectTexts = [
    "Wow I didn't expect that, but you are the boss :wink:",
    'You always do the right thing, on this one I am with you :slightly_smiling_face:'
];

exports.create = (req, res, next) => {
    const payload = req.body;
    const payloadJson = JSON.parse(payload.payload);
    const kudoId = payloadJson.actions[0].value;

    if (kudoId != null) {
        res.status(200).send(approveTexts[Math.floor(Math.random() * 2)]);
        Kudo.findOne({ _id: kudoId }, (err, kudo) => {
            kudo.set({
                approved: kudo.approved + 1
            });

            kudo.save((err, item) => console.log(err, item));
        });
    } else {
        res.status(200).send(rejectTexts[Math.floor(Math.random() * 2)]);
    }
};
