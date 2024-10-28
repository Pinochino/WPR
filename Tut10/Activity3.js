const { MongoClient } = require('mongodb');
const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'books_db';

async function connectToDatabase() {
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        console.log('Connected to the database');
        return client;
    } catch (error) {
        console.log(error);
    }
}

async function insertData(db) {
    try {
        const bookCollection = await db.collection('books');
        await bookCollection.insertMany([{
            title: "MongoDB Guide",
            tag: ["mongodb", "guide", "database"],
            n: 100,
            review_score: 4.3,
            price: [
                { v: 19.99, c: "€", country: "IT" },
                { v: 18, c: "£", country: "UK" }
            ],
            author: {
                _id: 1,
                name: "Mario",
                surname: "Rossi"
            }
        },
        {
            title: "Developing with Python",
            tag: ["python", "guide", "programming"],
            n: 352,
            review_score: 4.6,
            price: [
                { v: 24.99, c: "€", country: "IT" },
                { v: 19.49, c: "£", country: "UK" }
            ],
            author: {
                _id: 2,
                name: "John",
                surname: "Black"
            }
        }])
        console.log('Data inserted successfully');
    } catch (error) {
        console.log(error);
    }
}

async function findBookByNumberOfPage(db) {

    try {
        const bookCollection = await db.collection('books');
        const books = await bookCollection.find({ n: { $gt: 250 } }).toArray();
        console.log(books);
    } catch (error) {
        console.log(error);
    }
}
async function findBookByAuthorized(db) {
    try {
        const bookCollection = await db.collection('books');
        const books = await bookCollection.find({ 'author.name': 'Mario', 'author.surname': 'Rossi' }).toArray()
        console.log(books);
    } catch (error) {
        console.log(error);
    }
}

async function findBookByPrice(db) {
    try {
        const bookCollection = await db.collection('books');
        const books = await bookCollection.find({
            price: {
                $elemMatch: {
                    v: { $lt: 20 },
                    country: 'IT'
                }
            }
        }).toArray();
        console.log(books);
    } catch (error) {
        console.log(error);
    }
}

async function increaseReviewScore(db) {
    try {
        const bookCollection = db.collection('books');

        const result = await bookCollection.updateMany(
            { tag: "database" },
            { $inc: { review_score: 0.2 } }
        );

        console.log(`${result.matchedCount} books matched, ${result.modifiedCount} books updated.`);
    } catch (error) {
        console.log("Error updating review scores:", error);
    }
}

async function addNoSQLTag(db) {
    try {
        const bookCollection = db.collection('books');

        const result = await bookCollection.updateMany(
            { tag: "mongodb" },
            { $addToSet: { tag: "NoSQL" } }  // $addToSet ensures no duplicate tags
        );

        console.log(`${result.matchedCount} books matched, ${result.modifiedCount} books updated.`);
    } catch (error) {
        console.log("Error adding NoSQL tag:", error);
    }
}

async function addPublisherForMarioRossi(db) {
    try {
        const bookCollection = db.collection('books');

        const result = await bookCollection.updateMany(
            { "author.name": "Mario", "author.surname": "Rossi" },
            { $set: { publisher: { name: 'Polito', city: 'Turin' } } }
        );

        console.log(`${result.matchedCount} books matched, ${result.modifiedCount} books updated.`);
    } catch (error) {
        console.log("Error adding publisher:", error);
    }
}

async function getPriceStats(db) {
    try {
        const bookCollection = db.collection('books');

        const result = await bookCollection.aggregate([
            { $match: { tag: "database" } },  // Filter books with tag "database"
            { $unwind: "$price" },  // Unwind the price array to get individual prices
            {
                $group: {
                    _id: null,  // We don't need to group by a specific field
                    maxPrice: { $max: "$price.v" },
                    minPrice: { $min: "$price.v" },
                    avgPrice: { $avg: "$price.v" }
                }
            }
        ]).toArray();

        console.log(result[0]);
    } catch (error) {
        console.log("Error calculating price stats:", error);
    }
}

async function countBooksByMarioRossi(db) {
    try {
        const bookCollection = db.collection('books');

        const count = await bookCollection.countDocuments({
            "author.name": "Mario",
            "author.surname": "Rossi"
        });

        console.log(`Number of books authored by Mario Rossi: ${count}`);
    } catch (error) {
        console.log("Error counting books:", error);
    }
}

async function main() {
    let client;
    try {
        client = await connectToDatabase();
        const db = client.db(DATABASE_NAME);
        await findBookByPrice(db);
    } catch (error) {
        console.log(error);
    }
}




main();