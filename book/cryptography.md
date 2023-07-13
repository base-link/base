# Cryptography in BaseLink

```
load @tunebond/bolt/code/base/cryptography/md5
  find hash

save hash, call hash, <foo>
```

```
load @tunebond/bolt/code/base/cryptography/aes
  find encrypt
  find decrypt

load @tunebond/bolt/code/base/cryptography/rsa
  find encrypt
  find decrypt
  find generate
  find sign
  find verify

load @tunebond/bolt/code/base/cryptography/random/byte
  find make

load @tunebond/bolt/code/base/cryptography/random/size
  find make
```
