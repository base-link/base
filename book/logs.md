## Hello world example

You can do "log info" with the short show command.

    show <hello world>

To log, you would do:

    load @termsurf/wolf
      find note

    call note
      text <hello world>
      term kink

Should print

    note <hello world>
      time <2023/07/10 04:32:01 pm utc>
      sort kink
      deck <@termsurf/base>
      term process-tag

You also have:

    note dive # trace
    note hint # debug
    note show # info
    note tell # warning
    note kink # error
    note bust # critical

An error then shows as:

    kink <I'm an error>
      code 1234
