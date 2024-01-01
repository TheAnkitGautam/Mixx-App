const express = require('express');
const Project = require('../../models/project');
const User = require('../../models/user')


const deleteProjectRouter = express.Router();


const deleteProject = async (req, res) => {
      const { projectId, userId } = req.body;
      try {
            const project = await Project
                  .findOne({
                        _id: projectId
                  }).exec();
            if (project) {
                  const user = await User.findOne({ _id: userId }).exec();
                  if (user) {
                        User.updateOne({ _id: userId }, { $pull: { savedProjects: projectId } }).exec();
                  }
                  await project.deleteOne();
                  res.status(200).send("Project Deleted");
            }
            else {
                  res.status(404).send({ error: "Project Not Found" });
            }
      }
      catch (error) {
            res.status(500).send({ error: error });
      }
}


deleteProjectRouter.post('/delete', (req, res) => {
      const { projectId } = req.body;
      if (projectId) {
            deleteProject(req, res);
      }
      else {
            res.status(400).send({ error: "Project Id is compulsory." });
      }
});

module.exports = deleteProjectRouter;