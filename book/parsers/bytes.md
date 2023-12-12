# Parsing Bytes in BaseLink

## How parsing works

Given the link tree (a data structure produced by the `@termsurf/link`
parser), it processes it. If it encounters interpolation, it skips over
it and waits for it to be resolved before continuing back where it left
off. This is the `mine` step.

Then out of the mine are emitted "takes", which it passes to the `mint`.
The mint handles each take and generates the "loom" tree. This is the
main AST used by the compiler.
