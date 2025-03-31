# Check VSCode settings for shell integration
$settingsPath = "$env:APPDATA\Code\User\settings.json"

# Check if settings file exists
if (Test-Path $settingsPath) {
    Write-Host "VSCode settings file found at: $settingsPath" -ForegroundColor Green
    
    # Read settings file
    $settings = Get-Content -Path $settingsPath -Raw | ConvertFrom-Json
    
    # Check for terminal.integrated.shellIntegration.enabled
    $shellIntegrationEnabled = $settings.'terminal.integrated.shellIntegration.enabled'
    
    if ($null -eq $shellIntegrationEnabled) {
        Write-Host "terminal.integrated.shellIntegration.enabled setting not found (defaults to true)" -ForegroundColor Yellow
    } else {
        Write-Host "terminal.integrated.shellIntegration.enabled: $shellIntegrationEnabled" -ForegroundColor Cyan
    }
    
    # Check for PowerShell terminal profile
    $windowsProfiles = $settings.'terminal.integrated.profiles.windows'
    
    if ($null -eq $windowsProfiles) {
        Write-Host "terminal.integrated.profiles.windows setting not found (using defaults)" -ForegroundColor Yellow
    } else {
        Write-Host "PowerShell terminal profile:" -ForegroundColor Cyan
        $powershellProfile = $windowsProfiles.PowerShell
        if ($null -eq $powershellProfile) {
            Write-Host "  PowerShell profile not explicitly defined (using defaults)" -ForegroundColor Yellow
        } else {
            $powershellProfile | ConvertTo-Json | Write-Host
        }
    }
} else {
    Write-Host "VSCode settings file not found at: $settingsPath" -ForegroundColor Red
    Write-Host "Using default VSCode settings" -ForegroundColor Yellow
}

# Provide recommendations
Write-Host "`nRecommendations:" -ForegroundColor Green
Write-Host "1. Ensure 'terminal.integrated.shellIntegration.enabled' is set to true in VSCode settings"
Write-Host "2. Restart VSCode after making changes"
Write-Host "3. Open a new terminal in VSCode"
