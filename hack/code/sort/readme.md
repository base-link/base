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
    riff.note.link (link tree nodes, so we can get back to error handling)
    riff.link (properties)

The riff is the AST node.

fork (the environment)

Step through the AST (iterate through the calls), and construct a fork
for each step. Then test that the riff matches the form, or infer it and
then check.

    function testFormForm() {

    }

    function testForm(riff, form) {
      for (const name in riff.link) {

      }
    }

Can mark the literals with the final type instantly.

    if (riff.workFormTake && riff.workForm !== form) {
      throw halt('invalid_type')
    }

The compile target is just an AST, it's not the actual executable. The
executable is the finally generated code. The AST is a tree structure,
not a graph, so there won't be a problem rendering it.

    riff.base //=> calculate path to notify watchers

    base.hook[line].push(hook)

Actually we want to add a tree of watchers, so they look up by property
key.

The interpolated references are used to generate more of the AST?

---

So we have the AST as used by the documentation tool. It goes:

- link text tree (CST)
- mesh tree (AST), which is a wrapper around link tree

mesh.text // link tree mesh.link // properties

The mesh tree is generated from the data. It is modified (modifying the
link text nodes) to change the layout of the code. As we modify the CST,
the meaning of the ranks (position of the code in text) goes away, since
now we have added dynamic elements to it.

The property `form-code` gives a number for the type, and has `unknown`
type if it is unknown. You can't access the AST for the types at
runtime. The form code is the hash of the module name + form name.

How to access the form AST then at runtime?

https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/procedural-macros.html

derive(Insertable)

You need to

    hook mesh

    user.form.link.forEach

    mesh user

    mesh any # include ast of all types

    form user
      mesh true

    save user/email, <foo>

calls

    call user/save, 'email', <foo>

And runs validations based on type.

No, do the validation elsewhere.

    form user
      fuse insertable

    # like a tree/template, except it gives you the captured final AST as well.
    mesh insertable
      take mesh, like mesh

      hook fuse
        task insert
          walk mesh/link

    tree insertable
      mesh true

      hook fuse
        task insert
          take mesh, like mesh
          take self, like self
          walk mesh/link

Gives you the mesh/AST for each task, after it is complete.

    form user
      task insert
        take self
          mesh true

        walk self/form/link
          ...

If you want the AST for a specific task:

    task insert
      mesh true

If you want the AST for a whole module, just add it at the top level:

    mesh true

If you want the AST for everything, you can do this in a role file:

    file ./**/*.link
      mesh true

    suit insertable
      mesh true

      task insert

The mesh is the _final_ compiled target, which links to the link CST.

If you want the full AST with the CST, you need to simply parse the file
again at runtime. Or perhaps there is a special `code true` term?

The code is accessible in mesh, you just read the file with mesh and get
the AST, then match it to the form id. Or do whatever to generate
documentation, or use in the linter.

So it's like, we call:

    mesh/make-tree

That gives us the final compiled tree, without typechecking or any of
that.

    mesh/mold-tree

That does typechecking and type inference.

    mesh/save-js
    mesh/save-link

These take an AST and write the output file.

That way, the documentation can just call `make-tree` to get an AST
ready for documentation generation. The linter can take the result of
`make-tree` and rewrite some of the AST, to then call `save-link` and
replace some of the file. Or if we want to generate the final js, we can
call `mold-tree` and then `save-js`.

The `mold-tree` will then do the typechecking. The typechecking is
basically doing symbolic evaluation.

A test generator can take the typed ast and generate tests based on
constraints somehow.

The make of the tree uses the mill grammars for the tree, to generate
the structures.
