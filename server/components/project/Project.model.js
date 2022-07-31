const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require('uuid');

// Model for the Project

const projectDetailsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: false,
    },
});

// Create Schema for Project
const projectSchema = new Schema({
    uid: {
        type: String,
        default: uuid.v1,
    },
    userId: {
        type: String,
        ref: 'User',
        unique: true,
        required: true,
    },
    projects:{
        type: [projectDetailsSchema],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;