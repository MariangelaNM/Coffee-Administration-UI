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
  id: number;
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
  Value: number;
}
