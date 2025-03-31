# Update VSCode settings to enable shell integration
$settingsPath = "$env:APPDATA\Code\User\settings.json"

# Create backup of settings file if it exists
if (Test-Path $settingsPath) {
    $backupPath = "$settingsPath.backup"
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

# Enable shell integration
$settings | Add-Member -NotePropertyName 'terminal.integrated.shellIntegration.enabled' -NotePropertyValue $true -Force

# Configure PowerShell profile if terminal.integrated.profiles.windows doesn't exist
if ($null -eq $settings.'terminal.integrated.profiles.windows') {
    $powershellProfile = @{
        source = "PowerShell"
        icon = "terminal-powershell"
        args = @("-NoLogo")
    }
    
    $windowsProfiles = New-Object -TypeName PSObject
    $windowsProfiles | Add-Member -NotePropertyName 'PowerShell' -NotePropertyValue $powershellProfile -Force
    
    $settings | Add-Member -NotePropertyName 'terminal.integrated.profiles.windows' -NotePropertyValue $windowsProfiles -Force
}

# Save updated settings
$settingsJson = $settings | ConvertTo-Json -Depth 10
Set-Content -Path $settingsPath -Value $settingsJson

Write-Host "VSCode settings updated to enable shell integration" -ForegroundColor Green
Write-Host "Please restart VSCode for the changes to take effect" -ForegroundColor Yellow
