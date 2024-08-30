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
                self.playerLicenses[_source] = nil  -- Nettoyage après utilisation
            end
        end)
    end)
end
