const PlayerDigging = require('../packets/serverbound/playerDigging.js')
const BlockChange = require('../packets/clientbound/blockChange.js')
const RelativeEntityMove = require('../packets/clientbound/RelativeEntityMove.js')
const EntityHeadMove = require('../packets/clientbound/entityHeadMove.js')

function playerDigging(connection, packet) { //shitlist
  var playerDigging = new PlayerDigging(packet)
  var blockChange = new BlockChange(playerDigging);
  return blockChange
}

function handleLocalPlayPacket(connection, packet) {
  switch(packet.packetID) {
    case 0x10:
    case 0x11:
    case 0x12:
      connection.notify(new RelativeEntityMove(connection.player))
      connection.notify(new EntityHeadMove(connection.player))
      break;
    case 0x18:
      connection.notify(playerDigging(packet))
      break;
  }
}

module.exports = handleLocalPlayPacket