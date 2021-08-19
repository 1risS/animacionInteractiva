import "./App.css";
import { createRef, useState, useEffect } from "react";
import './fonts/BILLO.TTF'
import neko from "./assets/neko.svg"
import wings from "./assets/wings.gif"
import butterflies from "./assets/but.gif"
import sparkles1 from "./assets/star.gif"
import star2 from "./assets/star2.gif"


const videosRoot = `${process.env.PUBLIC_URL}/videos`;
const videosCount = 12;
const frontVideos = [1, 3, 5, 7, 9, 11].map((i) => `${videosRoot}/${i}.webm`);
const backVideos = [2, 4, 6, 8, 10, 12].map((i) => `${videosRoot}/${i}.webm`);



function App() {
  const [video, setVideo] = useState(0);
  const [showButterflies, setShowButterflies] = useState(false);
  const frontVideoRefs = frontVideos.map(() => createRef());
  const backVideoRefs = backVideos.map(() => createRef());

  // const play = useCallback((i) => {
  //   const j = Math.floor(i / 2);
  //   if (i % 2 === 1) {
  //     console.log("play back video:", j);
  //     backVideoRefs[j].current.play();
  //   } else {
  //     console.log("play front video:", j);
  //     frontVideoRefs[j].current.play();
  //   }
  // }, [backVideoRefs, frontVideoRefs]);

  useEffect(() => {
    console.log("front videos:", frontVideos);
    console.log("back videos:", backVideos);
  }, []);

  // useEffect(() => {
  //   play(video);
  // }, [play, video])

  const handleVideoEnded = () => {
    setVideo((video) => {
      const nextVideo = (video + 1) % videosCount;
      const frontPlaying = nextVideo % 2 === 0;
      const backPlaying = nextVideo % 2 === 1;
      const index = Math.floor(nextVideo / 2);
      const frontVideo = frontVideos[index];
      const backVideo = backVideos[index];
      if (frontPlaying) {
        console.log("next video", nextVideo, "video:", frontVideo);
      } else {
        console.log("next video", nextVideo, "video:", backVideo);
      }
        
      return nextVideo;
    });
  };

  useEffect(() => {
    console.log("showButterflies", showButterflies)
  }, [showButterflies]);

  const handleShowButterflies = () => {
    setShowButterflies(true);
    setTimeout(() => {
      setShowButterflies(false);
    }, 15000);
  }

  const frontPlaying = video % 2 === 0;
  const backPlaying = video % 2 === 1;

  const index = Math.floor(video / 2);
  const frontVideo = frontVideos[index];
  const backVideo = backVideos[index];

  return (
    <div className="App">
      <div className="container">
        <div className="navbarContainer">
          <div className="logoCont">
            <img className="neko" src={neko} alt="neko" height="100px"></img>
            <img className="wings" src={wings} alt="wings"></img>
          </div>
          <div className="title">Neko!</div>
          <div className="space"></div>
        </div>
        <div className="contentCont">
          <div className="background"></div>
          <div className="background clouds"></div>
          <div className="sideBarCont">
            <div className="buttonA" onClick={handleShowButterflies}> BUT</div>
          </div>
          
          {showButterflies && <img className="but butA" id="but" src={butterflies} alt="butterflies" />}
          
          {/* video 1 */}

          {frontPlaying && (
            <div className="front">
              <video
                key={frontVideo}
                onEnded={handleVideoEnded}
                // className={classNames("video", (!frontPlaying || playingVideo !== i) && "hidden")}
                className="video"
                ref={frontVideoRefs[index]}
                width="100%"
                height="100%"
                autoPlay
                muted
              >
                <source src={frontVideo} type="video/webm"></source>
              </video>
            </div>
          )}

          {/* img intermedia */}
          <div className="cosa0">
            <img className="star2" src={star2} alt="stars"></img>
          </div>
          <div className="cosa">
            <img className="sparkles1" src={sparkles1} alt="sparkles1" height="300px" />
          </div>

          {/* video atrás */}
          {backPlaying && (
            <div className="back">
              <video
                key={backVideo}
                onEnded={handleVideoEnded}
                className="video"
                // className={classNames("video", (!backPlaying || playingVideo !== i) && "hidden")}
                ref={backVideoRefs[index]}
                width="100%"
                height="100%"
                autoPlay
                muted
              >
                <source src={backVideo} type="video/webm"></source>
              </video>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
