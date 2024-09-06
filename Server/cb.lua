ESX.RegisterServerCallback('infinity:boutique:getPlayerAccountInfoById', function(source, cb)
    local _source = source
    local playerSteamName = GetPlayerName(_source) 

    if not playerSteamName then
        print("^1Erreur : Le nom Steam du joueur est introuvable pour le joueur avec l'ID " .. tostring(_source) .. "^7")
        cb(nil)
        return
    end

    local playerLicense = accountManager:getIdentifier(_source)

    if not playerLicense then
        print("^1Erreur : Licence introuvable pour le joueur avec l'ID " .. tostring(_source) .. "^7")
        cb(nil)
        return
    end

    MySQL.Async.fetchAll('SELECT id, coins FROM infinity_store_accounts WHERE license = @license', {
        ['@license'] = playerLicense
    }, function(result)
        if result and #result > 0 then
            local boutiqueId = tonumber(result[1].id)
            local coinsNumber = tonumber(result[1].coins)

            if boutiqueId and coinsNumber then
                local playerData = {
                    steamName = playerSteamName,
                    boutiqueId = boutiqueId,
                    coinsNumber = coinsNumber
                }
                cb(playerData)
            else
                print("^1Erreur : Données invalides pour la licence " .. playerLicense .. "^7")
                cb(nil)
            end
        else
            print("^1Erreur : Aucune entrée de boutique trouvée pour la licence " .. playerLicense .. "^7")
            cb(nil)
        end
    end)
end)