
/**
 * @export
 * @interface Resumen
 */
export interface Resumen {
    /**
     * @type {number}
     * @memberof Resumen
     */
    Id: number;
  
    /**
     * @type {string}
     * @memberof Resumen
     */
    Nombre: string;
  
    /**
     * @type {string}
     * @memberof Resumen
     */
    Apellido: string;
  
    /**
     * @type {number}
     * @memberof Resumen
     */
    Periodo: number;
  
    /**
     * @type {string}
     * @memberof Resumen
     */
    Zona: string;
  
    /**
     * @type {number}
     * @memberof Resumen
     */
    Total: number;
  
    /**
     * @type {Recoleccion}
     * @memberof Resumen
     */
    Recoleccion: {
      /**
       * @type {number}
       * @memberof Recoleccion
       */
      cajuelas: number;
  
      /**
       * @type {number}
       * @memberof Recoleccion
       */
      cuartillos: number;
    };
  }
  