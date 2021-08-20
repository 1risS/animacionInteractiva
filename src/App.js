import "./App.css";
import { createRef, useState, useEffect } from "react";
import './fonts/BILLO.TTF'
import './fonts/fredoka/Fredoka_dingbats.otf'
import './fonts/fredoka/FredokaOne-Regular.otf'
import neko from "./assets/neko.svg"
import wings from "./assets/wings.gif"
import butterflies from "./assets/but.gif"
import sparkles1 from "./assets/star.gif"
import star2 from "./assets/star2.gif"
import heart from "./assets/heart2.gif"
import sparkle from "./assets/sparkle04.gif"
import stop0 from "./assets/stop0.jpg"
import stop1 from "./assets/stop1.jpg"


const videosRoot = `${process.env.PUBLIC_URL}/videos`;
const videosCount = 12;
const frontVideos = [1, 3, 5, 7, 9, 11].map((i) => `${videosRoot}/${i}.webm`);
const backVideos = [2, 4, 6, 8, 10, 12].map((i) => `${videosRoot}/${i}.webm`);



function App() {
  const [video, setVideo] = useState(0);
  const [showButterflies, setShowButterflies] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const[showHeart, setShowHeart] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
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

  useEffect(() => {
    console.log("showHeart", showHeart)
  }, [showHeart]);

  const handleShowHeart = () => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 15000);
  }

  useEffect(() => {
    console.log("showSparkle", showSparkle)
  }, [showSparkle]);

  const handleShowSparkle = () => {
    setShowSparkle(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 15000);
  }

  useEffect(() => {
    console.log("showModal", showModal)
  }, [showModal]);

  const handleShowModal = () => {
    setShowModal(true);
  }



  const frontPlaying = video % 2 === 0;
  const backPlaying = video % 2 === 1;

  const index = Math.floor(video / 2);
  const frontVideo = frontVideos[index];
  const backVideo = backVideos[index];

  return (
    <div className="App">
      <div className="mobile">
        <div className="mobileTitle">Oh noes!</div>
        <div className="mobileTxt">Please open this url in a bigger device.</div>
      </div>
      <div className="container">
        <div className="navbarContainer">
          <div className="logoCont">
            <img className="neko" src={neko} alt="neko" height="75px"></img>
            <img className="wings" src={wings} alt="wings"></img>
          </div>
          <div className="title">Neko!</div>
          <div className="space" onClick={handleShowModal}>WTF is this?</div>
        </div>
        <div className="contentCont">
          {showModal && <div className="modal">
            <div className="txt">
              Este sitio es una exploración de la idea de "animación interactiva". El punto de partida fue la creación de un video en stop motion, con chroma, aprovechando que los browsers modernos <a href="https://developers.google.com/web/updates/2013/07/Alpha-transparency-in-Chrome-video" target="blank">soportan videos con transparencias</a> .
            </div>
            <div className="imgCont">
              <img src={stop0} alt="chroma0" height="300px"></img>
              <img src={stop1} alt="chroma1" height="300px"></img>
            </div>
            <div className="txt">
              Para acelerar el proceso, la remoción del fondo fue hecha con <a href="https://medium.com/fnplus/blue-or-green-screen-effect-with-open-cv-chroma-keying-94d4a6ab2743" target="blank"> una librería de Python que usa OpenCV</a> pero el resultado no fue el esperado debido a que la técnica de iluminación debió ser mejor para que el algotimo pudiera segmentar la figura sin imperfecciones. 
              <br></br>
              El plano frontal general muestra el movimiento de la figura de un gato, dando cuenta de la profundidad del set. 
              <br></br>
              Una vez logrado el video, se cargó en la web. Era claro que podíamos profundizar en la idea de adelante-atrás de este gato. Para ello, cortamos el video en varios, de acuerdo a la posición y recorrido del personaje, y desarrollamos un lector secuencial que nos permite incorporar otros elementos visuales entre el "detrás" y el "frente" de la escena, logrando un fundido mayor del elemento visual en video con los componentes propios de la web e imágenes en diferentes formatos.
            </div>
            </div>
          }
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
           {showHeart && <img className="heart" id="heart" src={heart} alt="heart" />}
           {showSparkle && <img className="sparkle" id="sparkle" src={sparkle} alt="sparkle" />}
          <div className="sideBarCont">
            <div className="addJoy">Add more joy!</div>
            <div className="buttonA" onClick={handleShowButterflies}> f </div>
            <div className="buttonA" onClick={handleShowHeart}> 6 </div>
            <div className="buttonA" onClick={handleShowSparkle}> T </div>
          </div>
          <div className="background"></div>
          <div className="background clouds"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
