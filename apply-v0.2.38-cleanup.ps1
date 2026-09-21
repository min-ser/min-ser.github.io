# Run once from the Gitblog project root AFTER extracting this release.
# Removes obsolete filenames that can reveal the previous employer/customer identifiers.
$obsolete = @(
  'content/02_CAREER/2022-megazone.md',
  'content/03_PROJECTS/2025-amore-azure-ai-data-platform.md',
  'content/03_PROJECTS/amore-fabric-audit-log-automation.md',
  'content/03_PROJECTS/amore-fabric-private-connectivity.md',
  'content/03_PROJECTS/amore-fabric-query-log.md',
  'content/03_PROJECTS/amore-foundry-apim-private-platform.md',
  'content/03_PROJECTS/amore-multicloud-data-integration.md',
  'content/03_PROJECTS/amore-neo-aks-platform.md',
  'content/03_PROJECTS/amore-observability-monitoring.md',
  'content/07_ARCHIVE/2026-amore-troubleshooting-archive.md'
)
foreach ($path in $obsolete) {
  if (Test-Path $path) { Remove-Item -Force $path }
}
Write-Host 'v0.2.38 obsolete identifier cleanup complete.'
