---@param license string
---@return boolean
function isPlayerAccountCreated(license, callback)
    if license == nil then if Configs.Debug then print("^1(function 'isPlayerAccountCreated') The 'license' parameter is not defined^7") end return end

    MySQL.Async.fetchScalar('SELECT COUNT(*) FROM infinity_store_accounts WHERE license = @license', {
        ['@license'] = license
    }, function(result)
        if result and tonumber(result) > 0 then
            callback(true)
        else
            callback(false)
        end
    end)
end

---@param license string
function createAccount(license)
    if license == nil then if Configs.Debug then print("^1(function 'createAccount') The 'license' parameter is not defined^7") end return end

    MySQL.insert('INSERT INTO `infinity_store_accounts` (license) VALUES (?)', {
        license
    }, function(id)
        if Configs.Debug then print(("^2(function 'createAccount') A new user with the identifier '%s' has just been added to the table 'infinity_store_accounts'^7"):format(license)) end
    end)
end

---@param playerId number
---@return string
function getIdentifier(playerId)
    local identifier = GetPlayerIdentifierByType(playerId, 'license')
    return identifier and identifier:gsub('license:', '')
end