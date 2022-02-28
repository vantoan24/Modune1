const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
const musics = [
    {
        id: 1,
        title: " Muộn Rồi Mà Sao Còn",
        file: "Codegym1.mp3.mp3",
        image:
            "https://media.travelmag.vn/files/content/2021/04/30/173292019_315063713309362_6329146106221360649_n-00272556.jpg",
    },
    {
        id: 2,
        title: " Em Không Hiểu",
        file: "Codegym2.mp3.mp3",
        image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/07/06/7/a/3/0/1625546620298_640.jpg",
    },
    {
        id: 3,
        title: " Thủ Đô Cypher",
        file: "Codegym3.mp3.mp3",
        image:
            "https://avatar-ex-swe.nixcdn.com/song/2021/07/09/5/5/8/2/1625828697322_640.jpg",
    },
    {
        id: 4,
        title: " Tay To",
        file: "Codegym4.mp3.mp3",
        image:
            "https://images.genius.com/44531be253db8c48636ce1437460d1e3.500x500x1.jpg",
    },
    {
        id: 5,
        title: " Đã Lỡ Yêu Em Nhiều",
        file: "Codegym5.mp3.mp3",
        image:
            "https://karaoke.com.vn/wp-content/uploads/2017/11/%C6%B0eefweeeeee.jpg",
    },
    {
        id: 6,
        title: " Lời xin lỗi vụng về",
        file: "Codegym6.mp3.mp3",
        image:
            "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/8/0/6/7/80677a86fdcee35d96f0047c7addcc7c.jpg",
    },
    {
        id: 7,
        title: " Có một tình yêu gọi là chia tay",
        file: "Codegym7.mp3.mp3",
        image:
            "https://photo-zmp3.zadn.vn/cover/8/3/c/2/83c27acc7ae80605876ad7a333b92092.jpg",
    },
    {
        id: 8,
        title: " Hạnh Phúc Mới",
        file: "Codegym8.mp3.mp3",
        image:
            "https://avatar-nct.nixcdn.com/song/2018/05/11/6/9/1/0/1526046559650_640.jpg",
    },
    {
        id: 9,
        title: " Khi Cô Đơn Em Nhớ Đến Ai",
        file: "Codegym9.mp3.mp3",
        image:
            "https://i.ytimg.com/vi/F5waXB0hbzk/hqdefault.jpg",
    },
    {
        id: 10,
        title: " Mộng Mơ",
        file: "Codegym10.mp3.mp3",
        image:
            "https://avatar-ex-swe.nixcdn.com/song/share/2021/03/26/b/8/5/9/1616731015854.jpg",
    },
    {
        id: 11,
        title: " Finn Askew",
        file: "Codegym11.mp3.mp3",
        image:
            "https://avatar-ex-swe.nixcdn.com/song/2020/07/29/5/7/4/a/1596025693515_640.jpg",
    },
    {
        id: 12,
        title: " Crush 2",
        file: "Codegym12.mp3.mp3",
        image:
            "https://i.ytimg.com/vi/RpcJX8gsY6o/maxresdefault.jpg",
    },

    
    
]
/**
 * Music
 * id: 1
 * title: Codegym
 * file: Codegym.mp3.mp3
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});
nextBtn.addEventListener("click", function () {
    changeSong(1);
});
prevBtn.addEventListener("click", function () {
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        // handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}
function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    
    playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}
function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
        }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}
function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);