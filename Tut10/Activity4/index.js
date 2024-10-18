require("dotenv").config();
const express = require('express')
const app = express()
const port = 3000
const { dbConnect, findAllStudents, findStudentByName, getAllCourse } = require('./dbOperations')


dbConnect();

// List student
app.get('/students', async (req, res) => {
    try {
        const response = await findAllStudents();
        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch students' })
    }
})

// List course
app.get('/courses', async (req, res) => {
    try {
        const response = await getAllCourse();
        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch courses' })
    }
})


// Find student by name
app.get('/student/:name', async (req, res) => {
    const studentName = req.params.name;
    console.log(studentName)
    if (!studentName) {
        console.error('Not found the student params')
    }
    try {
        const response = await findStudentByName(studentName);
        return res.json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch students' })
    }
})


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))