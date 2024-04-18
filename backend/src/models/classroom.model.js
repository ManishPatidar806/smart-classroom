import mongoose from "mongoose";

// Define Class Schema
const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Class = mongoose.model('Class', classSchema);

// Define Assignment Schema
const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    due_date: {
        type: Date,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);

// Define Submission Schema
const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // assignment: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Assignment',
    //     required: true
    // },
    submissionText: {
        type: String
    },
    submittedFiles: [{
        type: String  // Assuming file paths are stored
    }],
    submissionDate: {
        type: Date,
        default: Date.now
    }
});

export const Submission = mongoose.model('Submission', submissionSchema);