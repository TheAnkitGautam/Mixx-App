const serviceAccount = require('../firebase-admin-creds');
const admin = require("firebase-admin");
const fs = require('fs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.storageBucket
});

const bucket = admin.storage().bucket();

const uploadFileToBucket = async (filePath, audioFormat) => {
    return new Promise((resolve, reject) => {
        bucket.upload(filePath, {
            validation: 'md5',
            metadata: {
                contentType: `audio/${audioFormat}`,
            },
        }, (err, file) => {
            if (err) {
                reject(err);
            } else {
                file.getSignedUrl({
                    action: 'read',
                    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
                    virtualHostedStyle: true
                }, (err, url) => {
                    if (err) {
                        reject(err);
                    } else {
                        fs.unlinkSync(filePath);
                        resolve(url);
                    }
                })
            }
        });
    });
}

module.exports = uploadFileToBucket;