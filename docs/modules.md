[Documentation - v0.0.0](README.md) / Modules

# Documentation - v0.0.0

## Table of contents

### Functions

- [createAdvancedDf](modules.md#createadvanceddf)
- [createSimpleDf](modules.md#createsimpledf)

## Functions

### createAdvancedDf

▸ **createAdvancedDf**(`ctx`, `definition`): `AnyAsyncFn`

Creates a simple domain function by injecting Context to a given function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | `object` | can be DI container or any object you want to inject |
| `definition` | `DeclarativeDf` | any contract function |

#### Returns

`AnyAsyncFn`

#### Defined in

[domain/advanced.js:44](https://github.com/oldbros/domain/blob/main/src/domain/advanced.js#L44)

___

### createSimpleDf

▸ **createSimpleDf**(`ctx`, `fn`): `AnyFn`

Creates a simple domain function by injecting Context to a given function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | `object` | can be DI container or any object you want to inject |
| `fn` | `AnyFn` | any contract function |

#### Returns

`AnyFn`

#### Defined in

[domain/simple.js:13](https://github.com/oldbros/domain/blob/main/src/domain/simple.js#L13)
