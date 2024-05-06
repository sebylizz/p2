@echo off
setlocal

REM Path to node.exe
set NODE_PATH=C:\Program Files\nodejs\node.exe

set SCRIPT_PATH=scraper.js

REM Check if Node.js is installed
if not exist "%NODE_PATH%" (
    echo Node.js not found at "%NODE_PATH%"
    exit /b
)

for /F "tokens=*" %%A in (urls.txt) do (
    echo Processing URL: %%A
    "%NODE_PATH%" "%SCRIPT_PATH%" %%A
)

echo All URLs have been processed.
pause