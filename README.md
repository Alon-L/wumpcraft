<h1 align="center">WumpCraft</h1>
<p align="center">
  <img src="https://raw.githubusercontent.com/DayColor/wumpcraft/master/assets/header.png?token=AJBO3S5JYVPP4K4E2AW25C25D5ENU"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

## Bot
* Invite the bot to your server [here](https://discordapp.com/oauth2/authorize?client_id=592667565898334208&scope=bot&permissions=268774480)
* Join the bot test server [here](https://discord.gg/VUu7zSF)
* Visit the website for any additional information [here](https://wumpuscraft.xyz)

## About
WumpCraft was constructed exclusively for Discord Hack Week 2019 by DayColor#0001.
The bot is based on the video game [Minecraft](https://www.minecraft.net/en-us/) and essentially converts the Minecraft experience to 2D emojis canvas in Discord.
The bot does not use any external APIs besides Discord.js.
### Features
* World view with over 20 types of blocks.
* Achievements system to gain score.
* Healthbar to display your remaining health.
* Hotbar to choose all your items from.
* Movement and block placement controls.
* Hotbar block selection controls.
* Gravity, collision, and liquid physics.
* Random ores generation across the map.
* 2 different biomes.
* Random spawnpoint.
* Damage from blocks and environmental changes.
* Death system.
* Private channels for each player.
* Auto-save the worlds.
* Spectate other players while they are playing.
* Multi-server support.
And much more!

## Host
To host the bot you will need to install NodeJS 10 or higher.
1. Run the next commands:
```console
git clone https://github.com/DayColor/wumpcraft wumpcraft
cd wumpcraft
npm install
```
2. Edit ```'Your Token Goes Here'``` in app.js with your bot token.
3. Run ```npm start```

## Permissions
### General Permissions
Nested checkbox rendering would be nice (view the sourcer for this gist)
- [ ] Administrator
- [ ] View Audit Log
- [ ] Manage Server
- [x] Manage Roles
- [x] Manage Channels
- [ ] Kick Members
- [ ] Ban Members
- [ ] Create Instant Invite
- [ ] Change Nickname
- [ ] Manage Nicknames
- [ ] Manage Emojis
- [ ] Manage Webhooks
- [x] View Channels

### Text Permissions
- [x] Send Messages
- [ ] Send TTS Messages
- [x] Manage Messages
- [ ] Embed Links
- [ ] Attach Files
- [x] Read Message History
- [ ] Mention Everyone
- [x] Use External Emojis
- [x] Add Reactions

### Voice Permissions
- [ ] Connect
- [ ] Speak
- [ ] Mute Members
- [ ] Deafen Members
- [ ] Use Members
- [ ] Use Voice Activity
- [ ] Priority Speaker

## License
[MIT](LICENSE)