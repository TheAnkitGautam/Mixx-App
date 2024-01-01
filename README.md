## The problem Mixx solves
# Mixx - Audio Conversion Made Easy

Mixx is a web application that makes it easy to convert online videos into audio files of various formats. With a user-friendly interface and powerful features, Mixx is a convenient and versatile tool for those who want to listen to audio versions of their favorite online videos.

# Features

    Convert online videos to audio files
    Add comments and tags to specific timestamps in audio
    View and rework on previous projects
    Secure audio file storage in Firebase

# How to Use Mixx

    Sign up or log in to the Mixx application
    Upload a video file from your device or provide a URL to the video you wish to convert
    Download the converted audio file and play it on the Mixx website
    Add comments and tags to specific timestamps in the audio file (optional)
    View and rework on previous projects as needed (optional)

# Why Choose Mixx?

    User-friendly interface makes audio conversion easy for all users
    Powerful features allow for efficient and convenient audio conversion
    Secure audio file storage ensures your files are safe and easily accessible

Start using Mixx today and experience the convenience and versatility of audio conversion at your fingertips!

# Challenges we ran into

    Ensuring user password security during signup: We used bcrypt to hash the password when the user signup and saved the hashed password in the database.

    Customizing the audio player to our needs: We fixed it by using wavesurfer.

    Showing specific comments/tags when the audio is played: We fetched the whole data of comments and tags when the player is loaded and then took the current time played from wavesurfer. We made a 1-second interval to change the state and changed the mapping of comments and tags accordingly.

    FFMPEG crashing on our machine: We had to reconfigure the Path and System variables to make it work