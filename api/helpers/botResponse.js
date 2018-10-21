const fetch = require('node-fetch');
const imOpenUrl = 'https://slack.com/api/im.open';
const postMessageUrl = 'https://slack.com/api/chat.postMessage';

exports.openDirectMessageChanel = (user, message, kudoId) => {
    fetch(imOpenUrl, {
        method: 'POST',
        body: JSON.stringify({ user: user }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.SLACK_TOKEN
        }
    })
        .then(res => res.json())
        .then(json => {
            sendKudoApprove(message, json.channel.id, kudoId);
        });
};

sendKudoApprove = (text, channel, kudoId) => {
    fetch(postMessageUrl, {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            channel: channel,
            attachments: [
                {
                    text: 'Do you want to approve this kudo?',
                    fallback: 'You are unable to approve kudo',
                    callback_id: 'kudo_approve',
                    color: '#3AA3E3',
                    attachment_type: 'default',
                    actions: [
                        {
                            name: 'kudo',
                            text: 'Approve',
                            type: 'button',
                            value: kudoId
                        },
                        {
                            name: 'kudo',
                            text: 'Decline',
                            type: 'button',
                            style: 'danger',
                            value: null
                        }
                    ]
                }
            ]
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.SLACK_TOKEN
        }
    });
};
