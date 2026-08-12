# Run this ONCE from an elevated (Administrator) PowerShell window.
# It creates the aidatasense database/user for local development.

$pgBin = "C:\Program Files\PostgreSQL\17\bin"
$pgData = "C:\Program Files\PostgreSQL\17\data"
$hba = "$pgData\pg_hba.conf"
$service = "postgresql-x64-17"

Stop-Service $service -Force
Start-Sleep -Seconds 5

Copy-Item $hba "$hba.bak" -Force
(Get-Content $hba) -replace 'scram-sha-256', 'trust' | Set-Content $hba -Encoding utf8

Start-Service $service
Start-Sleep -Seconds 5
Get-Service $service | Select-Object Status, StartType | Format-Table

# Run as separate statements: CREATE DATABASE cannot execute inside the
# implicit transaction psql wraps around a single multi-statement -c string.
& "$pgBin\psql.exe" -U postgres -h localhost -c "ALTER USER postgres WITH PASSWORD 'postgres';"
& "$pgBin\psql.exe" -U postgres -h localhost -c "CREATE USER aidatasense WITH PASSWORD 'aidatasense';"
& "$pgBin\psql.exe" -U postgres -h localhost -c "CREATE DATABASE aidatasense OWNER aidatasense;"
& "$pgBin\psql.exe" -U postgres -h localhost -c "ALTER USER aidatasense CREATEDB;"

Stop-Service $service -Force
Start-Sleep -Seconds 5

Copy-Item "$hba.bak" $hba -Force
Remove-Item "$hba.bak" -Force

Start-Service $service
Start-Sleep -Seconds 5
Get-Service $service | Select-Object Status, StartType | Format-Table

Write-Host "Done. DATABASE_URL=postgresql://aidatasense:aidatasense@localhost:5432/aidatasense"
