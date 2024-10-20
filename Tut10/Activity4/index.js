require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const {
    dbConnect,
    findAllStudents,
    findStudentByName,
    getAllCourse,
    findCourseByName,
    upsertStudent,
    deleteStudentByName,
    deleteAllCourses,
    findStudentByAgeGreaterThan,
    findStudentsByMajor,
    sortStudentByAge,
    updateStudent,
    insertStudent,
    deleteStudentById,
    insertCourse,
} = require("./dbOperations");

dbConnect();

// [GET] /students (get all students)
app.get("/students", async (req, res) => {
    try {
        const response = await findAllStudents();
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [GET] /courses (get all courses)
app.get("/courses", async (req, res) => {
    try {
        const response = await getAllCourse();
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [GET] /student/:name (Find student by name)
app.get("/student/:name", async (req, res) => {
    const studentName = req.params.name;
    if (!studentName) {
        return res
            .status(404)
            .json({ message: `Student with name ${studentName} not found.` });
    }
    try {
        const response = await findStudentByName(studentName);
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [GET] /course/:name (Find course by name)
app.get("/course/:name", async (req, res) => {
    const courseName = req.params.name;
    if (!courseName) {
        return res
            .status(404)
            .json({ message: `Course with name ${courseName} not found.` });
    }
    try {
        const response = await findCourseByName(courseName);
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [PUT] /student/update/:name/:major (Upate student's major by name)
app.put("/student/update/:name/:major", async (req, res) => {
    const studentName = req.params.name;
    const studentMajor = req.params.major;
    console.log(studentName + ' and ' + studentMajor)
    if (!studentName || !studentMajor) {
        return res
            .status(404)
            .json({ message: `Student with name ${studentName} not found.` });
    }
    try {
        const studentUpdate = await updateStudent(studentName, { major: studentMajor });
        if (studentUpdate.matchedCount === 0) {
            return res.status(404).json({ message: `Student with name ${studentName} not found.` });
        }
        console.log(studentUpdate)
        return res.json(studentUpdate);
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [GET] /student/upsert/:name/:major (update student if student's name have not existed)
app.put("/student/upsert/:name/:major", async (req, res) => {
    const studentName = req.params.name;
    const studentMajor = req.params.major;
    console.log(studentName + ' and ' + studentMajor);
    try {
        const updateStudent = await upsertStudent(
            { name: studentName },
            { name: studentName, major: studentMajor }
        );
        return res.json(updateStudent);
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [DELETE] /student/delete/:name (delete student by name)
app.delete("/student/deleteByName/:name", async (req, res) => {
    const studentName = req.params.name;
    if (!studentName) {
        return res
            .status(404)
            .json({ message: `Student with name ${studentName} not found.` });
    }

    try {
        const deleteStudent = await deleteStudentByName(studentName);
        if (deleteStudent) {

            return res.json({ message: `Delete successfully name ${studentName}` });
        }
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [DELETE] /student/delete/:id (delete student by id)
app.delete("/student/deleteById/:id", async (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
        return res
            .status(404)
            .json({ message: `Student with name ${studentId} not found.` });
    }

    try {
        const deletStudent = await deleteStudentById(studentId);
        if (deletStudent) {
            return res.json({ message: `Delete successfully id ${studentId}` });
        }
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
});

// [DELETE] /courses/deleteAll (delete all courses)
app.delete('/courses/deleteAll', async (req, res) => {
    try {
        await deleteAllCourses();
        return res.json({ message: `Deleted successfully all courses` })
    } catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
})

// [GET] /student?age= (Find students who have age greater than 20)
app.get('/student', async (req, res) => {
    const studentAge = Number(req.query.age);
    if (!studentAge) {
        return res.status(400).send({ message: `Cannot find the ${studentAge}` })
    }

    try {
        const students = await findStudentByAgeGreaterThan(studentAge);
        return res.json(students);
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` })
    }
})

// [GET] /student?major= (find student by student's major)
app.get('/student', async (req, res) => {
    const studentMajor = req.query.major;
    if (!studentMajor) {
        return res.status(400).send({ message: `Cannot find ${studentMajor} params` })
    }

    try {
        const students = await findStudentsByMajor(studentMajor);
        return res.json(students);
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` })
    }
})

// [GET] /student/sort/:sort/:order/:limit (sort student by ?, order = ?, limit = ?)
app.get('/student/sort/:sort/:order/:limit', async (req, res) => {
    const dataSort = req.params.sort;
    const orderSort = req.params.order;
    const dataNums = Number(req.params.limit)

    try {
        const result = await sortStudentByAge(dataSort, orderSort, dataNums);
        if (result.length === 0) {
            return res.status(404).json({ message: "No students found." });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` })
    }
})

// [POST] /student/insert/:name/:age/:major (insert the student data)
app.post('/student/insert/:name/:age/:major', async (req, res) => {
    const { name, age, major } = req.params;

    try {
        const result = await insertStudent(name, Number(age), major);
        return res.json(result)
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` })
    }
})


// [POST] /course/insert/:name/:hour (insert the course data)
app.post('/course/insert/:name/:hour', async (req, res) => {
    const { name, hour } = req.params;

    try {
        const result = await insertCourse(name, Number(hour));
        return res.json(result)
    } catch (error) {
        return res.status(500).send({ message: `${error.message}` })
    }
})



app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);
