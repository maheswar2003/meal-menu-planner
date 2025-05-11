$jsonContent = Get-Content -Raw -Path "all-weeks-menu.json" | ConvertFrom-Json
$formattedOutput = ""

foreach ($item in $jsonContent) {
    $singleItemJson = $item | ConvertTo-Json -Compress
    $formattedOutput += "$singleItemJson`n"
}

Set-Content -Path "compass-import.json" -Value $formattedOutput

Write-Host "Conversion complete. Use compass-import.json for importing to MongoDB Compass." 