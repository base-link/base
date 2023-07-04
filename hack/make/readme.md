## Comments

Comments can be in many ways as `note`.

    host note-name
      text markdown, <
        Shortens the vector, keeping the first `len` elements and dropping
        the rest.

        If `len` is greater than the vector's current length, this has no
        effect.

        The [`drain`] method can emulate `truncate`, but causes the excess
        elements to be returned instead of dropped.

        Note that this method has no effect on the allocated capacity
        of the vector.

        # Examples

        Truncating a five element vector to two elements:

        ```
        let mut vec = vec![1, 2, 3, 4, 5];
        vec.truncate(2);
        assert_eq!(vec, [1, 2]);
        ```

        No truncation occurs when `len` is greater than the vector's current
        length:

        ```
        let mut vec = vec![1, 2, 3];
        vec.truncate(8);
        assert_eq!(vec, [1, 2, 3]);
        ```

        Truncating when `len == 0` is equivalent to calling the [`clear`]
        method.

        ```
        let mut vec = vec![1, 2, 3];
        vec.truncate(0);
        assert_eq!(vec, []);
        ```
      >

Can do inline `text` format.

    note
      head 2, <Vector>
      text <Shortens the vector, keeping the first `len` elements and dropping
        the rest.>
        like md

Or even:

    note md
      <Shortens the vector, keeping the first `len` elements and dropping
        the rest.>

Can mark/flag tasks and such that are:

- deprecated: `mark toss`
- experimental: `mark test`

Can have a `read/hint` folder with all the abstracted notes on the tasks
and forms and such.

    load ./foo
      find task create-something
      find task do-another

    task create-something
      note <Something>
    task do-another
      note <Another>

Similar to how you isolate tests from source code.

Or, import the notes into your source code.

    host create-something
      text <Something>

    # then in the file
    load ./read/task/stuff
      find note create-something

    task create-something
      note create-something
