const BufferHelpers = require('../../buffer.js');
const BufferIterator = BufferHelpers.BufferIterator;

class Handshake {
  constructor(packet){
    var bi = new BufferIterator(Buffer.from(packet.dataBuffer))
    this.protocolVersion = bi.readVarInt()
    var serverAddrLen = bi.readVarInt()
    this.serverAddress = bi.readString(serverAddrLen)
    bi.readByte(); //Skip the port
    bi.readByte();
    this.nextState = bi.readVarInt()
  }
}

module.exports = Handshake
