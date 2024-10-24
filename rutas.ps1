function Show-Tree {
    param(
        [string]$Path = ".",
        [int]$Level = 0
    )
    $prefix = "|   " * $Level
    Get-ChildItem $Path -Directory | Where-Object { $_.Name -notlike 'node_modules' } | ForEach-Object {
        Write-Host "$prefix|-- $_"
        Show-Tree "$Path\$_" ($Level + 1)
    }
    Get-ChildItem $Path -File | ForEach-Object {
        Write-Host "$prefix|-- $_"
    }
}

Show-Tree | Out-File estructura_arbol.txt
