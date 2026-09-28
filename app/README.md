# Calculator application

React and TypeScript calculator project implemented from the supplied detailed design. The UI, decimal calculation logic, reducer, and event integration are complete.

See `../document/開発環境.md` for the fixed versions, setup procedure, and verification results. Project-wide AI constraints are defined in `../AGENTS.md`.

## Commands

From the repository root in PowerShell:

```powershell
. .\scripts\Use-ProjectNode.ps1
Set-Location .\app
npm ci
npm run dev
```

Quality checks:

```powershell
npm run typecheck
npm run lint
npm run test
npm run build
```

## Implemented behavior

- Digits `0` through `9` and one decimal point per operand
- Addition, subtraction, multiplication, and division
- Immediate left-to-right chained calculation
- `C` for clearing both displays and `CE` for clearing display 2
- Round-half-up to at most 15 decimal places
- Division by zero returns `0` as required by the detailed design
