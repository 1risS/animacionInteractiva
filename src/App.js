import "./App.css";
import classNames from "classnames"
import { createRef, useState, useEffect } from "react";

const videosRoot = `${process.env.PUBLIC_URL}/videos`;
const videosCount = 12;
const frontVideos = [1, 3, 5, 7, 9, 11]
  .map((i) => `${videosRoot}/${i}.webm`);
const backVideos = [2, 4, 6, 8, 10, 12]
  .map((i) => `${videosRoot}/${i}.webm`);

function App() {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [video, setVideo] = useState(0);
  const [videosToLoad, setVideosToLoad] = useState(videosCount)
  const frontVideoRefs = frontVideos.map(() => createRef());
  const backVideoRefs = backVideos.map(() => createRef());

  const play = (i) => {
    const j = Math.floor(video / 2);
    if (video % 2 === 1) {
      console.log("play back video:", j)
      backVideoRefs.forEach((ref, i) => {
        ref.current.style.display = i === j ? "block" : "hidden"
      })
      frontVideoRefs.forEach((ref, i) => {
        ref.current.style.display = "hidden"
      })
      backVideoRefs[j].current.play()
    } else {
      console.log("play front video:", j)
      frontVideoRefs.forEach((ref, i) => {
        ref.current.style.display = i === j ? "block" : "hidden"
      })
      backVideoRefs.forEach((ref, i) => {
        ref.current.style.display = "hidden"
      })
      frontVideoRefs[j].current.play()
    }
  }

  useEffect(() => {
    console.log("front videos:", frontVideos);
    console.log("back videos:", backVideos);
  }, []);

  useEffect(() => {
    if (videosToLoad === 0) {
      console.log("ready to play")
      setLoading(false);
    }
  }, [videosToLoad])

  useEffect(() => {
    if (!playing) return;
    play(video);
  }, [playing, video])

  const handlePlay = () => {
    setPlaying(true)
  };

  const handleVideoLoadedData = () => {
    setVideosToLoad(prevValue => {
      console.log("videos to load:", prevValue - 1)
      return prevValue - 1
    });
  };

  const handleVideoEnded = () => {
    setVideo(video => {
      const nextVideo = (video + 1) % videosCount;
      console.log("next video", nextVideo)
      return nextVideo;
    })
  }

  // const frontPlaying = playing && video % 2 === 1;
  // const backPlaying = playing && video % 2 === 0;
  // const playingVideo = Math.floor(video / 2);

  return (
    <div className="App">
      <div className="container">
        {!loading && <button className="play" onClick={handlePlay}>Play</button>}
        <div className="front">
          {frontVideos.map((src, i) => (
            <video
              key={src}
              onLoadedData={handleVideoLoadedData}
              onEnded={handleVideoEnded}
              // className={classNames("video", (!frontPlaying || playingVideo !== i) && "hidden")}
              className="video"
              ref={frontVideoRefs[i]}
              width="100%"
              height="100%"
              autoPlay
              muted
            >
              <source src={src} type="video/webm"></source>
            </video>
          ))}
        </div>
        <div className="cosa"></div>
        <div className="back">
          {backVideos.map((src, i) => (
            <video
              key={src}
              onLoadedData={handleVideoLoadedData}
              onEnded={handleVideoEnded}
              className="video"
              // className={classNames("video", (!backPlaying || playingVideo !== i) && "hidden")}
              ref={backVideoRefs[i]}
              width="100%"
              height="100%"
              autoPlay
              muted
            >
              <source src={src} type="video/webm"></source>
            </video>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
