# reinarpg-chat
[![NPM version](https://img.shields.io/npm/v/reinarpg-chat.svg)](http://npmjs.com/package/reinarpg-chat)
[![Build Status](https://github.com/PrismarineJS/reinarpg-chat/workflows/CI/badge.svg)](https://github.com/PrismarineJS/reinarpg-chat/actions?query=workflow%3A%22CI%22)
[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/GsEFRM8)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-brightgreen.svg)](https://gitter.im/PrismarineJS/general)
[![Irc](https://img.shields.io/badge/chat-on%20irc-brightgreen.svg)](https://irc.gitter.im/)
[![Try it on gitpod](https://img.shields.io/badge/try-on%20gitpod-brightgreen.svg)](https://gitpod.io/#https://github.com/PrismarineJS/reinarpg-chat)

A parser for a minecraft chat message


## Usage

```js
const registry = require('reinarpg-registry')('1.16')
const ChatMessage = require('reinarpg-chat')(registry)

const msg = new ChatMessage({"text":"Example chat mesasge"})
console.log(msg.toString()) // Example chat message

```
## API

### ChatMessage(message,[displayWarning])
* `message` - Can be either text or a minecraft chat JSON object
* `displayWarning` - Display warnings if true, default to false

#### chat.toString([lang])

Flattens the message in to plain-text
 * `lang` - (optional) - Set a custom lang (defaults to registry.language)

#### chat.toMotd([lang], parent)

Converts to motd format
 * `lang` - (optional) - Set a custom lang (defaults to registry.language)
 * `parent` - Set a custom lang (defaults to mcData.language)

#### chat.getText(idx, [lang])

Returns a text part from the message
 * `idx` - Index of the part
 * `lang` - (optional) - Set a custom lang (defaults to registry.language)

#### chat.toAnsi([lang], [codes])

Converts to ansi format
 * `lang` - (optional) - Set a custom lang (defaults to registry.language)
 * `codes` - (optional) - Specify which ANSI formatting codes should be used for each Minecraft color code

#### chat.toHTML([lang], [codes], [allowedFormats])
Converts to escaped HTML
* `lang` - (optional) - Set a custom lang (defaults to registry.language)
* `codes` - (optional) - Specify which CSS style props should be used for each Minecraft color code
* `allowedFormats` - The set of allowed formats. Default is ['color', 'bold', 'strikethrough', 'underlined', 'italic']

#### chat.length()

Returns the count of text extras and child ChatMessages
Does not count recursively in to the children

#### chat.append(ChatMessage)

Appends another ChatMessage or a string

#### chat.clone()

Returns a clone of the ChatMessage

```js
const registry = require('reinarpg-registry')('1.16')
const { MessageBuilder } = require('reinarpg-chat')(registry)

const msg = new MessageBuilder().setText('Example chat mesasge')
console.log(JSON.stringify(msg)) // The string as a message component

```

#### static ChatMessage.fromNotch(msg)

Returns a reinarpg-chat representation of the message recieved from the 'chat' packet, example shown [here](examples/minecraftprotocol_fromnotch/fromnotch.js)

#### static ChatMessage.fromNetwork(messageType, messageParameters)

(1.19+) Loads a chat message sent by server that needs to be formatted on client side.

### MessageBuilder()

#### setBold (val: boolean) : this
#### setItalic (val: boolean) : this
#### setUnderlined (val: boolean) : this
#### setStrikethrough (val: boolean) : this
#### setObfuscated (val: boolean) : this
#### setColor (val: string) : this
#### setText (val: string) : this

> check code for examples (and explanations) from here on

#### setFont (val: string) : this
#### setTranslate (val: string) : this
#### setInsertion (val: string) : this
#### setKeybind (val: string) : this
#### setScore (name: string, objective: string) : this
#### setClickEvent (action: string, value: object) : this
#### setHoverEvent (action: string, data: object, type?: 'contents'|'value') : this
#### addExtra (...val: MessageBuilder | string) : this
#### addWith (...val: MessageBuilder | string) : this
#### resetFormatting () : void
sets every one of the formatting options to false and sets text to `reset` type

#### toJSON () : object
`builder.toJSON()` is the same thing as `JSON.stringify(builder)`

#### toString () : string
runs `JSON.stringify()` on `this`

#### static MessageBuilder.fromString(str, {colorSeparator = '&'}) : MessageBuilder
convert string with color codes like `&4Hello&cWorld` to a `MessageBuilder` object

### processNbtMessage

This method is internally called by fromNotch.

mcpc 1.20.3 uses NBT instead of JSON in some places to store chat, so the schema is a bit different.
`processNbtMessage` normalizes the JS object obtained from nbt derealization to the old JSON schema,
so it can be used to instantiate a ChatMessage.
