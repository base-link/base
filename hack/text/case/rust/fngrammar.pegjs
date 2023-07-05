{
  function filledArray(count, value) {
    return Array.apply(null, new Array(count))
      .map(function() { return value; });
  }
  function extractOptional(optional, index) {
    return optional ? optional[index] : null;
  }
  function extractList(list, index) {
    return list.map(function(element) { return element[index]; });
  }
  function buildList(head, tail, index) {
    return [head].concat(extractList(tail, index));
  }
}

Function
  = meta:FunctionType __ def:FunctionDefinition {
    return { ...meta, def }
  }

FunctionType
  = "pub" __ "async" __ "unsafe" __ "const" __ "fn" {
    return { isAsync: true, isPub: true, isUnsafe: true, isConst: true }
  }
  / "pub" __ "async" __ "const" __ "unsafe" __ "fn" {
    return { isAsync: true, isPub: true, isUnsafe: true, isConst: true }
  }
  / "pub" __ "async" __ "unsafe" __ "fn"  {
    return { isAsync: true, isPub: true, isUnsafe: true }
  }
  / "async" __ "unsafe" __ "const" __ "fn" {
    return { isAsync: true, isUnsafe: true, isConst: true }
  }
  / "async" __ "unsafe" __ "fn" {
    return { isAsync: true, isUnsafe: true }
  }
  / "pub" __ "async" __ "const" __ "fn" {
    return { isAsync: true, isPub: true, isConst: true }
  }
  / "pub" __ "async" __ "fn" {
    return { isAsync: true, isPub: true }
  }
  / "async" __ "const" __ "fn" {
    return { isAsync: true, isConst: true }
  }
  / "async" __ "fn" {
    return { isAsync: true, }
  }
  / "pub" __ "unsafe" __ "const" __ "fn" {
    return { isPub: true, isUnsafe: true, isConst: true }
  }
  / "pub" __ "const" __ "unsafe" __ "fn" {
    return { isPub: true, isUnsafe: true, isConst: true }
  }
  / "pub" __ "unsafe" __ "fn"  {
    return { isPub: true, isUnsafe: true }
  }
  / "unsafe" __ "const" __ "fn" {
    return { isUnsafe: true, isConst: true }
  }
  / "unsafe" __ "fn" {
    return { isUnsafe: true }
  }
  / "pub" __ "const" __ "fn" {
    return { isPub: true, isConst: true }
  }
  / "pub" __ "fn" {
    return { isPub: true }
  }
  / "const" __ "fn" {
    return { isConst: true }
  }
  / "fn" {
    return {}
  }

FunctionDefinition
  = name:Name _ heads:Heads? _ "(" _ args:Args? _ ")" _ ret:("->" _ Expression)? _ where:Where? {
    return {
      name: name,
      heads: heads ?? [],
      args: args ?? [],
      ret: ret?.[2],
      where: where ?? []
    }
  }

Args
  = head:Arg tail:(_ "," _ Arg)* { return buildList(head, tail, 3) }

Arg
  = term:Term _ type:(":" _ Expression)? { return { term: term, type: type?.[2] ?? {} } }

Term
  = prefix:Prefix? tuple:Tuple { return { type: 'tuple', prefix: prefix ?? {}, head: tuple } }
  / prefix:Prefix? type:Type { return { prefix: prefix ?? {}, type: 'type', head: type } }
  / prefix:Prefix? name:Name { return { prefix: prefix ?? {}, type: 'name', head: name } }

Enum
  = name:Name heads:Heads? _ tuple:Tuple { return { name, heads: heads ?? [], tuple } }

Type
  = name:Name heads:Heads? { return { name, heads: heads ?? [] } }

EnumFunction
  = en:Enum _ "->" _ ret:Expression { return { ...en, ret } }

ConstExpression
  = "const" __ base:Expression { return base }

