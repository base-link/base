# Working with Files in BaseLink

### Creating a File

```
load @tunebond/bolt/code/file
  find save

call save, <foo.txt>, <hello world>
```

### Reading a File

```
load @tunebond/bolt/code/file
  find read

call read, <foo.txt>
```

### Creating a Folder

```
load @tunebond/bolt/code/folder
  find save

call save, <my-directory>
```
