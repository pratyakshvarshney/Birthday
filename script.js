// Trigger to play music in the background with SweetAlert
window.addEventListener('load', () => {
    const song = document.querySelector('.song'); // select song but don't play yet
    song.pause();  // ensure it's not playing automatically
    song.currentTime = 0;
    song.volume = 0.1;

    Swal.fire({
        title: 'Do you want to play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            song.play();  // play only after user confirms
            animationTimeline(song);
        } else {
            animationTimeline(null); // no song
        }
    });
});


// Animation timeline
const animationTimeline = (song) => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
    const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

    const tl = new TimelineMax();

    // Initial greetings
    tl.to(".container", 0.6, { visibility: "visible" })
      .from(".one", 0.7, { opacity: 0, y: 10 })
      .from(".two", 0.4, { opacity: 0, y: 10 })
      .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
      .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
      .from(".three", 0.7, { opacity: 0, y: 10 })
      .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
      .from(".four", 0.7, { scale: 0.2, opacity: 0 })
      .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
      .staggerTo(".hbd-chatbox span", 0.8, { visibility: "visible" }, 0.02)
      .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=1")
      .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")

      // Idea sequence
      .from(".idea-1", 0.7, ideaTextTrans)
      .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-2", 0.7, ideaTextTrans)
      .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-3", 0.7, ideaTextTrans)
      .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
      .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-4", 0.7, ideaTextTrans)
      .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
      .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
      .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
      .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")

      // --- STOP BACKGROUND MUSIC after .idea-5 ---
      .add(() => {
          if (song) {
              song.pause();
              song.currentTime = 0; // reset optional
          }
      })

      // Continue with remaining animations
      .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
      .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1.5")

      // Video section
      .add(() => {
          const videoWrapper = document.getElementById("videoWrapper");
          const video = document.getElementById("birthdayVideo");
          const back10 = document.getElementById("back10");
          const forward10 = document.getElementById("forward10");

          videoWrapper.style.display = "block";
          video.scrollIntoView({ behavior: "smooth" });
          video.controls = true;

          back10.onclick = () => { video.currentTime = Math.max(0, video.currentTime - 10); };
          forward10.onclick = () => { video.currentTime = Math.min(video.duration, video.currentTime + 10); };

          tl.pause();
          video.play();

          video.onended = () => {
              setTimeout(() => {
                  videoWrapper.style.display = "none";
                  tl.play();
              }, 3000);
          };
      })

      // Balloon and profile animations

      // After video and before other animations continue
    //   let sixAudio = document.querySelector('.song2'); // outside timeline
// const sixAudio = document.querySelector('.song2'); // outside timeline

        .add(() => {
            const sixAudio = document.querySelector('.song2'); // your second audio
            sixAudio.currentTime = 0;   // start from beginning
            sixAudio.volume = 0.5;      // optional, adjust volume
            sixAudio.play();
        })
        .to(".ten", 0.5, { opacity: 0, y: 30, zIndex: "-1" })

      // Balloon animation start se thoda pehle
        .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)

        // Profile picture & hat animation
        .from(".profile-picture", 0.5, { scale: 1.5, opacity: 0, x: 0, y: -20, rotationZ: -10 }, "-=2")
        .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
      .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
      .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
      .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
      .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
      .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
      .add(() => {
        const sixAudio = document.querySelector('.song2');
          if (sixAudio) {
              sixAudio.pause();
              sixAudio.currentTime = 0; // reset optional
          }
      })
      .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
      .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

          // --- STOP BACKGROUND MUSIC after .idea-5 ---
        //   const sixAudio = document.querySelector('.song2'); // outside timeline

      

    // Replay button
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
        if (song) song.play(); // restart background music on replay
    });
};
