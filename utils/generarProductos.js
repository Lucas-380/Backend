import { faker } from '@faker-js/faker'

function generarProducto(id){
    return {
        id,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
    }
}

export { generarProducto }