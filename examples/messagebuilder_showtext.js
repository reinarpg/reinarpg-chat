const version = '1.17'
const { MessageBuilder } = require('reinarpg-chat')(version)
const msg = new MessageBuilder()
  .setText('Hello!')
  .setHoverEvent('show_text', new MessageBuilder().setText('World!'))

console.log(`/tellraw @p ${msg.toString()}`)
