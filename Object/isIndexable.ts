/**
 * Функция `isIndexable` проверяет, является ли переданный ей аргумент индексируемым объектом.
 *
 * @param obj - Значение, которое нужно проверить на индексируемость.
 * @returns Возвращает `true`, если `obj` является индексируемым объектом, и `false` в противном случае.
 *
 * Функция использует оператор `typeof` для проверки, является ли `obj` объектом. Также она проверяет, что `obj` не является `null` и что у объекта есть хотя бы один ключ с помощью метода `Object.keys(obj).length`.
 *
 * Пример использования:
 * ```typescript
 * console.log(isIndexable({ a: 1 })); // Выводит: true
 * console.log(isIndexable(null)); // Выводит: false
 * console.log(isIndexable(42)); // Выводит: false
 * console.log(isIndexable({})); // Выводит: false
 * ```
 */
type Indexable = { [key: string]: any };
const isIndexable = (obj: unknown): obj is Indexable => {
  return typeof obj === "object" && obj !== null && !!Object.keys(obj).length;
};

export default isIndexable;
