fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Line'
description 'Notify System with History Menu'
version '1.1.0'

ui_page 'ui/index.html'

files {
    'ui/*.html',
    'ui/style.css',
    'ui/script.js',
    'ui/sounds/*.*'
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    'server/server.lua'
}



exports {
    'Notify'
}
