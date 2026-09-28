Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$strRequiredNodeVersion = "24.21.0"
$strNodeDirectory = Join-Path $env:LOCALAPPDATA "Programs\node-v$strRequiredNodeVersion-win-x64"
$strNodeExecutable = Join-Path $strNodeDirectory "node.exe"

if (-not (Test-Path -LiteralPath $strNodeExecutable)) {
    throw "Node.js $strRequiredNodeVersion was not found at $strNodeDirectory. See document/開発環境.md."
}

$env:PATH = "$strNodeDirectory;$env:PATH"

$strActualNodeVersion = node --version
if ($strActualNodeVersion -ne "v$strRequiredNodeVersion") {
    throw "Expected Node.js v$strRequiredNodeVersion but found $strActualNodeVersion."
}

Write-Output "Using Node.js $strActualNodeVersion"
Write-Output "Using npm $(npm --version)"