Expression
  = "[" _ arrayType:Expression _ ";" _ indexType:Name _ "]" {
    return { type: 'index-array', head: arrayType, tail: indexType }
  }
  / "[" _ arrayType:Expression _ "]" {
    return { type: 'array', head: arrayType }
  }
  / head:FQN tail:(__ "+" __ Expression)* {
    return { type: 'fqn', head, tail: extractList(tail, 3) }
  }
  / head:EnumFunction tail:(__ "+" __ Expression)* {
    return { type: 'enum-function', head, tail: extractList(tail, 3) }
  }
  / head:Tuple tail:(__ "+" __ Expression)* {
    return { type: 'tuple', head, tail: extractList(tail, 3) }
  }
  / head:Enum tail:(__ "+" __ Expression)* {
    return { type: 'enum', head, tail: extractList(tail, 3) }
  }
  / head:ConstExpression tail:(__ "+" __ Expression)* {
    return { type: 'const', head, tail: extractList(tail, 3) }
  }
  / head:Type tail:(__ "+" __ Expression)* {
    return { type: 'type', head, tail: extractList(tail, 3) }
  }
  / head:Name tail:(__ "+" __ Expression)* {
    return { type: 'name', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix "[" _ arrayType:Expression _ ";" _ indexType:Name _ "]" {
    return { type: 'index-array', head: arrayType, tail: indexType }
  }
  / prefix:Prefix "[" _ arrayType:Expression _ "]" {
    return { type: 'array', head: arrayType }
  }
  / prefix:Prefix head:FQN tail:(__ "+" __ Expression)* {
    return { prefix, type: 'fqn', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:EnumFunction tail:(__ "+" __ Expression)* {
    return { prefix, type: 'enum-function', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:Tuple tail:(__ "+" __ Expression)* {
    return { prefix, type: 'tuple', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:Enum tail:(__ "+" __ Expression)* {
    return { prefix, type: 'enum', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:ConstExpression tail:(__ "+" __ Expression)* {
    return { prefix, type: 'const', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:Lifetime tail:(__ "+" __ Expression)* {
    return { prefix, type: 'lifetime', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:Type tail:(__ "+" __ Expression)* {
    return { prefix, type: 'type', head, tail: extractList(tail, 3) }
  }
  / prefix:Prefix head:Name tail:(__ "+" __ Expression)* {
    return { prefix, type: 'name', head, tail: extractList(tail, 3) }
  }
  / head:Lifetime tail:(__ "+" __ Expression)* {
    return { type: 'lifetime', head, tail: extractList(tail, 3) }
  }
  / "?Sized" {
    return { type: 'dynamically-sized' }
  }
  / "!" {
    return { type: 'never' }
  }

FQN
  = "<" _ first:Expression __ "as" __ second:Expression ">" "::" name:Name {
    return { type: 'fqn-as', first, second, name }
  }
  / first:Name "::" second:Name {
    return { type: 'fqn-name', first, second }
  }

Tuple
  = "(" _ head:Expression tail:(_ "," _ Expression)* _ ")" { return buildList(head, tail, 3) }
  / "()" { return [] }

Lifetime
  = "'" _ name:Name { return name }
  / "'_" { return '_' }

Prefix
  = "&"+ _ lifetime:Lifetime __ "mut" __ { return { lifetime, isRef: true, isMut: true } }
  / "&"+ _ "mut" __ "&"+ _ lifetime:Lifetime __ "mut" __ { return { lifetime, isDoubleRef: true, isDoubleMut: true, isRef: true, isMut: true } }
  / "&"+ _ "mut" __ "&"+ _ "mut" __ { return { isDoubleRef: true, isDoubleMut: true, isRef: true, isMut: true } }
  / "&"+ _ "mut" __ "&"+ _ lifetime:Lifetime __ { return { lifetime, isDoubleRef: true, isRef: true, isMut: true } }
  / "&"+ _ "mut" __ { return { isRef: true, isMut: true } }
  / "&"+ _ "dyn" __ { return { isDyn: true, isRef: true } }
  / "&"+ _ lifetime:Lifetime __ { return { lifetime, isRef: true } }
  / "&"+ _ { return { isRef: true } }
  / lifetime:Lifetime _ { return { lifetime } }
  / "mut" __ { return { isMut: true } }
  / "*"+ _ "mut" __ { return { isDeref: true, isMut: true } }
  / "*"+ _ { return { isDeref: true } }

Heads
  = "<" head:DynHead tail:(_ "," _ DynHead)* ">" { return buildList(head, tail, 3) }

DynHead
  = "&" _ "dyn" __ head:Head { return { isRef: true, isDyn: true, ...head } }
  / "&" _ "mut" _ "(" _ head:DynHead _ ")"  { return { isMut: true, isRef: true, ...head } }
  / "&" _ "(" _ head:DynHead _ ")"  { return { isRef: true, ...head } }
  / "dyn" __ head:Head { return { isDyn: true, ...head } }
  / head:Head { return head }

Head
  = type:Expression _ ":" _ base:Expression { return { ...type, base } }
  / type:Expression _ "=" _ def:Expression { return { ...type, default: def } }
  / type:Expression { return { ...type } }

Where
  = "where" __ wheres:Wheres _ ","? { return wheres }

Wheres
  = head:WhereTerm tail:(_ "," _ WhereTerm)* { return buildList(head, tail, 3) }

WhereTerm
  = prefix:Prefix base:Expression _ ":" _ "for" heads:Heads? __ type:Expression { return { prefix, base, heads: heads ?? [], type } }
  / base:Expression _ ":" _ "for" heads:Heads? __ type:Expression { return { base, heads: heads ?? [], type } }
  / prefix:Prefix base:Expression _ ":" _ type:Expression { return { prefix, base, heads: [], type: type } }
  / base:Expression _ ":" _ type:Expression { return { base, type: type, heads: [],  } }

Name
  = name:[a-zA-Z0-9_]+ { return name.join('') }

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*

__ "whitespace2"
  = [ \t\n\r]+
