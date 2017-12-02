var net = require('net');
var { StringDecoder } = require('string_decoder');
var eventEmitter = require('events');
var emitter = new eventEmitter();

var config = require('../../config/config.json');
var events = require('./events.json');
var socket = new net.Socket();
var decoder = new StringDecoder('utf8');

var client = this;

client.socket = socket;
client.emitter = emitter;

function Client() {
    checkConfig();

    client.server = config.irc.server;
    client.port = config.irc.port;
    client.use_tls = config.irc.use_tls;
    client.nick = config.irc.nick;
    client.username = config.irc.username;
    client.realname = config.irc.realname;
    client.channels = config.irc.channels;

    return client;
}

function connect() {
  socket.connect({host: client.server, port: client.port});
}

function checkConfig() {
  if (config.irc.server === undefined) {
    console.error(new Error('Server option missing from configuration.'));
  }
  if (config.irc.port === undefined) {
    console.error(new Error('Port option missing from configuration'));
  }
  if (config.irc.use_tls === undefined) {
    console.error(new Error('Use_tls option missing from configuration'));
  }
  if (config.irc.nick === undefined) {
    console.error(new Error('Nick option missing from configuration'));
  }
  if (config.irc.username === undefined) {
    console.error(new Error('Username option missiong from configuration'));
  }
  if (config.irc.realname === undefined) {
    console.error(new Error('Realname option missing from configuration'));
  }
}

function eventCallback(buf) {
  var data = decoder.write(buf);
  console.log(data);

  events.forEach(function(e) {
    var re = new RegExp(e.pattern);
    if (e.capture) {
      var match = re.exec(data);
      if ((match) && (match.length > 0)) {
        emitter.emit(e.event, match);
      }
    }
    else if (re.test(data)) {
      emitter.emit(e.event, data);
    }
  });
}

function send(data) {
  client.socket.write(data + '\r\n');
}
function pong(data) {
  send('PONG ' + data);
}
function join(channels) {
  send('JOIN ' + channels);
}
function privmsg(target, message) {
  send('PRIVMSG ' + target + ' :' + message);
}
function privmsgCallback(msg) {
  //do stuff?
}

//Socket event listeners
client.socket.on('connect', function() {
  send('CAP LS');
  console.log('something');
});

client.socket.on('data', eventCallback);
//


//IRC event listeners
client.emitter.on('irc_capability_list', function() {
  //todo: add capability negotiation logic

  send('CAP END');
  send('NICK ' + client.nick);
  send('USER ' + client.username + ' 0 * :' + client.realname);

});
client.emitter.on('irc_ping', function(match) {
  pong(match[1]);
});
client.emitter.on('irc_welcome', function() {
  if (client.channels != undefined) {
    join(client.channels);
  }
});
client.emitter.on('irc_privmsg', function(match) {
  if (match.length > 5) {
    var msg = {};
    msg.nick = match[1];
    msg.username = match[2];
    msg.host = match[3];
    msg.target = match[4];
    msg.message = match[5];

    privmsgCallback(msg);
  }
});
//

module.exports.Client = Client;
module.exports.connect = connect;
module.exports.send = send;
module.exports.privmsg = privmsg;
module.exports.join = join;
