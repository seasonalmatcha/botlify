module.exports = [
  {
    name: 'channelCreate',
    params: 'channel'
  },
  {
    name: 'channelDelete',
    params: 'channel'
  },
  {
    name: 'channelPinsUpdate',
    params: 'channel, time'
  },
  {
    name: 'channelUpdate',
    params: 'oldChannel, newChannel'
  },
  {
    name: 'debug',
    params: 'info'
  },
  {
    name: 'emojiCreate',
    params: 'emoji'
  },
  {
    name: 'emojiDelete',
    params: 'emoji'
  },
  {
    name: 'emojiUpdate',
    params: 'oldEmoji, newEmoji'
  },
  {
    name: 'error',
    params: 'error'
  },
  {
    name: 'guildBanAdd',
    params: 'guild, user'
  },
  {
    name: 'guildBanRemove',
    params: 'guild, user'
  },
  {
    name: 'guildCreate',
    params: 'guild'
  },
  {
    name: 'guildDelete',
    params: 'guild'
  },
  {
    name: 'guildIntegrationsUpdate',
    params: 'guild'
  },
  {
    name: 'guildMemberAdd',
    params: 'member'
  },
  {
    name: 'guildMemberRemove',
    params: 'member'
  },
  {
    name: 'guildMembersChunk',
    params: 'members, guild'
  },
  {
    name: 'guildMemberSpeaking',
    params: 'member, speaking'
  },
  {
    name: 'guildMemberUpdate',
    params: 'oldMember, newMember'
  },
  {
    name: 'guildUnavailable',
    params: 'guild'
  },
  {
    name: 'guildUpdate',
    params: 'oldGuild, newGuild'
  },
  {
    name: 'invalidated',
    params: null
  },
  {
    name: 'inviteCreate',
    params: 'invite'
  },
  {
    name: 'inviteDelete',
    params: 'invite'
  },
  {
    name: 'message',
    params: 'message'
  },
  {
    name: 'messageDelete',
    params: 'message'
  },
  {
    name: 'messageDeleteBulk',
    params: 'messages'
  },
  {
    name: 'messageReactionAdd',
    params: 'messageReaction, user'
  },
  {
    name: 'messageReactionRemove',
    params: 'messageReaction, user'
  },
  {
    name: 'messageReactionRemoveAll',
    params: 'message'
  },
  {
    name: 'messageReactionRemoveEmoji',
    params: 'reaction'
  },
  {
    name: 'messageUpdate',
    params: 'oldMessage, newMessage'
  },
  {
    name: 'presenceUpdate',
    params: 'oldPresence, newPresence'
  },
  {
    name: 'rateLimit',
    params: 'rateLimitInfo'
  },
  {
    name: 'ready',
    params: null
  },
  {
    name: 'roleCreate',
    params: 'role'
  },
  {
    name: 'roleDelete',
    params: 'role'
  },
  {
    name: 'roleUpdate',
    params: 'oldRole, newRole'
  },
  {
    name: 'shardDisconnect',
    params: 'event, id'
  },
  {
    name: 'shardError',
    params: 'error, shardID'
  },
  {
    name: 'shardReady',
    params: 'id, unavailableGuilds'
  },
  {
    name: 'shardReconnecting',
    params: 'id'
  },
  {
    name: 'shardResume',
    params: 'id'
  },
  {
    name: 'typingStart',
    params: 'channel, user'
  },
  {
    name: 'userUpdate',
    params: 'oldUser, newUser'
  },
  {
    name: 'voiceStateUpdate',
    params: 'oldState, newState'
  },
  {
    name: 'warn',
    params: 'info'
  },
  {
    name: 'webhookUpdate',
    params: 'channel'
  },
]