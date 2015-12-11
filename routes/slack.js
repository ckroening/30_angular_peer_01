var express = require('express');
var router = express.Router();

var SlackClient = require('slack-client');

var slack = new SlackClient("xoxp-16385354321-16386118930-16380419524-c79633d7f9", true, true);
slack.login(function() {

});

/*GET channel list*/
router.get('/api/slack/channels', function (req, res) {
  console.log()
  var channels = [];
  for (var key in slack.channels) {
    channels.push(slack.channels[key].name)
  }
  res.send(channels);
});

router.post('/api/slack/channels', function (req, res, next) {
  slack._apiCall('channels.create', { name: req.body.channelName }, function(channelObj) {
    if(channelObj.error) {
      res.sendStatus(500);
    } else {
      slack._apiCall('channels.setPurpose', {
        channel: channelObj.channel.id,
        purpose: req.body.channelPurpose
      }, function() {
        res.sendStatus(200);
      });
    }
  });
});

module.exports = router;