PlayerAccountManager = {}
PlayerAccountManager.__index = PlayerAccountManager

function PlayerAccountManager:new()
    local instance = {
        playerLicenses = {},  
        accountCache = {}    
    }
    setmetatable(instance, PlayerAccountManager)
    return instance
end

---@param boutiqueId number
---@param callback function
---@return boolean
function PlayerAccountManager:isValidBoutiqueId(boutiqueId, callback)
    if not boutiqueId then
        callback(false)
        return
    end

    MySQL.Async.fetchScalar('SELECT COUNT(*) FROM infinity_store_accounts WHERE id = @id', {['@id'] = boutiqueId}, function(result)
        callback(result and tonumber(result) > 0)
    end)
end


---@param license string
---@param callback function
function PlayerAccountManager:ensurePlayerAccount(license, callback)
    if not license then
        if Config.Debug then print("^1(function 'ensurePlayerAccount') The 'license' parameter is not defined^7") end
        return
    end

    if self.accountCache[license] then
        callback(true)
        return
    end

    MySQL.Async.fetchScalar('SELECT COUNT(*) FROM infinity_store_accounts WHERE license = @license', {
        ['@license'] = license
    }, function(result)
        if result and tonumber(result) > 0 then
            self.accountCache[license] = true  
            callback(true)
        else
            MySQL.insert('INSERT INTO `infinity_store_accounts` (license) VALUES (?)', {
                license
            }, function(id)
                self.accountCache[license] = true
                if Config.Debug then print(("^2(function 'createAccount') A new user with the identifier '%s' has been added to the table 'infinity_store_accounts'^7"):format(license)) end
                callback(true)
            end)
        end
    end)
end

---@param playerId number
---@return string
function PlayerAccountManager:getIdentifier(playerId)
    local identifier = GetPlayerIdentifierByType(playerId, 'license')
    return identifier and identifier:gsub('license:', '')
end

function PlayerAccountManager:onPlayerConnecting()
    AddEventHandler('playerConnecting', function()
        local _source = source
        local license = self:getIdentifier(_source)

        if not license then
            if Config.Debug then print("^1(event 'playerConnecting') The 'playerLicense' variable is not defined^7") end
            return
        end

        self:ensurePlayerAccount(license, function(isCreated)
            if isCreated then
                self.playerLicenses[_source] = nil 
            end
        end)
    end)
end

---@param boutiqueId number
---@param amount number
function PlayerAccountManager:addCoins(boutiqueId, amount)
    if not boutiqueId or not amount or amount <= 0 then
        if Config.Debug then print("^1(function 'addCoins') Invalid parameters provided^7") end
        return
    end

    self:isValidBoutiqueId(boutiqueId, function(isValid)
        if isValid then
            MySQL.Async.execute('UPDATE infinity_store_accounts SET coins = coins + @amount WHERE id = @id', {['@amount'] = amount, ['@id'] = boutiqueId}, function(rowsChanged)
                if Config.Debug then print(("^2(function 'addCoins') Added %d coins to user ID %d^7"):format(amount, boutiqueId)) end
            end)
        else
            print(("[^5Infinity^7] [^1Boutique^7] Invalid Boutique ID %d."):format(boutiqueId))
        end
    end)
end

---@param boutiqueId number
---@param amount number
function PlayerAccountManager:removeCoins(boutiqueId, amount)
    if not boutiqueId or not amount or amount <= 0 then
        if Config.Debug then print("^1(function 'addCoins') Invalid parameters provided^7") end
        return
    end

    self:isValidBoutiqueId(boutiqueId, function(isValid)
        if isValid then
            MySQL.Async.execute('UPDATE infinity_store_accounts SET coins = GREATEST(coins - @amount, 0) WHERE id = @id', {['@amount'] = amount, ['@id'] = boutiqueId }, function(rowsChanged)
                if Config.Debug then print(("^2(function 'removeCoins') Removed %d coins to user ID %d^7"):format(amount, boutiqueId)) end
            end)
        else
            print(("[^5Infinity^7] [^1Boutique^7] Invalid Boutique ID %d."):format(boutiqueId))
        end
    end)
end

---@param boutiqueId number
---@param callback function
---@return number
function PlayerAccountManager:getCoins(boutiqueId, callback)
    if not boutiqueId then
        if Config.Debug then print("^1(function 'getCoins') Invalid parameters provided^7") end
        return
    end

    self:isValidBoutiqueId(boutiqueId, function(isValid)
        if isValid then
            MySQL.Async.fetchScalar('SELECT coins FROM infinity_store_accounts WHERE id = @id', {['@id'] = boutiqueId}, function(coins)
                if coins then
                    callback(tonumber(coins))
                else
                    callback(0) 
                end
            end)
        else
            print(("[^5Infinity^7] [^1Boutique^7] Invalid Boutique ID %d."):format(boutiqueId))
        end
    end)
end