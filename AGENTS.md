# AI-driven development constraints

## Scope and source of truth

- Implement the calculator as a separate React and TypeScript application.
- Treat `document/【詳細設計書】計算機.xlsx` as a read-only source document. Never edit, overwrite, rename, or use it as an application artifact.
- The approved detailed design is the source of truth. The only higher-priority functional requirements are explicit amendments approved by the user after that design, including the precision rule in this file.
- Do not copy an unrelated calculator implementation from search results. External research may be used to confirm framework APIs, language behavior, accessibility guidance, or library behavior only.
- Before changing behavior not defined by the design, record the question and obtain user approval. Do not silently add familiar calculator behavior.
- Keep investigation time-boxed. If an unanswered question threatens the agreed schedule or changes observable behavior, raise it before implementation continues.

## Required technology and structure

- Use React with TypeScript. Do not implement the application in VBA.
- Use a React component in place of the VBA UserForm.
- Put reusable calculation and state-transition logic in framework-independent TypeScript modules, not inside visual components. This is the React equivalent of the original standard module rule.
- Keep the calculation module free of DOM access and React imports.
- Enable TypeScript strict mode.
- Do not use `any`, `eval`, `Function`, `dangerouslySetInnerHTML`, or `@ts-ignore`.
- Do not add network access, persistence, analytics, or unrelated features.
- Pin installed dependency versions in the lockfile. Prefer the active Node.js LTS release and stable package releases available when the project is initialized.

## Naming rules

Variables, parameters, state fields, and props must use a lowercase type prefix followed by a meaningful PascalCase name. Loop counters used only as sequential indexes may use `i`, `j`, or `k`.

| Value/type | Prefix | Example |
| --- | --- | --- |
| `string` | `str` | `strDisplayValue` |
| semantic integer stored as `number` | `int` | `intDecimalPlaces` |
| general JavaScript `number` | `num` | `numButtonIndex` |
| `Decimal` calculation value | `dec` | `decResult` |
| `boolean` | `bln` | `blnWaitingForOperand` |
| array | `arr` | `arrCalculatorButtons` |
| plain object | `obj` | `objCalculatorState` |
| React ref | `ref` | `refCalculator` |
| event object | `evt` | `evtKeyboard` |
| function-valued variable or prop | `fn` | `fnHandlePress` |

Additional naming rules:

- React component and type names use PascalCase without a type prefix, for example `Calculator` and `CalculatorState`.
- Custom hooks start with `use`.
- Functions use a verb-led camelCase name and must not use a return-type prefix, for example `calculateResult`.
- Do not abbreviate meaning merely to shorten a name.
- Use design terminology consistently: calculation display 1, calculation display 2, operator, result, clear, and clear entry.

## Required implementation sequence

- Complete and review the type and state-transition design before feature implementation.
- Implement the presentational UI before shared calculation logic and before event/state integration.
- During the UI phase, components may accept typed display values and callback props, but must not contain calculation rules, reducer logic, or temporary business behavior.
- After the UI phase passes its structural and accessibility checks, implement framework-independent shared logic.
- Connect UI events to the reducer only after both the UI and shared logic phases are complete.
- Do not create throwaway calculation behavior merely to make the UI appear interactive.

## Explicitness and conversions

- Declare parameter types and return types for every function.
- Declare component prop types explicitly.
- Use explicit exports and imports. Do not rely on undeclared globals.
- Use braces for every control-flow block, including one-line branches.
- Do not rely on implicit string/number coercion.
- Use `String(value)` only when converting a validated value to a display string.
- Use the selected decimal library to convert validated numeric strings for calculation. Do not use unary `+`, arithmetic coercion, or `parseFloat` on unvalidated input.
- Represent user input and display values as strings. Represent arithmetic operands and results as decimal-library values during calculation.
- Handle every member of operator and action union types exhaustively. An unhandled member must cause a compile-time error.

## Required calculator behavior

- Provide digits `0` through `9`, decimal point, `+`, `-`, `×`, `÷`, `=`, `C`, and `CE`.
- Use two displays corresponding to calculation labels 1 and 2 in the design.
- Evaluate chained operations immediately from left to right. Do not apply multiplication/division precedence.
- When only display 2 contains a value and an operator is pressed, move that value to display 1 with the operator and clear display 2.
- When only display 1 contains a value and another operator is pressed, replace the trailing operator.
- When both displays contain values and an operator is pressed, calculate first and then apply the new operator.
- `C` clears both displays. `CE` clears display 2 only.
- `=` calculates only when both required operands exist. Repeated `=` does not repeat the previous operation.
- Do not allow a number to start with a decimal point. Do not allow more than one decimal point in one operand.
- Suppress unnecessary leading zeroes as described by the design.
- Preserve the design behavior that division by zero returns `0`, unless the user approves a design amendment.
- Preserve other observable edge behavior from the design unless an amendment is approved and recorded.

## Precision and rounding amendment

- Calculation results support at most 15 digits after the decimal point.
- Round the 16th and later decimal digits using round-half-up (四捨五入).
- Use a decimal arithmetic library, with `decimal.js` as the default choice, to avoid binary floating-point artifacts.
- Configure or invoke rounding explicitly; do not rely on the host runtime's default rounding.
- Remove unnecessary trailing zeroes from a result and remove a trailing decimal point. Display integer results as integers.
- Normalize negative zero to `0`.
- The 15-digit rule is a maximum fractional precision, not a requirement to append 15 zeroes to every result.
- Keep the user's in-progress input unchanged until calculation or normalization is required.

## Quality gates

- Every functional rule must map to at least one test before the task is considered complete.
- Test calculation logic independently from React components.
- Test user-visible workflows through React Testing Library.
- The final gate requires passing type-check, lint, unit tests, component tests, and production build.
- Do not weaken compiler, lint, or test settings to make a failure disappear.
- Report assumptions, approved deviations, remaining questions, and verification results at handoff.
