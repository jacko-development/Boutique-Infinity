RegisterCommand('givecoins', function (source, args, raw)
    local _source = source

    if _source ~= 0 then
        TriggerClientEvent('chat:addMessage', _source, { args = { "^1[Error]^7", "Cette commande est utilisable que dans la console !" } })
        return
    end

    if #args < 2 then
        print("[^5Infinity^7] [^1Boutique^7] Usage: /givecoins <boutiqueId> <amount>")
        return
    end

    local boutiqueId = tonumber(args[1])  
    local amount = tonumber(args[2])     

    if not boutiqueId or not amount or amount <= 0 then
        print("[^5Infinity^7] [^1Boutique^7] Invalid arguments. Ensure boutiqueId and amount are valid numbers and amount is greater than 0.")
        return
    end

    accountManager:addCoins(boutiqueId, amount)
end, true)

RegisterCommand('removecoins', function(source, args, rawCommand)
    local _source = source

    if _source ~= 0 then
        TriggerClientEvent('chat:addMessage', _source, { args = { "^1[Error]^7", "Cette commande est utilisable que dans la console !" } })
        return
    end

    if #args < 2 then
        print("[^5Infinity^7] [^1Boutique^7] Usage: /removecoins <boutiqueId> <amount>")
        return
    end

    local boutiqueId = tonumber(args[1])  
    local amount = tonumber(args[2])    

    if not boutiqueId or not amount or amount <= 0 then
        print("[^5Infinity^7] [^1Boutique^7] Invalid arguments. Ensure boutiqueId and amount are valid numbers and amount is greater than 0.")
        return
    end

    accountManager:removeCoins(boutiqueId, amount)
end, true) 