var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var channelSchema = new Schema({
  channelName: String,
  channelPurpose: String,
  channelExists: Boolean
});
var Channel = mongoose.model('Channel', channelSchema);

mongoose.connect('mongodb://localhost/channel');

/*GET channel list*/
router.get('/api/channels', function (req, res, next) {
  Channel.find({}).exec(function(err, channels){
    if(err) throw (err);
    res.send(JSON.stringify(channels));
  })
});

router.post('/api/channels', function (req, res, next) {
  var channel = new Channel(req.body);
  channel.save(function(err){
    if(err)throw(err);
    res.sendStatus(200);
  })
});

module.exports = router;