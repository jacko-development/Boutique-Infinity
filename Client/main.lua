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


local previewCar = nil

RegisterNUICallback("boutique:PreviewVehicule", function(data)
  if data.state == true then
    RequestModel(data.vehiculeName)

    while not HasModelLoaded(data.vehiculeName) do
        Wait(1)
    end
    previewCar = CreateVehicle(data.vehiculeName, -75.2598, -818.9055, 326.1752, 0.0, false, false)
    local cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    SetCamFov(cam, 50.0)
    RenderScriptCams(1, 1, 0, 0, 0)
    SetCamCoord(cam, vec3(-77.3532, -827.6580, 328.3425))

    PointCamAtCoord(cam, -75.4155 + 1.5, -819.4504, 326.1752)
  else
    DeleteEntity(previewCar)
    previewCar = nil
    RenderScriptCams(false, false, 0, true, true)
  end
  print(data.state, data.vehiculeName)
end)

RegisterNUICallback("boutique:updateOrientationPreviewVehicule", function(RotateDegres)
  local newHeading = tonumber(string.format("%.2f", RotateDegres)) + GetEntityHeading(previewCar)
  SetEntityHeading(previewCar, newHeading)
end)

RegisterNUICallback("boutique:BuyArme", function(ArmeName)
  print("Buy arme", ArmeName)
end)

RegisterNUICallback("boutique:BuyCaisse", function(CaisseName)
  print("Buy caisse", CaisseName)
end)
