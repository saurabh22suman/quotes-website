# Create PowerShell profile with shell integration
$profilePath = $PROFILE

# Create directory if it doesn't exist
$profileDir = Split-Path -Parent $profilePath
if (!(Test-Path $profileDir)) {
    New-Item -Path $profileDir -ItemType Directory -Force
}

# Create profile file if it doesn't exist
if (!(Test-Path $profilePath)) {
    New-Item -Path $profilePath -ItemType File -Force
}

# Add shell integration to profile
$shellIntegrationCode = @"
# Enable VSCode Shell Integration
if (`$env:TERM_PROGRAM -eq 'vscode') {
    # Check if the shellIntegration.ps1 file exists in the expected location
    `$vscodePSPath = (Get-Process -Id `$PID).Path
    `$vscodePSDir = Split-Path -Parent `$vscodePSPath
    `$shellIntegrationPath = Join-Path `$vscodePSDir 'shellIntegration.ps1'
    
    if (Test-Path `$shellIntegrationPath) {
        . `$shellIntegrationPath
        Write-Host "VSCode Shell Integration enabled" -ForegroundColor Green
    } else {
        Write-Host "VSCode Shell Integration script not found at: `$shellIntegrationPath" -ForegroundColor Yellow
    }
}
"@

# Add the code to the profile
Add-Content -Path $profilePath -Value $shellIntegrationCode

# Output results
Write-Host "PowerShell profile created/updated at: $profilePath" -ForegroundColor Green
Write-Host "Please restart VSCode and open a new terminal to apply the changes."
