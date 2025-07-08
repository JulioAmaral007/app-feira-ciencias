const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // ex: "proj001"
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    materials: {
      type: [String],
      default: [],
    },
    results: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String], // URLs de imagens
      default: [],
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Project', ProjectSchema, 'projetos')
