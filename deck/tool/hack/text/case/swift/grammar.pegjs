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

Item
  = Var
  / Let
  / ClassFunction
  / StaticLet
  / StaticVar
  / ClassVar
  / ClassLet
  / Constructor
  / Function

Constructor
  = "init" _ unwrapped:"!"? optional:"?"? _ heads:Heads? _ "(" _ params:Params? _ ")" _ isAsync:"async"? _ throws:"throws"? { return { kind: 'constructor', isAsync: !!isAsync, throws: !!throws, heads: heads ?? [], params, unwrapped: !!unwrapped, optional: !!optional } }

Function
  = "static func" __ "`"? name:Name "`"? _ heads:Heads? _ "(" _ params:Params? _ ")" _ ret:("->" _ Expression)? { return { isClass: true, kind: 'function', name, heads: heads ?? [], params, ret: ret?.[2] } }
  / "func" __ "`"? name:Name "`"? _ heads:Heads? _ "(" _ params:Params? _ ")" _ ret:("->" _ Expression)? _ isAsync:"async"? _ throws:"throws"? { return { kind: 'function', name, heads: heads ?? [], params, ret: ret?.[2], isAsync: !!isAsync, throws: !!throws } }
  / name:Name _ heads:Heads? _ "(" _ params:Params? _ ")" _ ret:("->" _ Expression)? { return { kind: 'function', name, heads: heads ?? [], params, ret: ret?.[2] } }

ClassFunction
  = "class" __ fxn:Function { return { isClass: true, ...fxn } }

Var
  = "var" __ name:Name _ ":" _ type:Expression { return { kind: 'variable', isMut: false, name, type } }

Let
  = "let" __ name:Name _ ":" _ type:Expression { return { kind: 'variable', isMut: false, name, type } }

StaticLet
  = "static" __ lt:Let { return { isClass: true, ...lt } }

StaticVar
  = "static" __ lt:Var { return { isClass: true, ...lt } }

ClassVar
  = "class" __ vr:Var { return { isClass: true, ...vr } }

ClassLet
  = "class" __ vr:Let { return { isClass: true, ...vr } }

FQN
  = head:Type tail:(_ "." _ Type)* { return buildList(head, tail, 3) }

Expression
  = a:FQN _ "&" _ b:Expression { return { isIntersection: true, a, b } }
  / "[" _ a:FQN _ "&" _ b:Expression _ "]" { return { isArray: true, isIntersection: true, a, b } }
  / type:FQN unwrapped:"!"? optional:"?"? rest:"..."? { return { rest: !!rest, type, unwrapped: !!unwrapped, optional: !!optional } }
  / "[" _ type:Expression _ ":" _ extend:Expression _ "]" unwrapped:"!"? optional:"?"? rest:"..."? { return { rest: !!rest, ...type, extend, isArray: true, unwrapped: !!unwrapped, optional: !!optional } }
  / "[" _ type:Expression _ "]" unwrapped:"!"? optional:"?"? rest:"..."? { return { rest: !!rest, ...type, unwrapped: true, isArray: true, unwrapped: !!unwrapped, optional: !!optional } }
  / "(" _ params:Params? _ ")" _ ret:("->" _ Expression)? optional:"?"? { return { params, isFunction: true, ret: ret?.[2], optional: !!optional } }
  / "()" { return { isFunction: true } }

Type
  = name:Name _ heads:Heads "?" { return { name, heads, optional: true } }
  / name:Name _ heads:Heads { return { name, heads } }
  / name:Name "?" { return { name, optional: true, heads: [] } }
  / name:Name { return { name, heads: [] } }

Params
  = head:Param tail:(_ "," _ Param)* { return buildList(head, tail, 3) }

Param
  = name:Name _ ":" _ type:Expression { return { name: name, type: type } }
  / type:Expression { return { type } }

Heads
  = "<" _ type:Expression tail:(_ "," _ Expression)* _ ">" { return buildList(type, tail, 3) }

Name
  = "`"? name:[a-zA-Z0-9_]+ "`"? { return name.join('') }
  / name:"==" { return "equals" }
  / name:"!=" { return "notEquals" }

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r ]*

__ "whitespace2"
  = [ \t\n\r ]+
