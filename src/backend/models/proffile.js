const mongoose = require('mongoose');

const proffileSchema = new mongoose.Schema({
    personalDetails: Array,
    EducationDetails: Array,
    Curricular: Array,
    achievements: Array,
    projects: Array 
});

const Proffile = mongoose.model('Proffile', proffileSchema);

module.exports = Proffile;