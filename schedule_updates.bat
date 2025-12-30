@echo off
:: Batch script to schedule the Python update script to run weekly
echo ---------------------------------------------------
echo  Setting up Automatic Weekly Publication Updates
echo ---------------------------------------------------

:: ID for the task
set TASK_NAME=UpdateAswinWebsitePubs

:: Path to the python script (in the same directory as this bat file)
set SCRIPT_PATH=%~dp0update_publications.py

:: Check if python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not found in your PATH. Please install Python.
    pause
    exit /b
)

:: Create the scheduled task
:: Runs every WEEK (weekly) on SUNDAY at 12:00 PM
:: action: python "path/to/script.py"
echo Scheduling task '%TASK_NAME%' to run every Sunday at 12:00 PM...

schtasks /create /tn "%TASK_NAME%" /tr "python \"%SCRIPT_PATH%\"" /sc weekly /d SUN /st 12:00 /f

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Task scheduled successfully!
    echo Your publications will now update automatically every week.
) else (
    echo.
    echo [ERROR] Failed to create scheduled task. You might need to run this as Administrator.
)

pause
