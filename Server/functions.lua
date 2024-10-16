local DISCORD_BOT_TOKEN = ""
local GUILD_ID = ""

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
