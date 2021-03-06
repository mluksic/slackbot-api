const botResponse = require('../helpers/botResponse');
const Employee = require('../models/employee');
const Kudo = require('../models/kudo');

const sendTexts = [
    'Kudo was successfully arrived at your college kudo storage.',
    "We didn't save the world, but we delivered your kudo."
];

exports.findAll = (req, res, next) => {
    Kudo.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

exports.findById = (req, res, next) => {
    const id = req.params.teamId;
    Kudo.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.create = (req, res, next) => {
    let message = req.body.text;
    const value = getKudoValue(message);
    const receivers = getReceiverUsername(message);
    const senderUsername = req.body['user_name'];

    if (receivers !== null) {
        const textToSend = tagUserInMessage(message);
        const messageForDatabase = deleteUserFromMessage(message);
        let receiverUsername = receivers.pop();
        receiverUsername = receiverUsername.substring(1);

        let promises = [];
        promises.push(findBySlackUsername(senderUsername));
        promises.push(findBySlackUsername(receiverUsername));

        Promise.all(promises).then(result => {
            let sender = result[0];
            let receiver = result[1];

            let managerPromises = [];
            managerPromises.push(findManager(sender));
            managerPromises.push(findManager(receiver));

            Promise.all(managerPromises).then(result => {
                const managerOfSender = result[0];
                const managerOfReceiver = result[1];

                console.log('yes');
                const date = Date.now();
                let kudo = new Kudo({
                    sender: sender._id,
                    receiver: receiver._id,
                    message: messageForDatabase,
                    value: value,
                    approved: 0,
                    createdAt: date
                });

                if (receiver.manager === sender.manager) {
                    kudo.approved = 1;
                    kudo.save((err, item) => {
                        if (item) {
                            console.log('yes');
                            botResponse.openDirectMessageChanel(
                                managerOfSender.slackId,
                                textToSend,
                                item._id
                            );
                        }
                    });
                } else {
                    kudo.approved = 0;
                    kudo.save((err, item) => {
                        if (item) {
                            console.log('yes');
                            botResponse.openDirectMessageChanel(
                                managerOfSender.slackId,
                                textToSend,
                                item._id
                            );
                            botResponse.openDirectMessageChanel(
                                managerOfReceiver.slackId,
                                textToSend,
                                item._id
                            );
                        }
                    });
                }
            });
        });
    }

    res.status(200).send(sendTexts[Math.floor(Math.random() * 2)]);
};

getKudoValue = message => {
    const shit = message.search(/\s(shit|:shit:|:poop:|:hankey:)$/i);
    const carrot = message.search(/\s(:carrot:)$/i);
    const yea = message.search(/\s(Fuck Yeah|:pizza:)$/i);
    const pro = message.search(/\s(Pro!|:trophy:)$/i);

    if (shit != -1) {
        message.replace(/\s(shit|:shit:|:poop:|:hankey:)$/i, '');
        return 0;
    } else if (carrot != -1) {
        message.replace(/\s(:carrot:)$/i, '');
        return 1;
    } else if (yea != -1) {
        message.replace(/\s(Fuck Yeah|:pizza:)$/i, '');
        return 2;
    } else if (pro != -1) {
        message.replace(/\s(Pro!|:trophy:)$/i, '');
        return 3;
    } else {
        return 1;
    }
};

getReceiverUsername = message => {
    const user = message.match(/@\S+/);
    return user;
};

findBySlackUsername = slackUsername => {
    return new Promise((resolve, reject) => {
        Employee.findOne({ slackUsername: slackUsername })
            .exec()
            .then(sender => {
                if (sender) {
                    resolve(sender);
                } else {
                    reject();
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
};

findManager = user => {
    return new Promise((resolve, reject) => {
        Employee.findOne({ _id: user.manager[0] })
            .exec()
            .then(manager => {
                if (manager) {
                    resolve(manager);
                } else {
                    reject();
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
};

tagUserInMessage = message => {
    const user = message.match(/@\S+/);
    const newMessage = message.replace(/@\S+/, '<' + user[0] + '>');
    return newMessage;
};

deleteUserFromMessage = message => {
    const newMessage = message.replace(/@\S+/, '');

    return newMessage.substring(1);
};
