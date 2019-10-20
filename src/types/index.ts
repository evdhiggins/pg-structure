import { Relation } from "..";

export * from "./json";

/**
 * Actions performed when the data in the foreign key referenced columns is changed.
 */
export const enum Action {
  Cascade = "CASCADE",
  SetNull = "SET NULL",
  SetDefault = "SET DEFAULT",
  Restrict = "RESTRICT",
  NoAction = "NO ACTION",
}

/**
 * A value inserted into the referencing column(s) is matched against the values of the referenced table and referenced columns using the given match type.
 */
export enum MatchType {
  Full = "FULL",
  Partial = "PARTIAL",
  Simple = "SIMPLE",
}

/**
 * Case type for database object names.
 */
export const enum CaseType {
  CamelCase = "camelCase",
  SnakeCase = "snakeCase",
}

/** PostgreSQL system-defined values of typcategory. See [pg_type](https://www.postgresql.org/docs/current/catalog-pg-type.html) in PostgreSQL docs. */
export type TypeCategory = "A" | "B" | "C" | "D" | "E" | "G" | "I" | "N" | "P" | "R" | "S" | "T" | "U" | "V" | "X"; // https://www.postgresql.org/docs/current/catalog-pg-type.html#CATALOG-TYPCATEGORY-TABLE

/**
 * Type for functions to generate names for relations. All necessary information such as {@link Table table} names,
 * {@link Column columns}, {@link ForeignKey foreign key}, {@link DbObject.commentData comment data} can be accessed via passed {@link Relation relation} parameter.
 *
 * @example
 * const config = {
 *   relationNameFunction: (relation) => inflection.pluralize(relation.targetTable.name),
 * }
 */
export type RelationNameFunction = (relation: Relation) => string;

/**
 * Name of the builtin relation name function.
 */
export type BuiltinRelationNameFunction = "short" | "descriptive";

/**
 * Type to store a relation name collision. Keys are relation names and values are information about relations with that name.
 */
export type RelationNameCollision = { [relationName: string]: string[] };

/**
 * Type to store relation name collisions by tables.
 *
 * @example
 * {
 *   'public.contact': {
 *     m2o: [],
 *     o2m: [
 *       {
 *         carts: [
 *           '[public.contact]――― cart_contact ――⥷ [public.cart]',
 *           '[public.contact]――― other_cart_contact ――⥷ [other_schema.cart]'
 *         ]
 *       }
 *     ],
 *     m2m: []
 *    }
 * }
 */
export type CollisionsByTable = {
  [tableFullName: string]: { m2o: RelationNameCollision[]; o2m: RelationNameCollision[]; m2m: RelationNameCollision[] };
};
