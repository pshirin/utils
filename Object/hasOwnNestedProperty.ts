import isIndexable from "./isIndexable";
import isObject from "./isObject";

type GetObjectType<
  Object,
  Template extends string
> = Template extends `${infer First}.${infer Rest}`
  ? Record<First, GetObjectType<Object, Rest>>
  : Record<Template, unknown>;

/**
 * Функция `hasOwnNestedProperty` проверяет наличие вложенного свойства в объекте.
 * 
 * @param object - Это объект, в котором вы хотите проверить наличие вложенного свойства.
 * @param string - Это строка, представляющая путь к вложенному свойству. Например, "power.rangers".
 * @returns - Функция возвращает boolean и дженерик переданного типа, расширенный рекурсивным
 * типом определенного объекта. Если вложенное свойство присутствует в объекте, функция возвращает true, в противном случае - false.
 *
 * Функция использует `isIndexable` для проверки, является ли текущий объект индексируемым, и `isObject` для проверки, является ли текущий объект объектом. Затем она рекурсивно проверяет наличие каждого ключа в пути.
 *
 * Пример использования:
 * ```typescript
 * const obj = { power: { rangers: { red: "Jason" } } };
 * console.log(hasOwnNestedPropety(obj, "power.rangers.red")); // Выводит: true
 * console.log(hasOwnNestedPropety(obj, "power.rangers.blue")); // Выводит: false
 * console.log(hasOwnNestedPropety(obj, "power")); // Выводит: true
 * console.log(hasOwnNestedPropety(obj, "power.rangers")); // Выводит: true
 * console.log(hasOwnNestedPropety(obj, "power.rangers.green")); // Выводит: false
 * ```
 */

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

export default hasOwnNestedProperty;
