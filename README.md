# Утилитарные функции

Этот репозиторий содержит набор утилитарных функций, написанных на TypeScript. Эти функции могут быть полезны для различных задач при разработке приложений.

## Содержание

- [Функции](#Функции)
  - [isIndexable](#isIndexable)
  - [isObject](#isObject)
  - [hasOwnNestedProperty](#hasOwnNestedProperty)

## Функции

### isIndexable

Функция `isIndexable` проверяет, является ли переданный ей аргумент индексируемым объектом.

```typescript
const isIndexable = (obj: unknown): obj is Indexable => {
  return typeof obj === "object" && obj !== null && !!Object.keys(obj).length;
};
```

Пример использования:

```typescript
const obj1 = { a: 1, b: 2 };
const obj2 = null;
const obj3 = 42;
const obj4 = {};

console.log(isIndexable(obj1)); // true
console.log(isIndexable(obj2)); // false
console.log(isIndexable(obj3)); // false
console.log(isIndexable(obj4)); // false
```

### isObject
Функция `isObject` проверяет, является ли переданный ей аргумент объектом.
```typescript
const isObject = (obj: unknown): obj is Record<PropertyKey, unknown> =>
  typeof obj === "object" && !Array.isArray(obj);

```
Пример использования:
```typescript
console.log(isObject({})); // true
console.log(isObject([])); // false
console.log(isObject("I am a string")); // false
```

### hasOwnNestedProperty
Функция hasOwnNestedProperty проверяет наличие вложенного свойства в объекте. Функция возвращает boolean и дженерик переданного типа, расширенный рекурсивным типом определенного объекта.
```typescript
const hasOwnNestedProperty = <T, S extends string>(
  object: T,
  string: S
): object is T & GetObjectType<T, S> => {
  const keys = string.split(".");
  let current = object;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!isIndexable(current)) {
      return false;
    } else {
      current = current[key];
    }
  }
  return true;
};
```
Пример использования:
```typescript 
import hasOwnNestedProperty from './utils/hasOwnNestedProperty';

const obj = { power: { rangers: { red: "Jason" } } };
console.log(hasOwnNestedProperty(obj, "power.rangers.red")); // true
console.log(hasOwnNestedProperty(obj, "power.rangers.blue")); // false
console.log(hasOwnNestedProperty(obj, "power")); // true
console.log(hasOwnNestedProperty(obj, "power.rangers")); // true
console.log(hasOwnNestedProperty(obj, "power.rangers.green")); // false

```