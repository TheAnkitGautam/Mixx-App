const express = require('express');
const Project = require('../../models/project');
const CommentAndTime = require('../../models/comment_and_time');

const CTTRouter = express.Router();

CTTRouter.post('/addCTT', async (req, res) => {
      const { projectId, comment, timeStampStart, timeStampEnd, tags } = req.body;
      try {
            const project = await Project
                  .findOne({
                        _id: projectId
                  }).exec();
            if (project) {
                  const commentAndTime = new CommentAndTime({
                        comment: comment,
                        timeStampStart: timeStampStart,
                        timeStampEnd: timeStampEnd,
                        projectId: projectId,
                        tags: tags
                  });
                  await commentAndTime.save();
                  project.timeStampAndComment.push(commentAndTime);
                  await project.save();
                  res.status(200).send(commentAndTime);
            }
            else {
                  res.status(404).send({ error: "Project Not Found" });
            }
      }
      catch (error) {
            res.status(500).send({ error: error });
      }
});

CTTRouter.post('/deleteCTT', async (req, res) => {
      const { commentAndTimeId } = req.body;
      const commentAndTimeVar = await CommentAndTime.findOne({ _id: commentAndTimeId }).exec();
      if (commentAndTimeVar) {
            const projectId = commentAndTimeVar.projectId;
            const project = Project
                  .findOne({
                        _id: projectId
                  }).exec();
            if (project) {
                  Project.updateOne({ _id: projectId }, { $pull: { timeStampAndComment: commentAndTimeVar } }).exec();
            }
      }

      if (commentAndTimeId) {
            CommentAndTime.deleteOne({ _id: commentAndTimeId })
                  .then(() => {
                        res.status(200).send("Comment and Time Deleted");
                  })
                  .catch((error) => {
                        res.status(500).send({ error: error });
                  })

      }

})


module.exports = CTTRouter;