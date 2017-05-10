'use strict';

var _client = require('../dist/client');

var _client2 = _interopRequireDefault(_client);

var _models = require('../dist/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textMail = new _models2.default({
    recipientList: ['Foo Bar <foo.bar@mail.com>', 'Fulano Aquino <fulano.aquino@mail.com>', '<ciclano.norego@mail.com>'],
    messageText: 'Simple text message.',
    from: 'Beutrano <beutrano@mail.com>',
    subject: 'Just a test - Sended From Client'
});
var client = new _client2.default('2e7be7ced03535958e35', 'ca3cdba202104fd88d01');
client.send(textMail).then(function (result) {
    console.log(result);
}, function (error) {
    console.log(error);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zaW1wbGVUZXN0LmpzIl0sIm5hbWVzIjpbInRleHRNYWlsIiwicmVjaXBpZW50TGlzdCIsIm1lc3NhZ2VUZXh0IiwiZnJvbSIsInN1YmplY3QiLCJjbGllbnQiLCJzZW5kIiwidGhlbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXLHFCQUFTO0FBQ3RCQyxtQkFBZSxDQUNYLDRCQURXLEVBRVgsd0NBRlcsRUFHWCwyQkFIVyxDQURPO0FBTXRCQyxpQkFBYSxzQkFOUztBQU90QkMsVUFBTSw4QkFQZ0I7QUFRdEJDLGFBQVM7QUFSYSxDQUFULENBQWpCO0FBVUEsSUFBTUMsU0FBUyxxQkFBVyxzQkFBWCxFQUFtQyxzQkFBbkMsQ0FBZjtBQUNBQSxPQUFPQyxJQUFQLENBQVlOLFFBQVosRUFBc0JPLElBQXRCLENBQTJCLFVBQUNDLE1BQUQsRUFBWTtBQUNuQ0MsWUFBUUMsR0FBUixDQUFZRixNQUFaO0FBQ0gsQ0FGRCxFQUVHLFVBQUNHLEtBQUQsRUFBVztBQUNWRixZQUFRQyxHQUFSLENBQVlDLEtBQVo7QUFDSCxDQUpEIiwiZmlsZSI6InNpbXBsZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2xpZW50IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCBNYWlsIGZyb20gJy4vbW9kZWxzJztcblxuY29uc3QgdGV4dE1haWwgPSBuZXcgTWFpbCh7XG4gICAgcmVjaXBpZW50TGlzdDogW1xuICAgICAgICAnRm9vIEJhciA8Zm9vLmJhckBtYWlsLmNvbT4nLFxuICAgICAgICAnRnVsYW5vIEFxdWlubyA8ZnVsYW5vLmFxdWlub0BtYWlsLmNvbT4nLFxuICAgICAgICAnPGNpY2xhbm8ubm9yZWdvQG1haWwuY29tPicsXG4gICAgXSxcbiAgICBtZXNzYWdlVGV4dDogJ1NpbXBsZSB0ZXh0IG1lc3NhZ2UuJyxcbiAgICBmcm9tOiAnQmV1dHJhbm8gPGJldXRyYW5vQG1haWwuY29tPicsXG4gICAgc3ViamVjdDogJ0p1c3QgYSB0ZXN0IC0gU2VuZGVkIEZyb20gQ2xpZW50Jyxcbn0pO1xuY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCgnMmU3YmU3Y2VkMDM1MzU5NThlMzUnLCAnY2EzY2RiYTIwMjEwNGZkODhkMDEnKTtcbmNsaWVudC5zZW5kKHRleHRNYWlsKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xufSwgKGVycm9yKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xufSk7XG4iXX0=