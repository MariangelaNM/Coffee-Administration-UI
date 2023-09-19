/**
 *
 * @export
 * @interface Recoleccion
 */
export interface Recoleccion {
    /**
     *
     * @type {number}
     * @memberof Recoleccion
     */
    Id: number;
    /**
     *
     * @type {string}
     * @memberof Recoleccion
     */
     createdAt: string;
   /**
     *
     * @type {number}
     * @memberof Recoleccion
     */
    recolector: number;
    /**
     *
     * @type {string}
     * @memberof Recoleccion
     */
    recolectorname:string
     /**
     *
     * @type {number}
     * @memberof Recoleccion
     */
    costo: number;
    /**
     *
     * @type {number}
     * @memberof Recoleccion
     */
    cajuelas: number;
    /**
     *
     * @type {number}
     * @memberof Recoleccion
     */
    cuartillos: number;
    /**
     *
     * @type {number}
     * @memberof Recoleccion
     */
    total: number;
      /**
     *
     * @type {string}
     * @memberof Recoleccion
     */
    pagado: string;
  }
  