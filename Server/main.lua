print("[^5Infinity^7] [^2Boutique^7] Made with ^1❤^7  by ^3Atoshi^7 & ^3Destructor^7")

local playerLicenses = {}

AddEventHandler('playerConnecting', function()
    local _source = source
    playerLicenses[_source] = getIdentifier(_source)

    if not playerLicenses[_source] then if Configs.Debug then print("^1(event 'playerConnecting') The 'playerLicense' variable is not defined)^7") end return end

    isPlayerAccountCreated(playerLicenses[_source], function(isCreated)
        if isCreated then playerLicenses[_source] = nil return end
        
        createAccount(playerLicenses[_source])
        playerLicenses[_source] = nil
    end)
end)