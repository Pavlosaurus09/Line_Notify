RegisterNetEvent('line_notify:notify', function(target, data)
    if not data then return end

    if type(target) == "number" then
        TriggerClientEvent('line_notify:notify', target, data)
        return
    end

    if target == "all" then
        TriggerClientEvent('line_notify:notify', -1, data)
        return
    end
end)
