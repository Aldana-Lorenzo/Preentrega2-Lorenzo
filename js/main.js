//! Ecommerce simple

// 1. Pedirle al usuario la categoría que busca (filtrar)
// 2. Darle la opción de ordenar los productos enumerados por orden alfabético o por precio asc o desc (filtrar)
// 3. Mostrar la lista filtrada de productos (mediante un prompt)
// 4. Poder acceder a ver la descripción de cada producto según la lista numerada o volver al menú principal 
// 5. Darle la opción de agregar el producto seleccionado al carrito (comprarlo) o volver al menú anterior
// 6. Si lo agrega al carrito, darle la opción de finalizar la compra o seguir comprando volviendo al menú anterior (o incluso al menu principal para cambiar de categoría)
// 7. Cuando finaliza la compra, mostrar los productos que compró y el precio total de su compra


let sistema = new Sistema_productos()
let categoria_seleccionada;
let productos_a_filtrar;
let carrito = [];
let seguir_comprando = true;

alert(`¡BIENVENIDO a TechSolutions!`)

while (seguir_comprando) {

    let opciones = prompt(`Indica la categoría que te interese: \n     1. Notebooks \n     2. Celulares \n     3. Tablets`)

    while (true) {

        if ((isNaN(opciones) || opciones < 1 || opciones > 3)) {
            alert('Por favor ingresa una opción válida de filtrado')
            opciones = prompt(`Indica la categoría que te interese: \n     1. Notebooks \n     2. Celulares \n     3. Tablets`)

        } else {
            opciones = Number(opciones)

            if (opciones == 1) {
                // Le asigno un valor a la categoría seleccionada
                categoria_seleccionada = 'Notebooks'

                // Guardo en la variable 'productos_a_filtrar' un array de objetos de los productos cuya categoría coincida con el número indicado por el usuario
                productos_a_filtrar = sistema.filtrar_categorias(categoria_seleccionada)
                break

            } else if (opciones == 2) {
                categoria_seleccionada = 'Celulares'
                productos_a_filtrar = sistema.filtrar_categorias(categoria_seleccionada)
                break

            } else {
                categoria_seleccionada = 'Tablets'
                productos_a_filtrar = sistema.filtrar_categorias(categoria_seleccionada)
                break
            }
        }
    }

    let filtro = prompt(`A continuación podras filtrar nuestros productos a tu conveniencia. Presiona: \n     1. Precio de menor a mayor \n     2. Precio de mayor a menor \n     3. Alfabéticamente A-Z`)

    while (true) {

        if (isNaN(filtro) || filtro < 1 || filtro > 3) {
            alert('Por favor ingresa una opción válida de filtrado')
            filtro = prompt(`A continuación podras filtrar nuestros productos a tu conveniencia. Presiona: \n     1. Precio de menor a mayor \n     2. Precio de mayor a menor \n     3. Alfabéticamente A-Z`)

        } else {
            filtro = Number(filtro)

            // Filtro según la opción elegida por el usuario
            if (filtro == 1) {
                // Actualizo el contenido del array guardado en productos_a_filtrar
                // Guardo el mismo array pero aplicando la funcion de ordenar alfabéticamente por marca
                productos_a_filtrar = sistema.filtrar_precios_asc(productos_a_filtrar)
                break

            } else if (filtro == 2) {
                productos_a_filtrar = sistema.filtrar_precios_desc(productos_a_filtrar)
                break

            } else {
                productos_a_filtrar = sistema.filtrar_marca(productos_a_filtrar)
                break
            }
        }
    }

    let producto_seleccionado;

    while (true) {

        // En esta variable guardo el número del producto que quiere comprar el usuario
        // Con .map() creo un nuevo array en donde (además de ya estar ordenados por marca en el paso anterior), muestro cierta info de cada producto que se va iterando.
        // Le paso 2 parámetros a .map() para tener la info del producto en si, y también su índice para poder enumerar cada elemento
        producto_seleccionado = prompt(`Categoría ${categoria_seleccionada.toLocaleUpperCase()}: \nIndica el número del producto que desea ver en detalle. \n\n${productos_a_filtrar.map((producto, i) => `${i + 1}. ${producto.marca} ${producto.modelo}: $${producto.precio}`).join('\n')} \n\nPresiona 0 para volver al manú principal `)

        if (producto_seleccionado == 0) {
            break;

        } else if (isNaN(producto_seleccionado) || producto_seleccionado < 0 || producto_seleccionado > productos_a_filtrar.length) {
            alert('Por favor ingresa una opción válida')

        } else {
            producto_seleccionado = Number(producto_seleccionado) - 1

            // Acá selecciono el objeto que se encuentra dentro del índice, que es el número que seleccionó el usuario
            let producto_elegido = productos_a_filtrar[producto_seleccionado]

            let agregar_a_carrito = confirm(`${producto_elegido.categoria}: ${producto_elegido.marca} ${producto_elegido.modelo} $${producto_elegido.precio} \nID del producto: ${producto_elegido.id} \n\n${producto_elegido.descripcion} \n\nPresione Aceptar para cargar el producto al carrito o Cancelar para volver al menú anterior`)

            if (agregar_a_carrito) {
                carrito.push(producto_elegido)

                seguir_comprando = confirm(`¡Producto agregado con éxito al carrito! \n\nPresione Aceptar para seguir comprando o Cancelar para finalizar la compra`)

                if (!seguir_comprando) {
                    let total_compra = sistema.sumar_precio(carrito)
                    alert(`Resumen: \n${carrito.map((producto, i) => `${i + 1}. ${producto.marca} ${producto.modelo}: $${producto.precio}`).join('\n')} \n\nAbonarás un total de $${total_compra} \n\n¡Gracias por tu compra!`)

                    break
                }
            }
        }
    }
}