const Packet = require('../../packet.js');
const BufferGenerators= require('../../bufferGenerators.js');
const doubleBuffer = BufferGenerators.doubleBuffer;
const floatBuffer = BufferGenerators.floatBuffer;
const unsignedByteBuffer = BufferGenerators.unsignedByteBuffer;
const varIntBuffer = BufferGenerators.varIntBuffer;
const shortBuffer = BufferGenerators.shortBuffer;

class EntityTeleport extends Packet {
  constructor(player){
    super()
    this.packetID = 0x50
    this.x = player.position.x
    this.y = player.position.y
    this.z = player.position.z
    this.yaw = 0
    this.pitch = 0
    this.dataBuffer = Buffer.concat([
      varIntBuffer(player.eid),
      doubleBuffer(this.x),
      doubleBuffer(this.y),
      doubleBuffer(this.z),
      unsignedByteBuffer(this.yaw),
      unsignedByteBuffer(this.pitch),
      unsignedByteBuffer(0)
    ])
  }

}

module.exports = EntityTeleport
