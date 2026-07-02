import { prisma } from "./prisma";

async function main() {
    // Create a new user with a post
    const user = await prisma.acreedor.create({
        data: {
            nombre: "Gonzalito"
        },
        include: {
            deudas: true,
        },
    });
    console.log("Created user:", user);

    // Fetch all users with their posts
    const allAcreedor = await prisma.acreedor.findMany({
        include: {
            deudas: true,
        },
    });
    console.log("All users:", JSON.stringify(allAcreedor, null, 2));
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });