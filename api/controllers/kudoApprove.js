const botResponse = require('../helpers/botResponse');
const Kudo = require('../models/kudo');

exports.create = (req, res, next) => {
    const payload = req.body;
    const payloadJson = JSON.parse(payload.payload);
    const kudoId = payloadJson.actions[0].value;
    console.log(payload);
    console.log(kudoId);
    res.sendStatus(200);

    if (kudoId != null) {
        Kudo.findOne({ _id: kudoId }, (err, kudo) => {
            console.log(kudo);
            console.log(kudo.approved);
            kudo.set({
                approved: kudo.approved + 1
            });
            console.log(kudo);

            console.log(kudo.approved);
            kudo.save((err, item) => console.log(err, item));
        });
    }
};
