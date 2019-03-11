function lengthPrefixedStringBuffer(str) {
    var strLengthBuffer = Buffer.alloc(1);
    strLengthBuffer[0] = str.length
    var strBuffer = Buffer.from(str)
    return Buffer.concat([strLengthBuffer, strBuffer])
}

function varIntBuffer(value) {
  var bi = new BufferIterator(Buffer.alloc(varIntSizeOf(str.length)));
  bi.writeVarInt(str.length);
  return bi.b
}

class BufferIterator {
  constructor(buffer) {
    this.b = buffer
    this.i = 0
  }

  readByte() {
    if(this.empty()){
      throw new Error("Buffer is empty")
    }
    var result = this.b[this.i]
    this.i++
    return result
  }

  writeByte(data) {
    if(this.empty()){
      throw new Error("Buffer too small")
    }
    this.b[this.i] = data
    this.i++
  }


  readVarInt() {
    var numRead = 0;
    var result = 0;
    do {
        var read = this.readByte();
        var value = (read & 0b01111111);
        result |= (value << (7 * numRead));

        numRead++;
        if (numRead > 5) {
            throw new Error("VarInt is too big");
        }
    } while ((read & 0b10000000) != 0);
    return result;
  }

  writeVarInt(value) {
    do {
        var temp = value & 0b01111111;
        value >>>= 7;
        if (value != 0) {
            temp |= 0b10000000;
        }
        this.writeByte(temp);
    } while (value != 0);
  }

  readByteArray() {
    var result = []
    while(!this.empty()){
      result.push(this.readByte());
    }
    return result
  }

  readString(len) {
    var result = []
    for(var i = 0; i < len; i++){
      result.push(this.readByte())
    }
    return Buffer.from(result).toString()
  }


  tail() {
    if(this.empty()){
      return Buffer.alloc(0)
    }
    return this.b.slice(this.i)
  }

  empty() {
    return this.i >= this.b.length
  }
}

module.exports = {
  BufferIterator: BufferIterator,
  lengthPrefixedStringBuffer: lengthPrefixedStringBuffer,
  varIntBuffer: varIntBuffer
}
