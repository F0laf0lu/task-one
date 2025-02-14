const express = require('express');
const Joi = require("joi");
const app = express();

app.use(express.json()); 

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.use(express.json())

const courseSchema = Joi.object({
    name: Joi.string().min(3).required(), 
});



app.get('/', (req, res) => {
    res.send("Hello World");
});


app.get('/api/courses', (req, res) => {
    res.json(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
});


app.post('/api/courses', (req, res) => {
    const { error } = courseSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.status(201).json(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');

    const { error } = courseSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    course.name = req.body.name;
    res.json(course);
});


app.delete('/api/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (courseIndex === -1) return res.status(404).send('Course not found');

    courses.splice(courseIndex, 1);
    res.status(204).send(); 
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
