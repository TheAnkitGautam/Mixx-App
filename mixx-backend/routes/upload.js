const express = require("express");
const upload = require('../middlewares/multer');
const { extractAudioFromFile, downloadVideoFromUrl } = require('../controllers/extract_audio');
const uploadFileToBucket = require('../controllers/storageBucket');
const Project = require('../models/project');
const User = require('../models/user');

const uploadRouter = express.Router();

uploadRouter.post('/upload-url', async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const audioFormat = req.body.audioFormat;
    const userId = req.body.userId;

    try {
        const videoPath = await downloadVideoFromUrl(videoUrl)
        const filePath = await extractAudioFromFile(videoPath.split('/').pop(), audioFormat)
        const url = await uploadFileToBucket(filePath, audioFormat);

        const newProject = new Project({
            name: videoPath.split('/').pop(),
            audioURL: url,
            audioFormat: audioFormat,
            user: userId
        })
        await newProject.save().then(async (project) => {
            await User.findOne({ _id: userId }).then(user => {
                user.savedProjects.push(project);
                user.save();
            })
            res.status(200).json(project);
        })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    } catch (error) {
        res.status(500).json('The URL Format is not supported!')
    }
})

uploadRouter.post('/upload-file', upload, async (req, res) => {
    // specify the output format here
    const audioFormat = req.body.audioFormat;

    try {
        const name = req.file.filename
        const filePath = await extractAudioFromFile(req.file.filename, audioFormat)
        const url = await uploadFileToBucket(filePath, audioFormat);
        const userId = req.body.userId;
        const newProject = new Project({
            name,
            audioFormat,
            audioURL: url,
            user: userId
        });
        await newProject.save()
            .then(async (project) => {
                await User.findOne({ _id: userId }).then(user => {
                    user.savedProjects.push(project);
                    user.save();
                })
                res.status(200).json(project);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    } catch (error) {
        res.status(500).json(error + " error while uploading file")
    }
})

module.exports = uploadRouter