const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

async function dbConnect() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("school");

        console.log("Connected to the database successfully");

        // // Insert documents into students collection
        // await db.collection("students").insertMany([
        //     { "name": "John", "age": 22, "major": "Math" },
        //     { "name": "Anna", "age": 20, "major": "Computer Science" },
        //     { "name": "Mike", "age": 21, "major": "Physics" }
        // ]);
        // console.log("Inserted documents into the students collection");

        // // Insert documents into courses collection
        // await db.collection("courses").insertMany([
        //     { "course_name": "Database Systems", "credit_hours": 4 },
        //     { "course_name": "Operating Systems", "credit_hours": 3 },
        //     { "course_name": "Artificial Intelligence", "credit_hours": 4 }
        // ]);
        // console.log("Inserted documents into the courses collection");

        // Close the connection after operations
        await client.close();
    } catch (error) {
        console.error(error)
    }
}


async function useCollection(collectionName) {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('school');
    const coll = db.collection(collectionName);
    return coll;
}

async function insertStudent(student_name, student_age, student_major) {
    const newUser = { name: student_name, age: student_age, major: student_major };
    const result = (await useCollection('students')).insertOne(newUser);
    console.log(`Document id: ${(await result).insertedId}`);
}

async function findAllStudents() {
    const query = {};
    const result = (await useCollection('students')).find(query).toArray();
    return result;
}

async function findStudentByName(studentName) {
    const query = { name: studentName };
    const student = (await useCollection('students')).findOne(query);

    if (student) {
        console.log('User found: ', student);
    } else {
        console.log('No user found with the given criteria');
    }

    return student;
}

async function updateStudent(studentid, newdata) {
    const query = { _id: studentid };
    const result = (await useCollection('students')).updateOne(query, { $set: newdata });

    if (result) {
        console.log(`Matched ${result.matchedCount} document(s)
        and modified ${result.modifiedCount} document(s)`);
    }
}

async function deleteStudent(student_name) {
    const query = { name: student_name };
    const result = (await useCollection('students')).deleteOne(query);

    if (result) {
        console.log(`${result.deletedCount} document(s) deleted.`);
    }
}

async function findStudentByAgeGreaterThan(student_age) {
    const query = { age: student_age };
    const result = (await useCollection('students')).find({ query: { $gt: 20 } })

    if (result) {
        console.log('All students older than 20 years: ', result)
    } else {
        console.log('Not have students oler than 20 years')
    }
}

async function findStudentsByMajor(student_major) {
    const query = { major: student_major };
    const result = (await useCollection('students')).find(query)

    if (result) {
        console.log('All students older than 20 years: ', result)
    } else {
        console.log('Not have students oler than 20 years')
    }
}

async function sortStudentByAge() {
    const query = { age: 1 };
    const result = (await useCollection('students')).find().sort(query).limit(2).toArray();
    if (result) {
        console.log('All students are sorted by age: ', result);
    }
}

async function getAllCourse() {
    const query = {};
    const result = (await useCollection('courses')).find(query).toArray();
    return result;
}

async function findCourseByName(course_name) {
    const query = { course_name: course_name };
    const result = (await useCollection('courses')).findOne(query);
    if (result) {
        console.log('The course is ', result);
    } else {
        console.log('Not found the course by name: ', course_name);
    }
}

async function upsertStudent(query, newName) {
    const params = { upsert: true };
    const result = (await useCollection('students')).updateOne(
        query, { $set: newName }, params
    );
    if ((await result).upsertedCount > 0) {
        console.log(`Inserted a new document with id ${result.upsertedId._id}`)
    } else {
        console.log(`Updated ${result.matchedCount} document(s)
        and modified ${result.modifiedCount} document(s)`);
    }
}


async function deleteAllCourses() {
    const result = (await useCollection('courses')).deleteMany({})
    console.log(`Deleted ${result.deletedCount} document(s)`);
}



module.exports = {
    dbConnect,
    useCollection,
    findStudentByName,
    updateStudent,
    deleteStudent,
    findStudentByAgeGreaterThan,
    findStudentsByMajor,
    sortStudentByAge,
    findAllStudents,
    getAllCourse,
    findCourseByName,
    deleteAllCourses,
    upsertStudent,
    insertStudent
}