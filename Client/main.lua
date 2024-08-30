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
    Vehicules = {
      ["sultan"] = {
          model = "sultan",
          label = "Sultan",
          price = 900,
          image = "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
      },
    },
    Armes = {
        ["weapon_carabineriflemk2"] = {
            model = "weapon_carabineriflemk2",
            label = "Carbine Rifle Mk II",
            price = 2200,
            image = "https://cdn.discordapp.com/attachments/1043600611175829615/1278445952822415481/image.png?ex=66d0d513&is=66cf8393&hm=9e78d7a763f65740682e21608e487b87fec7ddc265bde38a3f1282242f9c5588&"
        }, 
    },
    Caisses = {
        ["caisse_gold"] = {
            model = "caisse_gold",
            label = "Caisse Gold",
            price = 5200,
            image = "https://csgoskins.gg/social-images/eyJpbWFnZV91cmwiOiJodHRwczpcL1wvY2RuLmNzZ29za2lucy5nZ1wvcHVibGljXC91aWhcL2l0ZW1zXC9hSFIwY0hNNkx5OXpkR1ZoYldOa2JpMWhMbUZyWVcxaGFXaGtMbTVsZEM5aGNIQnpMemN6TUM5cFkyOXVjeTlsWTI5dUwzZGxZWEJ2Ymw5allYTmxjeTlqY21GMFpWOWpiMjF0ZFc1cGRIbGZNVE11T1dFM1pESm1OelUzWkdSaVpHTTVNVFZoWVRBd05XUmxaamMwWVdNeE9EWmhORFUzTXpRMllTNXdibWMtXC9hdXRvXC9hdXRvXC84NVwvbm90cmltXC85Y2Y5Y2JjYzQ2NjI0MTM5NDc4OWJjMTk5Njc0ZDIwOS5wbmciLCJhc3BlY3RfcmF0aW8iOjEuOTEwODI4MDI1NDc3NzA3LCJzaWciOiJmYWVlYzJlZTRjMDJkNGQ3YWYzZjRiODU5ZGU0MmNiNiJ9.png"
        }, 
    }
  })
end)

RegisterNUICallback("boutique:TestVehicle", function(vehiculeName)
  print("Test", vehiculeName)
end)

RegisterNUICallback("boutique:BuyVehicle", function(vehiculeName)
  print("Buy", vehiculeName)
end)

RegisterNUICallback("boutique:PreviewVehicule", function(data)
  --- data = {state = true, vehiculeName = vehiculeName}
  print(data.state, data.vehiculeName)
end)
