const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath);

const fs = require('fs');
const request = require('request');
const getRandomId = require("../utils/file_id");
const io = require('socket.io')({
    cors: {
        origin: '*'
    }
});

const Upload_Directory_path = process.env.Upload_Directory_path
const Output_Directory_path = process.env.Output_Directory_path


const extractAudioFromFile = (fileName, audioFormat) => {
    return new Promise((resolve, reject) => {

        const videoPath = Upload_Directory_path + fileName

        const ffmpegProcess = new ffmpeg(videoPath)
            .outputOptions([])
            // .audioCodec(audioFormat)
            .format(audioFormat === 'aac' ? 'adts' : audioFormat)
            .on('start', () => {
                console.log("Status: Conversion Started\n")
                io.emit('ffmpeg_progress', "conversion started");
            })
            .on('progress', (progress) => {
                console.log('Processing: ' + Math.floor(progress.percent) + '% done');
                io.emit('ffmpeg_progress', progress.percent);
            })
            .on('end', () => {
                console.log("\nStatus: Conversion Successful!!!")
                io.emit('ffmpeg_progress', 'Conversion Successful!!!')
            })
            .on('error', (err) => {
                console.error(err);
            })
            .save(Output_Directory_path + fileName.split('.')[0] + '.' + audioFormat)


        // When the process is finished, resolve the promise
        ffmpegProcess.on('end', () => {
            fs.unlinkSync(videoPath)
            return resolve(
                `${Output_Directory_path}${fileName.split('.')[0]}.${audioFormat}`
            )
        });

        // If an error occurs, reject the promise
        ffmpegProcess.on('error', () => reject('Error while converting file'));
    })
}

const downloadVideoFromUrl = (videoUrl) => {
    var videoExtention = videoUrl.split('.').pop();
    var videoName = getRandomId() + '.' + videoExtention;

    return new Promise((resolve, reject) => {
        const downloadProcess = request(videoUrl)
            .pipe(fs.createWriteStream(`${Upload_Directory_path}${videoName}`))

        downloadProcess.on('finish', () => {
            resolve(`${Upload_Directory_path}${videoName}`);
        })
        downloadProcess.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { extractAudioFromFile, downloadVideoFromUrl };