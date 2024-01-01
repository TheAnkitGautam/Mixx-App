const express = require('express');
const verify = require('../../middlewares/verify');
const Project = require('../../models/project');
const User = require('../../models/user');

const getAllCTT = express.Router();

getAllCTT.post('/getAllCTT', async (req, res) => {
      const { projectId } = req.body;
      await Project.findOne({ _id: projectId })
            .then(async project => {
                  let allCTT = [];
                  let CTTCount = 0;
                  if (project.timeStampAndComment.length == 0) {
                        let noProjects = []
                        res.status(200).send(noProjects);
                  }
                  project.timeStampAndComment.forEach(async projectNew => {
                        allCTT.push(projectNew);
                        CTTCount++;
                        if (CTTCount === project.timeStampAndComment.length) {
                              res.status(200).json(allCTT);
                        }
                  })
            }
            )
            .catch(err => {
                  res.status(500).json({ error: err });
            }
            );
});


module.exports = getAllCTT;