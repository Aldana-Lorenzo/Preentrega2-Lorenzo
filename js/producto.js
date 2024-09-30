class Producto {
    constructor(categoria, marca, modelo, precio, descripcion) {
        this.categoria = categoria,
            this.marca = marca,
            this.modelo = modelo,
            this.precio = precio,
            this.descripcion = descripcion

        this.id = this.generar_id()
    }

    // Guardo los caracteres que quiero que figuren aleatoriamente en el id (números y letras mayus y min)
    generar_id() {
        const caracteres = 'ABCDE1FGHIJ2KLMNO3PQRST4UVWXY5Zabcd6efghi7jklmn8opqrs9tuvwx0yz';
        let id = ''; // Inicializo la variable id con un string vacío

        // Primer for para obtener 3 caracteres
        for (let i = 0; i < 2; i++) {

            // Guardo el índice que se genero
            // Math.floor redondea hacia abajo, lo que me da un número entre 0 y 61
            // En caracteres tengo 62 elementos, pero 61 indices porq el conteo inicia en 0
            let index = Math.floor(Math.random() * caracteres.length);

            // Busco en la variable 'caracteres' número generado aleatoriamente y guardado en la variable 'index'
            // Guardo en id el elemento con ese índice
            id += caracteres[index];
        }

        // += va agregando datos a un string ya existente. Los concatena.
        id += '-'

        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * caracteres.length);
            id += caracteres[index];
        }

        return id; // Ej.: 'd3-iR7fm'
    }
}