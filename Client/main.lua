local previewCar = nil


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
  
  ESX.TriggerServerCallback('infinity:boutique:getPlayerAccountInfoById', function(playerData)
    SendReactMessage('boutique:setInfoPlayer', { 
      Identifer = playerData.steamName,
      IdBoutique = playerData.boutiqueId,
      Coins = playerData.coinsNumber,
      Historique = {
          {transaction = "BMW M3 G80 2021", coins = -1400, date = '28/08/2024'},
          {transaction = "BMW M3 G80 2021", coins = -1400, date = '27/08/2024'},
      }})
  end)
  
  
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
  local vehicleName = data.vehiculeName

  if data.state == true then
    local vehicleName = data.vehiculeName

    if not IsModelInCdimage(vehicleName) or not IsModelAVehicle(vehicleName) then
      print("Modèle du véhicule invale: " .. vehicleName)
    end

    RequestModel(vehicleName)

    while not HasModelLoaded(data.vehiculeName) do
        Wait(0)
    end

    local previewCoords = vector3(-148.11672973633, -597.84997558594, 167.00024414062)
    RequestCollisionAtCoord(previewCoords.x, previewCoords.y, previewCoords.z)
    SetFocusPosAndVel(previewCoords.x, previewCoords.y, previewCoords.z, 0.0, 0.0, 0.0)

      if not cam then
          cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
      end
      SetCamFov(cam, 50.0) 
      SetCamCoord(cam, vec3(-144.4473, -591.1857, 167.6002)) 
      PointCamAtCoord(cam, previewCoords.x, previewCoords.y + 2, previewCoords.z)
      RenderScriptCams(1, 1, 0, 0, 0)

    RequestIpl("imp_dt1_02_modgarage")
    
    previewCar = CreateVehicle(data.vehiculeName, -148.11672973633, -597.84997558594, 167.00024414062, 309.8388671875, false, false)

    local cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    SetCamFov(cam, 50.0) 
    SetCamCoord(cam, vec3(-144.44726867676, -591.18572998047, 168.30022888184)) 
    PointCamAtCoord(cam, -148.11672973633 - 2.0, -599.84997558594, 167.00024414062)
    RenderScriptCams(1, 1, 0, 0, 0)
  else
    if previewCar then
      DeleteEntity(previewCar)
      previewCar = nil
    end
      RenderScriptCams(false, false, 0, true, true)
      DestroyCam(cam, false)
      SetModelAsNoLongerNeeded(data.vehiculeName)
    end
  print(data.state, data.vehiculeName)
end)

RegisterNUICallback("boutique:SetColorVehicle", function(data)
  if previewCar then
    if data.type == 1 then
      SetVehicleCustomPrimaryColour(previewCar, data.color.r, data.color.g, data.color.b)
    elseif data.type == 2 then
      SetVehicleCustomSecondaryColour(previewCar, data.color.r, data.color.g, data.color.b)
    end
  end
end)


RegisterNUICallback("boutique:updateOrientationPreviewVehicule", function(RotateDegres)
  if previewCar then
    local currentHeading  = GetEntityHeading(previewCar)
    local newHeading = (currentHeading + RotateDegres) % 360.0
    SetEntityHeading(previewCar, newHeading)
  end
end)

RegisterNUICallback("boutique:BuyArme", function(ArmeName)
  print("Buy arme", ArmeName)
end)

RegisterNUICallback("boutique:BuyCaisse", function(CaisseName)
  print("Buy caisse", CaisseName)
end)
