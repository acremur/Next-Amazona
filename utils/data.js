import bcryptjs from 'bcryptjs'

const data = {
    users: [
        {
            name: 'José Carlos',
            email: 'jose@gmail.com',
            password: bcryptjs.hashSync('250186'),
            isAdmin: true
        },
        {
            name: 'Manuel',
            email: 'manuel@gmail.com',
            password: bcryptjs.hashSync('230460'),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 4.2,
            numReviews: 11,
            countInStock: 22,
            description: 'A popular shirt'
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 90,
            brand: 'Raymond',
            rating: 3.9,
            numReviews: 8,
            countInStock: 14,
            description: 'A popular shirt'
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 90,
            brand: 'Oliver',
            rating: 4.7,
            numReviews: 16,
            countInStock: 27,
            description: 'Smart looking pants'
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Shirts',
            image: '/images/pants2.jpg',
            price: 70,
            brand: 'Zara',
            rating: 3.7,
            numReviews: 7,
            countInStock: 15,
            description: 'Smart looking pants'
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Shirts',
            image: '/images/pants3.jpg',
            price: 75,
            brand: 'Casely',
            rating: 4.3,
            numReviews: 16,
            countInStock: 29,
            description: 'A popular pants'
        },
    ]
}

export default data