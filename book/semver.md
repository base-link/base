# Semantic Versioning in BaseLink

Semantic Versioning ([Semver](https://devhints.io/semver)) is a widely
adopted versioning scheme for software libraries and packages. It
provides a consistent way to express and manage dependencies based on
version numbers. In BaseLink, you can define specific version ranges
using the Link code syntax within the deck file. Let's explore various
examples of Semver ranges and their corresponding BaseLink
representations.

## Defining Specific Versions

### `1.2.3`

```
mark <1.2.3>
```

This specifies the exact version `1.2.3` for the dependency.

### `0.x.x`

```
mark <0.x.x>
```

This allows any version with 0 as the major version and any values for
the minor and patch versions.

## Defining Version Ranges

Semver allows you to define version ranges to specify a broader set of
acceptable versions. Here are some examples of version range definitions
in BaseLink.

### `1.2 - 2.3.0`

```
mark band
  base <1.2>
  head <2.3.0>
```

This defines a range from 1.2 (inclusive) to 2.3.0 (inclusive), allowing
any version within that range.

### `>= 1.2.3 < 1.3.0`

```
mark band
  base <1.2.3>
  fall <1.3.0>
```

This specifies a range that includes versions greater than or equal to
1.2.3 (inclusive) and less than 1.3.0 (exclusive).

### `0.14.x || 15.x.x`

```
mark test
  like <0.14.x>
  like <0.15.x>
```
