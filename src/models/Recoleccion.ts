/**
 *
 * @export
 * @interface Recoleccion
 */
export interface Recoleccion {
  //recolectorname: any;
  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  Id?: number;
  /**
   *
   * @type {Date}
   * @memberof Recoleccion
   */
  Creado?: Date;
  /**
   *
   * @type {Date}
   * @memberof Recoleccion
   */
  Modificado?: Date;
  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  RecolectorID?: number;
   /**
   *
   * @type {string}
   * @memberof Recoleccion
   */
   RecolectorNombre?: string;
  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  ZonaID?: number;
  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  PeriodoID?: number;

  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  Cajuelas?: number;
  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  Cuartillos?: number;
  /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
  total?: number;
  /**
   *
   * @type {string}
   * @memberof Recoleccion
   */
  pagado?: string;

    /**
   *
   * @type {number}
   * @memberof Recoleccion
   */
    costo?: number;
  
    /**
   *
   * @type {Boolean}
   * @memberof Recoleccion
   */
    status?: Boolean;  
}
