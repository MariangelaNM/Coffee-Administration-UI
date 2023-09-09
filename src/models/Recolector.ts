/**
 *
 * @export
 * @interface Recolector
 */
export interface Recolector {
  /**
   *
   * @type {number}
   * @memberof Recolector
   */
  Id: number;

  /**
   *
   * @type {number}
   * @memberof Recolector
   */
  CaficultorID:number;
  /**
   *
   * @type {string}
   * @memberof Recolector
   */
  Nombre: string;
  /**
   *
   * @type {string}
   * @memberof Recolector
   */
  Apellidos: string;
  /**
   *
   * @type {string}
   * @memberof Recolector
   */
  Identificacion: string;
  /**
   *
   * @type {number}
   * @memberof Recolector
   */
  Cel: number;
  /**
   *
   * @type {DataViewConstructor}
   * @memberof Recolector
   */
  createdAt:Date

    /**
   *
   * @type {DataViewConstructor}
   * @memberof Recolector
   */
    updatedAt:Date
}
