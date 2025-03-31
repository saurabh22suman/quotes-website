# Check PowerShell configuration and write to a file
$outputFile = "powershell-info.txt"

# Clear any existing file
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Write PowerShell version
"PowerShell Version:" | Out-File -Append $outputFile
$PSVersionTable.PSVersion | Out-File -Append $outputFile
"" | Out-File -Append $outputFile

# Write Execution Policy
"Execution Policy:" | Out-File -Append $outputFile
Get-ExecutionPolicy | Out-File -Append $outputFile
"" | Out-File -Append $outputFile

# Write PowerShell Profile information
"PowerShell Profile:" | Out-File -Append $outputFile
"Profile Path: $PROFILE" | Out-File -Append $outputFile
"Profile Exists: $(Test-Path $PROFILE)" | Out-File -Append $outputFile
"" | Out-File -Append $outputFile

# Write VSCode Terminal Settings
"VSCode Terminal Settings:" | Out-File -Append $outputFile
"TERM_PROGRAM: $env:TERM_PROGRAM" | Out-File -Append $outputFile
"TERM: $env:TERM" | Out-File -Append $outputFile
"" | Out-File -Append $outputFile

# Write message
Write-Host "PowerShell information has been written to $outputFile"
