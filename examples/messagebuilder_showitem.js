const nbt = require('./nbt')

const version = '1.17'
const mcData = require('reinarpg-data')(version)
const { MessageBuilder } = require('reinarpg-chat')(version)
const Item = require('reinarpg-item')(version)
const item = new Item(mcData.itemsByName.cake.id, 1, null, nbt.comp({
  display: nbt.comp({
    Name: nbt.string('Sharp Axe'),
    Lore: nbt.list(
      nbt.string('The sharpest axe'),
      nbt.string('(probably)')
    )
  })
}))
item.enchants = [
  { name: 'sharpness', lvl: 5 },
  { name: 'unbreaking', lvl: 5 }
]
const msg = new MessageBuilder()
  .setText('Hello!')
  .setHoverEvent('show_item', item, 'contents')

console.log(`/tellraw @p ${msg.toString()}`)
