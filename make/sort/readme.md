# TypeChecking and Type Inference

This section does all the typechecking and inference and borrow checking
and lifetime checking and whatnot.

Still have a long ways to go to figuring this out.

- [Type Inference in Rust Compiler](https://rustc-dev-guide.rust-lang.org/type-inference.html)
- https://sdleffler.github.io/RustTypeSystemTuringComplete/
- http://sinelaw.github.io/infernu.org/s/posts/type-system.html
- https://jaked.org/blog/2021-09-07-Reconstructing-TypeScript-part-0

Example:

    function checkFunctionCall(call, fork) {
      // check the inputs match the task type
      // check the right number of inputs exist
      // check the bindings on the call are defined in the fork
    }

    function check(ast: Expression, type: Type) {
      if (AST.isObjectExpression(ast) && Type.isObject(type))
        return checkObject(ast, type);

      const synthType = synth(ast);
      if (!Type.isSubtype(synthType, type))
        err(`expected ${Type.toString(type)}, got ${Type.toString(synthType)}`, ast);
    }

So we need to create a type from the AST nodes. So we have the Mesh
nodes, and the Form nodes (types). Each mesh has a form node.

    make (infer) => construct a form
    test (check) => compare mesh to form
    take (if it was accepted)

    riff.form (its ast type)
    riff.note.take (if it is accepted)
    riff.note.form (its runtime type)
    riff.note.link (link tree nodes)
    riff.link (properties)

The riff is the AST node.

fork (the environment)

Step through the AST (iterate through the calls), and construct a fork
for each step. Then test that the riff matches the form, or infer it and
then check.
