REM Discord bot auto start and restart for windows

@echo off
echo Starting..
node deploy-commands.js
:main
node bot.js
echo Restarting Bot..
goto main