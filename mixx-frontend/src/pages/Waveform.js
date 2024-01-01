import React, { useEffect, useRef, useState } from "react";
import "./Waveform.css";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsFillStopCircleFill } from "react-icons/bs";
import { BiDownArrowAlt } from "react-icons/bi";
import TimelinePlugin from "wavesurfer.js/src/plugin/timeline/index.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "rgba(7, 68, 198,0.3)",
  progressColor: "#0744C6",
  cursorColor: "#FFFFFF",
  cursorWidth: 3,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 100,
  normalize: true,
  partialRender: true,
  plugins: [
    TimelinePlugin.create({
      // plugin options ...
      container: "#waveform-timeline",
      // primaryColor: "white",
      // secondaryColor: "red",
      primaryFontColor: "white",
      secondaryFontColor: "transparent",
      // secondaryColor: "yellow",
      // timeInterval: 0,
      primaryLabelInterval: 2,
      secondaryLabelInterval: 1,
    }),
  ],
});

export default function Waveform({ url, setMaxLength, setCurrent }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    // const newUrl = 'https://crossorigin.me/'+url;
    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        // wavesurfer.current.Timeline();
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    setMaxLength(wavesurfer.current.getDuration());
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();


  }, [url]);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setCurrent(wavesurfer.current.getCurrentTime());
    }, 1000);
    // const timeOut = setTimeout(wavesurfer.current.getCurrentTime(), 1000);
    // // console.log(timeOut)
    // startTimer();
  }, [])
  var timer;


  // const startTimer = () => {
  //   timer = setInterval(function () {
  //     getCurrentTime();
  //   }, 1000);
  // 
  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const handleStop = () => {
    setPlay(false);
    wavesurfer.current.stop();
  };

  // const onVolumeChange = (e) => {
  //   const { target } = e;
  //   const newVolume = +target.value;

  //   if (newVolume) {
  //     setVolume(newVolume);
  //     wavesurfer.current.setVolume(newVolume || 1);
  //   }
  // };

  return (
    <div>
      <a href={url} download rel="noreferrer" target="_blank">
        <div className="download-button">
          <BiDownArrowAlt size="2em" />
        </div>
      </a>
      <div id="waveform" ref={waveformRef}></div>
      <div id="waveform-timeline"></div>
      <div className="controls">
        <div onClick={handlePlayPause}>
          {!playing ? <FaPlay size="1.5em" style={{ cursor: "pointer" }} /> : <FaPause size="1.5em" style={{ cursor: "pointer" }} />}
        </div>
        <div onClick={handleStop} style={{ marginLeft: "10px" }}>
          <BsFillStopCircleFill size="1.5em" style={{ cursor: "pointer" }} />
        </div>
        {/* <label htmlFor="volume">Volume</label> */}
      </div>
    </div>
  );
}
