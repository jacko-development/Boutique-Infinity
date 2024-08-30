---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendReactMessage(action, data)
    SendNUIMessage({
      action = action,
      data = data
    })
end


RegisterCommand("open:Boutique", function()
  SetNuiFocus(true, true)
  DisplayRadar(false)
  SendReactMessage('setVisible', true)
  SendReactMessage('boutique:setInfoPlayer', { 
    Identifer = "Destructor",
    IdBoutique = "6545",
    Coins = 1400,
    Historique = {
      {transaction = "BMW M3 G80 2021", coins = -1400, date = '28/08/2024'},
      {transaction = "BMW M3 G80 2021", coins = -1400, date = '27/08/2024'},
    }
  })
  SendReactMessage('boutique:setInfoBoutique', {Vehicules = Config.Vehicules, Armes = Config.Armes, Caisses = Config.Caisses})
end)

RegisterNUICallback('boutique:close', function(_, cb)
  SetNuiFocus(false, false)
  DisplayRadar(true)
  SendReactMessage('setVisible', false)
end)

RegisterNUICallback("boutique:TestVehicle", function(vehiculeName)
  print("Test Vehicule", vehiculeName)
end)

RegisterNUICallback("boutique:BuyVehicle", function(vehiculeName)
  print("Buy Vehicule", vehiculeName)
end)

RegisterNUICallback("boutique:PreviewVehicule", function(data)
  --- data = {state = true, vehiculeName = vehiculeName}
  print(data.state, data.vehiculeName)
end)

RegisterNUICallback("boutique:BuyArme", function(ArmeName)
  print("Buy arme", ArmeName)
end)

RegisterNUICallback("boutique:BuyCaisse", function(CaisseName)
  print("Buy caisse", CaisseName)
end)

print("test")