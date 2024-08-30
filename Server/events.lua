RegisterNetEvent('infinity:boutique:addcoins', function (id, quantity)
    print(source)
    MySQL.update('UPDATE infinity_store_accounts SET coins = coins + ? WHERE id = ?', {quantity, id})
end)

RegisterNetEvent('infinity:boutique:removecoins', function (id, quantity)
    MySQL.update('UPDATE infinity_store_accounts SET coins = coins - ? WHERE id = ?', {quantity, id})
end)

RegisterNetEvent('infinity:boutique:getcoins', function (id)
    MySQL.scalar('SELECT `coins` FROM `infinity_store_accounts` WHERE `id` = ? LIMIT 1', {id}, function(coins)
        print(("[^5Infinity^7] [^2Boutique^7] Le compte boutique numéro ^3%s^7 possède ^3%s^7 coins"):format(id, coins))
    end)
end)