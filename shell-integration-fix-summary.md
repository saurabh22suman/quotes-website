# VSCode PowerShell Shell Integration Fix

We've created several scripts to diagnose and fix the "Shell integration unavailable" warning in VSCode when using PowerShell. Here's a summary of what we've done and what you need to do next.

## Diagnosis

We ran the following diagnostic scripts:

1. `check-powershell.ps1` - Collected information about your PowerShell environment
2. `check-vscode-settings.ps1` - Checked your VSCode settings for shell integration configuration

## Fixes Applied

We've created the following fix scripts:

1. `create-profile.ps1` - Created/updated your PowerShell profile to enable shell integration
2. `update-vscode-settings.ps1` - Updated your VSCode settings to enable shell integration

## Next Steps

To complete the fix, please follow these steps:

1. Run the update script to modify your VSCode settings:
   ```
   powershell -ExecutionPolicy Bypass -File update-vscode-settings.ps1
   ```

2. Restart VSCode completely (close all windows and reopen)

3. Open a new terminal in VSCode

4. Check if the "Shell integration unavailable" warning is gone

## If the Warning Persists

If you still see the warning after following these steps, try these additional solutions:

1. Install PowerShell 7 (a newer version than the Windows PowerShell 5.1 you're currently using):
   - Download from: https://github.com/PowerShell/PowerShell/releases
   - Configure VSCode to use PowerShell 7 as the default terminal

2. Check your execution policy again:
   ```
   Get-ExecutionPolicy
   ```
   If it's not set to "RemoteSigned" or "Bypass", run:
   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Reinstall the PowerShell extension in VSCode:
   - Open Extensions view (Ctrl+Shift+X)
   - Find "PowerShell" extension
   - Click the gear icon and select "Uninstall"
   - Restart VSCode
   - Reinstall the PowerShell extension

## Reference

For more detailed information about shell integration in VSCode, see:
- [VSCode Terminal Shell Integration Documentation](https://code.visualstudio.com/docs/terminal/shell-integration)
- [PowerShell in VSCode Documentation](https://code.visualstudio.com/docs/languages/powershell)

Once the shell integration warning is fixed, we can continue with implementing the quotes website.
