local menuOpen = false
local soundEnabled = true

RegisterCommand('notify_history', function()
    menuOpen = not menuOpen

    SetNuiFocus(menuOpen, menuOpen)

    SendNUIMessage({
        action = menuOpen and 'openHistory' or 'closeHistory'
    })
end)

RegisterKeyMapping(
    'notify_history',
    'Open notification history',
    'keyboard',
    'F10'
)

RegisterCommand('notify_sound', function()
    soundEnabled = not soundEnabled

    SendNUIMessage({
        action = 'toggleSound',
        state = soundEnabled
    })

    exports['line_notify']:Notify({
        title = "Notify System",
        message = soundEnabled and "Sound enabled" or "Sound disabled",
        type = "info",
        duration = 3000
    })
end)

RegisterNUICallback('close', function(_, cb)
    menuOpen = false
    SetNuiFocus(false, false)

    SendNUIMessage({
        action = 'closeHistory'
    })

    cb('ok')
end)

exports('Notify', function(data)
    if not data then return end

    SendNUIMessage({
        action = 'notify',
        payload = data,
        sound = soundEnabled
    })
end)

RegisterNetEvent('line_notify:notify', function(data)
    if not data then return end

    SendNUIMessage({
        action = 'notify',
        payload = data,
        sound = soundEnabled
    })
end)
