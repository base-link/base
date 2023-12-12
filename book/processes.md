# Processes in BaseLink

BaseLink provides powerful features for managing processes within your
applications. Processes are isolated units of execution that allow you
to perform specific tasks, control flows, and interact with the
environment. They can be used to organize and orchestrate complex
operations, handle input and output, execute commands, and more. Let's
explore the capabilities and functionalities that processes offer in
BaseLink.

## Change the Current Process Title

To change the title of the current process, you can use the following
code:

```link
call flow/head, <My Process>
```

This command sets the title of the process to "My Process", providing a
meaningful name or label.

## Write to Standard Output

To write a message or data to the standard output stream, use the
following code:

```link
call flow/lead/flow, <hello world>
```

This command outputs the message "hello world" to the standard output,
allowing you to communicate information or results to the user or other
components of the system.

## Read from Standard Input

To read input from the standard input stream, use the following code:

```link
call flow/take/read
```

This command prompts the user to provide input, and the entered data can
be captured and utilized within your process.

## Write to Standard Error

In cases where you need to report errors or exceptional situations, the
following code writes an error message to the standard error stream:

```link
call flow/kink/flow, <error>
```

This command ensures that important error information is captured and
can be appropriately handled.

## Create a Process

To create a new process dynamically, use the following code:

```link
load @termsurf/wolf/code/fork
  find make

save child, call make
```

This code loads the necessary module, invokes the `make` command, and
saves the newly created process instance for further usage. This is
particularly useful when you need to manage and coordinate multiple
concurrent operations or subprocesses.

## Execute a Command

To execute a command within your process, you can use the following
code:

```link
load @termsurf/wolf/code/command
  find work

call work, <convert>
  bind take
    <image.png>
    <image.svg>
```

This code loads the `@termsurf/wolf/code/command` module and executes
the `work` command with the specified arguments. It allows you to run
external commands or perform specific actions as part of your process
workflow.

## Exit

To gracefully exit a process, use the following code:

```link
call flow/halt, term ok
```

This command indicates the successful completion of the process by
setting the exit status to `term ok`.

## Kill

In certain scenarios, it may be necessary to forcibly terminate a
process. Use the following code to terminate the current process
immediately:

```link
call flow/toss
```

By leveraging these process-related features in BaseLink, you gain
fine-grained control over the execution, input/output handling, and
coordination of various tasks within your applications. Processes serve
as essential building blocks for implementing complex workflows,
managing system interactions, and facilitating efficient and modular
application development.

## Sleep

```
call flow/wait, 1000
```
