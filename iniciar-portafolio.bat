@echo off
title Servidor Portafolio Natalia Jaramillo
echo ========================================================
echo   INICIANDO PORTAFOLIO WEB - NATALIA JARAMILLO
echo ========================================================
echo Abriendo servidor local en http://localhost:3000/ ...
echo (No cierres esta ventana mientras uses la pagina)
echo.

start http://localhost:3000/
npm.cmd run dev -- --host
pause
