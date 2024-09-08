local DISCORD_BOT_TOKEN = "MTE4NTU3NTQ5NDUzNjY2MzE0MQ.G-E1o_.QpeZ7Xp0BTNl7-1oCLrR0SgBnb1Zw0y7w1rTCg"
local GUILD_ID = "1164911924157366342"

function GetDiscordAvatar(userId, callback)
    local url = ("https://discord.com/api/v10/guilds/%s/members/%s"):format(GUILD_ID, userId)

    PerformHttpRequest(url, function(statusCode, response, headers)
        if statusCode == 200 then
            local data = json.decode(response)
            local avatar = data.user.avatar
            local avatarUrl = ("https://cdn.discordapp.com/avatars/%s/%s.png"):format(userId, avatar)
            callback(avatarUrl)
        else
            print("Erreur lors de la récupération de l'avatar Discord: " .. statusCode)
            callback(nil)
        end
    end, "GET", "", {
        ["Authorization"] = "Bot " .. DISCORD_BOT_TOKEN
    })
end

function GetDiscordIdentifier(source)
    local identifiers = GetPlayerIdentifiers(source)
    for _, v in pairs(identifiers) do
        if string.find(v, "discord:") then
            return v:gsub("discord:", "")
        end
    end
    return nil
end
