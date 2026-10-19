@echo off
chcp 65001 >nul
title Homepage Studio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js 18 or newer is required.
  echo Download: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

node "editor\server.mjs" %*

if errorlevel 1 (
  echo.
  echo Homepage Studio stopped with an error.
  echo See the messages above for details.
  pause
)
