$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$docs = Join-Path $root 'docs'

$publicFiles = @(
  'index.html',
  'style.css',
  'script.js',
  'favicon.svg',
  'CNAME',
  'og-image.svg',
  'site.webmanifest',
  'robots.txt'
)

if (-not (Test-Path $docs)) {
  New-Item -ItemType Directory -Path $docs | Out-Null
}

foreach ($file in $publicFiles) {
  Copy-Item -LiteralPath (Join-Path $root $file) -Destination $docs -Force
}

New-Item -ItemType File -Path (Join-Path $docs '.nojekyll') -Force | Out-Null

Write-Output 'GitHub Pages bundle synced to docs/.'
