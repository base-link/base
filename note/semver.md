# Semantic Versioning in Base Link

### `1.2.3`

```
mark <1.2.3>
```

### `0.x.x`

```
mark <0.x.x>
```

### `1.2 - 2.3.0`

```
mark band
  base <1.2>
  head <2.3.0>
```

### `>= 1.2.3 < 1.3.0`

```
mark band
  base <1.2.3>
  fall <1.3.0>
```

### `0.14.x || 15.x.x`

```
mark test
  like <0.14.x>
  like <0.15.x>
```
