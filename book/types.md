# Types in TermTree

| number | academic    | term   | explanation                        |
| :----- | :---------- | :----- | :--------------------------------- |
| 1      | `Uni`       | `base` | type universe                      |
| 2      | `Nul`       | `void` | empty/null value                   |
| 3      | `Lam`       | `task` | lambda/function                    |
| 4      | `App`       | `call` | function application               |
| 5      | `ADT`       | `form` | abstract data type                 |
| 6      | `Con`       | `make` | constructor                        |
| 7      | `Let`       | `bind` | variable binding                   |
| 8      | `Var`/`Ref` | `link` | variable/reference                 |
| 9      | `All`       | `take` | product type                       |
| 10     | `Ann`       | `note` | type-annotation                    |
| 11     | `Met`       | `hint` | meta variable (for type-inference) |
| 12     | `Slf`       | `self` | recursive type                     |
| 13     | `Ins`       | `site` | self instance                      |
| 14     | `Sub`       | `diff` | substitution                       |
| 15     | `Jmp`       | `move` | jump                               |
| 16     | `Ret`       | `back` | return type                        |
| 17     | `Lop`       | `walk` | loop                               |
| 18     | `Mat`/`Swi` | `case` | pattern matching/switching/if-then |
| 19     | `Bit`       | `wave` | bit                                |
| 20     | `Lst`       | `list` | list/array                         |
| 21     | `Hol`       | `hole` | placeholder                        |
| 22     | `Mon`       | `work` | IO                                 |

## Expanded

| academic | term        | explanation              |
| :------- | :---------- | :----------------------- |
| `Hlt`    | `halt`      | exit                     |
| `Num`    | `size`      | number                   |
| `Flt`    | `fill`      | floating point           |
| `Txt`    | `text`      | text/string              |
| `Src`    | `code`      | source location          |
| `Get`    | `read`      | Map getter               |
| `Put`    | `save`      | Map setter               |
| `Map`    | `mesh`      | map type                 |
| `Use`    | `load`      | import/use declaration   |
| `Err`    | `kink`      | error                    |
| `Set`    | `set`       | set                      |
| `Ins`    | `self-site` | self instance            |
| `KVs`    | `mesh-site` | key-value store          |
| `Nat`    | `size-rise` | natural number           |
| `U64`    | `size-lead` | unsigned 64-bit integer  |
| `F64`    | `fill-lead` | 64-bit float             |
| `Par`    | `form-bind` | type parameters (`bind`) |
| `Par`    | `form-seek` | type indices (`seek`)    |
