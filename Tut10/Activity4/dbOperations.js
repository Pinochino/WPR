const { ObjectId } = require('mongodb');

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

async function updateStudent(studentName, newdata) {
    const query = { name: studentName };
    const result = await (await useCollection('students')).updateOne(query, { $set: newdata });

    if (result) {
        console.log(`Matched ${result.matchedCount} document(s)
        and modified ${result.modifiedCount} document(s)`);
    }

    return result;
}

async function deleteStudentByName(student_name) {
    const query = { name: student_name };
    const result = (await useCollection('students')).deleteOne(query);

    if (result) {
        console.log(`${result.deletedCount} document(s) deleted.`);
    }
    return result;
}

async function deleteStudentById(student_id) {
    const query = { _id: new ObjectId(student_id) };
    const result = (await useCollection('students')).deleteOne(query);

    if (result) {
        console.log(`${result.deletedCount} document(s) deleted.`);
    }
    return result;
}

async function findStudentByAgeGreaterThan(student_age) {
    const query = { age: { $gt: student_age } };
    const result = await (await useCollection('students')).find(query).toArray();

    if (!result) {
        console.log(`Not have students oler than ${student_age} years`)
    }

    return result;
}

async function findStudentsByMajor(student_major) {
    const query = { major: student_major };
    const result = (await useCollection('students')).find(query).toArray();

    if (result) {
        console.log('All students older than 20 years: ', result)
    } else {
        console.log('Not have students oler than 20 years')
    }
    return result;
}

async function sortStudentByAge(dataSort, order, dataNums) {
    const sortOrder = order === 'asc' ? 1 : -1;
    const query = { [dataSort]: sortOrder };
    const result = await (await useCollection('students')).find().sort(query).limit(dataNums).toArray();
    return result;
}

async function getAllCourse() {
    const query = {};
    const result = (await useCollection('courses')).find(query).toArray();
    return result;
}

async function findCourseByName(course_name) {
    const query = { course_name: course_name };
    const result = (await useCollection('courses')).findOne(query);
    return result;
}

async function upsertStudent(query, newName) {
    const params = { upsert: true };
    const result = (await useCollection('students')).updateOne(
        query, { $set: newName }, params
    );
    return result;
}


async function deleteAllCourses() {
    const result = (await useCollection('courses')).deleteMany({})
    console.log(`Deleted ${result.deletedCount} document(s)`);
    return result;
}

async function insertStudent(student_name, student_age, student_major) {
    const query = { name: student_name, age: student_age, major: student_major };
    const result = (await useCollection('students')).insertOne(query);
    return result;
}

async function insertCourse(course_name, credit_hour) {
    const query = { name: course_name, hour: credit_hour };
    const result = (await useCollection('courses')).insertOne(query);
    return result;
}


module.exports = {
    dbConnect,
    insertCourse,
    insertStudent,
    useCollection,
    findStudentByName,
    updateStudent,
    deleteStudentByName,
    findStudentByAgeGreaterThan,
    findStudentsByMajor,
    sortStudentByAge,
    findAllStudents,
    getAllCourse,
    findCourseByName,
    deleteAllCourses,
    upsertStudent,
    insertStudent,
    deleteStudentById
}