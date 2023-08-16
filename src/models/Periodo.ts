/**
 *
 * @export
 * @interface Periodo
 */
export interface Periodo {
  /**
   *
   * @type {number}
   * @memberof Periodo
   */
  Id: number;
  /**
   *
   * @type {number}
   * @memberof Periodo
   */
  TipoRecoleccionID: number;
  /**
   *
   * @type {Date}
   * @memberof Periodo
   */
  Desde: Date;
  /**
   *
   * @type {Date}
   * @memberof Periodo
   */
  Hasta: Date;
  /**
   *
   * @type {number}
   * @memberof Periodo
   */
  PrecioCajuela: number;
  /**
   *
   * @type {number}
   * @memberof Periodo
   */
  CaficultorID: number,
  /**
   *
   * @type {Date}
   * @memberof Periodo
   */
  createdAt: Date,
  /**
   *
   * @type {Date}
   * @memberof Periodo
   */
  updatedAt: Date
}
