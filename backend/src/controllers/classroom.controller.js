import { Class, Assignment, Submission } from "../models/classroom.model.js"
import {User } from "../models/user.model.js"


// Endpoint to create a new class
export const createClassroom = async (req, res) => {
  try {
    const { name, description, teacherId } = req.body;

    console.log( name, description, teacherId );

    // Check if the teacher exists
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role != "Teacher") {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Create a new class
    const newClass = new Class({ name, description, teacher: teacherId });
    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Endpoint to get all classes
export const getClassroom = async (req, res) => {
  const {teacherId} = req.body;

  console.log(teacherId);

  try {
    const classes = await Class.find().populate('teacher', teacherId); // Populate teacher's name
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Endpoint to enroll a student in a class

export const enrollAssignment = async (req, res) => {
  try {
    const { studentId } = req.body;
    const classId = req.params.classId;

    // Check if the student and class exist
    const student = await Student.findById(studentId);
    const classObj = await Class.findById(classId);
    if (!student || !classObj) {
      return res.status(404).json({ message: 'Student or class not found' });
    }

    // Enroll student in class
    classObj.students.push(studentId);
    await classObj.save();

    res.status(200).json(classObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Endpoint to create an assignment for a class
export const createAssignment = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const classId = req.params.classId;

    // Check if the class exists
    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Create a new assignment
    const newAssignment = new Assignment({ title, description, due_date, class: classId });
    await newAssignment.save();

    // Update class with the new assignment
    classObj.assignments.push(newAssignment._id);
    await classObj.save();

    res.status(201).json(newAssignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAssignments = async (req, res) => {}