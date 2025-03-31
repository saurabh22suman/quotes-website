# Update VSCode settings to use Command Prompt instead of PowerShell
$settingsPath = "$env:APPDATA\Code\User\settings.json"

# Create backup of settings file if it exists
if (Test-Path $settingsPath) {
    $backupPath = "$settingsPath.cmd-backup"
    Copy-Item -Path $settingsPath -Destination $backupPath -Force
    Write-Host "Backup created at: $backupPath" -ForegroundColor Green
    
    # Read settings file
    $settings = Get-Content -Path $settingsPath -Raw | ConvertFrom-Json
} else {
    # Create new settings object if file doesn't exist
    $settings = New-Object -TypeName PSObject
    Write-Host "No existing settings file found. Creating new settings." -ForegroundColor Yellow
}

# Ensure settings is a PSCustomObject
if ($null -eq $settings) {
    $settings = New-Object -TypeName PSObject
}

# Configure Command Prompt as default terminal
$cmdProfile = @{
    path = "C:\\Windows\\System32\\cmd.exe"
    args = @()
}

# Add or update Windows profiles
if ($null -eq $settings.'terminal.integrated.profiles.windows') {
    $windowsProfiles = New-Object -TypeName PSObject
    $windowsProfiles | Add-Member -NotePropertyName 'Command Prompt' -NotePropertyValue $cmdProfile -Force
    $settings | Add-Member -NotePropertyName 'terminal.integrated.profiles.windows' -NotePropertyValue $windowsProfiles -Force
} else {
    $settings.'terminal.integrated.profiles.windows' | Add-Member -NotePropertyName 'Command Prompt' -NotePropertyValue $cmdProfile -Force
}

# Set Command Prompt as default terminal
$settings | Add-Member -NotePropertyName 'terminal.integrated.defaultProfile.windows' -NotePropertyValue 'Command Prompt' -Force

# Save updated settings
$settingsJson = $settings | ConvertTo-Json -Depth 10
Set-Content -Path $settingsPath -Value $settingsJson

Write-Host "VSCode settings updated to use Command Prompt as default terminal" -ForegroundColor Green
Write-Host "Please restart VSCode for the changes to take effect" -ForegroundColor Yellow
