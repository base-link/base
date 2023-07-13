# The `book` file in BaseLink

```
head [number], text [title]
mind [author]
date [date]
term <tag>

host bundle
  host font-size, size 14, code px

look(bundle, text <text>)

list size # ordered list
  flow [text]
  flow [text]
list flow # unordered list
list mesh # table
  bind head
    flow [text]
    flow [text]
    flow [text]
  bind base
    make line
      flow [text]
      flow [text]
      flow [text]
    make line

# table of contents
list link
  link ./file.md
    link ./file/file2.md

fuse ./stuff

flow [text]
flow [text]
  bind fill

walk [link]
  [...zone]

code [name], [code]

surf [link], text [title]
bold [text]
tilt [text]
line [text] # strikethrough
draw [name] # view rendering
view ./path, name [name] # image

rise [text] # superscript
fall [text] # subscript

code math
  set
    sup
      i a
      n 2
    o <+>
    sup
      i b
      n 2
    o <=>
    sup
      i c
      n 2

film youtube
  bind id, <123>

cast slab # new page
cast size, size 1, code cm # vertical space
cast line, size 12 # line break

list turn # tabs
  turn [name]
    [...sift]

tell x # blockquote
  cite [term]

bind cite
  mind [term]
    name [text]

  cite [term]
    date [date]
    name [name]
    site [text]
    mind [term]

wall 3 # 3 columns
```
