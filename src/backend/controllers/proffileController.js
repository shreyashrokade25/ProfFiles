const Proffile = require('../models/proffile');

exports.saveProffile = async (req, res) => {
 try {
    const proffile = new Proffile(req.body);
    await proffile.save();
    res.status(200).send({ message: 'ProfFile data saved successfully' });
 } catch (error) {
    res.status(500).send({ message: 'Error saving Proffile data', error });
 }
};