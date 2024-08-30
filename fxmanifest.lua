fx_version 'cerulean'
games { 'gta5' }
lua54 'yes'

author 'Destructor & Atoshi'
description 'Infinity Boutique for FiveM'
version '1.0.0'

ui_page 'web/build/index.html'

shared_scripts { '@es_extended/imports.lua', 'Configs/*.lua'}
server_scripts { '@oxmysql/lib/MySQL.lua', 'Server/Classes/*.lua', 'Server/*.lua' }
client_scripts { 'Client/*.lua' }

files {
	'web/build/index.html',
	'web/build/**/*',
}