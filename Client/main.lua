-- Fonction pour envoyer un message à l'interface utilisateur
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendReactMessage(action, data)
  if type(action) == "string" then
      SendNUIMessage({
          action = action,
          data = data
      })
  end
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
  
  SendReactMessage('boutique:setInfoBoutique', {
      Vehicules = Config.Vehicules,
      Armes = Config.Armes,
      Caisses = Config.Caisses
  })
end)

RegisterNUICallback('boutique:close', function(_, cb)
  SetNuiFocus(false, false)
  DisplayRadar(true)
  SendReactMessage('setVisible', false)
end)

RegisterNUICallback("boutique:TestVehicle", function(vehiculeName)
  if type(vehiculeName) == "string" then
      print("Test Vehicule", vehiculeName)
  end
end)

RegisterNUICallback("boutique:BuyVehicle", function(vehiculeName)
  if type(vehiculeName) == "string" then
      print("Buy Vehicule", vehiculeName)
  end
end)

local previewCar = nil
local cam = nil

local function loadVehicleModel(vehicleName)
  if not IsModelInCdimage(vehicleName) or not IsModelAVehicle(vehicleName) then
      print("Modèle du véhicule invalide: " .. vehicleName)
      return false
  end

  RequestModel(vehicleName)
  while not HasModelLoaded(vehicleName) do
      Wait(0)
  end
  return true
end

RegisterNUICallback("boutique:PreviewVehicule", function(data)
  if type(data) ~= "table" or not data.vehiculeName or type(data.state) ~= "boolean" then
      print("Invalid data received for PreviewVehicule")
      return
  end

  local vehicleName = data.vehiculeName

  if data.state then
      if not loadVehicleModel(vehicleName) then return end

      local previewCoords = vector3(-148.1167, -597.8499, 167.0002)
      RequestCollisionAtCoord(previewCoords.x, previewCoords.y, previewCoords.z)
      SetFocusPosAndVel(previewCoords.x, previewCoords.y, previewCoords.z, 0.0, 0.0, 0.0)

      RequestIpl("imp_dt1_02_modgarage")
      
      previewCar = CreateVehicle(vehicleName, previewCoords.x, previewCoords.y, previewCoords.z, 309.8389, false, false)

      if not cam then
          cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
      end
      SetCamFov(cam, 50.0) 
      SetCamCoord(cam, vec3(-144.4473, -591.1857, 167.6002)) 
      PointCamAtCoord(cam, previewCoords.x - 3.0, previewCoords.y + 2, previewCoords.z)
      RenderScriptCams(1, 1, 0, 0, 0)
  else
      if previewCar then
          DeleteEntity(previewCar)
          previewCar = nil
      end

      if cam then
          RenderScriptCams(false, false, 0, true, true)
          DestroyCam(cam, false)
          cam = nil
      end

      SetModelAsNoLongerNeeded(vehicleName)
  end

  print(data.state, vehicleName)
end)

RegisterNUICallback("boutique:updateOrientationPreviewVehicule", function(RotateDegres)
  if previewCar and type(RotateDegres) == "number" then
      local currentHeading = GetEntityHeading(previewCar)
      local newHeading = (currentHeading + RotateDegres) % 360.0
      SetEntityHeading(previewCar, newHeading)
  end
end)

RegisterNUICallback("boutique:BuyArme", function(ArmeName)
  if type(ArmeName) == "string" then
      print("Buy arme", ArmeName)
  end
end)

RegisterNUICallback("boutique:BuyCaisse", function(CaisseName)
  if type(CaisseName) == "string" then
      print("Buy caisse", CaisseName)
  end
end)
