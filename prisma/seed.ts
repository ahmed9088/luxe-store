import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Categories
    const clothing = await prisma.category.create({
        data: {
            name: 'Clothing',
            slug: 'clothing',
            description: 'Premium apparel for the modern wardrobe',
        },
    });

    const accessories = await prisma.category.create({
        data: {
            name: 'Accessories',
            slug: 'accessories',
            description: 'The perfect additions to your lifestyle',
        },
    });

    const lifestyle = await prisma.category.create({
        data: {
            name: 'Lifestyle',
            slug: 'lifestyle',
            description: 'Curated items for a refined home',
        },
    });

    // Products
    const products = [
        {
            name: 'Essential Linen Shirt',
            slug: 'essential-linen-shirt',
            description: 'A breathable, high-quality white linen shirt perfect for any season. Features a relaxed fit and sustainable buttons.',
            price: 120.00,
            images: JSON.stringify(['/images/linen-shirt.png']),
            categoryId: clothing.id,
            featured: true,
            sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
            colors: JSON.stringify(['White']),
            stock: 50,
        },
        {
            name: 'Tan Leather Tote',
            slug: 'tan-leather-tote',
            description: 'A minimalist tan leather tote handcrafted from premium full-grain leather. Durable, spacious, and timeless.',
            price: 280.00,
            images: JSON.stringify(['/images/leather-bag.png']),
            categoryId: accessories.id,
            featured: true,
            sizes: JSON.stringify(['One Size']),
            colors: JSON.stringify(['Tan']),
            stock: 20,
        },
        {
            name: 'Silver Mesh Watch',
            slug: 'silver-mesh-watch',
            description: 'A sleek silver watch with a minimalist face and mesh band. Water-resistant and versatile.',
            price: 185.00,
            images: JSON.stringify(['/images/silver-watch.png']),
            categoryId: accessories.id,
            featured: true,
            sizes: JSON.stringify(['One Size']),
            colors: JSON.stringify(['Silver']),
            stock: 35,
        },
        {
            name: 'Matte Charcoal Mug',
            slug: 'matte-charcoal-mug',
            description: 'A hand-thrown ceramic mug with a beautiful matte charcoal finish. The perfect companion for your morning ritual.',
            price: 35.00,
            images: JSON.stringify(['/images/ceramic-mug.png']),
            categoryId: lifestyle.id,
            featured: true,
            sizes: JSON.stringify(['350ml']),
            colors: JSON.stringify(['Charcoal']),
            stock: 100,
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
