const audio = document.getElementById('back-audio');
const playPauseBtn = document.getElementById('audio-pause-btn');
const progressBar = document.getElementById('audio-progress-bar');
const timeDisplay = document.getElementById('audio-time-display');
const nextBtn = document.getElementById('audio-next-btn');
const prevBtn = document.getElementById('audio-previous-btn');
const musicNameLabel = document.getElementById('music-name-label');
let currentSongIndex = 1;  // 当前播放歌曲的索引


audio.loop = true; // 设置循环播放
// 播放列表（包含歌曲标题和路径）
const playlist = [
  { title: "诀别书", src: "./Source/Audio/诀别书.mp3" },
  { title: "狼与香辛料OP1", src: "./Source/Audio/Spice&WolfOP1.mp3" },
  { title: "怪物-动物狂想曲-Season2-OP", src: "./Source/Audio/动物狂想曲Se2OP.mp3" },
  { title: "歌曲4", src: "./Source/Audio/诀别书.mp3" },
  { title: "歌曲5", src: "./Source/Audio/诀别书.mp3" },
  { title: "歌曲6", src: "./Source/Audio/诀别书.mp3" },
  { title: "歌曲7", src: "./Source/Audio/诀别书.mp3" },
  { title: "歌曲8", src: "./Source/Audio/诀别书.mp3" },
  { title: "歌曲9", src: "./Source/Audio/诀别书.mp3" },
  { title: "歌曲10", src: "./Source/Audio/诀别书.mp3" }
];
// 加载并播放指定索引的歌曲
function loadAndPlay(index) {
  const song = playlist[index];
  audio.src = song.src;   // 修改音频源
  audio.load();           // 重新加载音频（必须调用）
  audio.play().catch(err => {  // 尝试自动播放（可能被浏览器阻止）
    //console.log("自动播放失败，需用户交互后播放");
  });
  //console.log(`正在播放：${song.title}`);
}

// 上一首按钮
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;  // 循环到末尾
  loadAndPlay(currentSongIndex);
  freshMusicNameLabel();
});

// 下一首按钮
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;  // 循环到开头
  loadAndPlay(currentSongIndex);
  freshMusicNameLabel();
});

// 播放/暂停切换
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '暂停';
  } else {
    audio.pause();
    playPauseBtn.textContent = '播放';
  }
  freshMusicNameLabel();
});

// 更新进度条和时间显示
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent;

  const currentTime = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
});

// 点击进度条跳转
progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * audio.duration;
  audio.currentTime = time;
});

// 格式化时间（秒 → 分:秒）
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function freshMusicNameLabel() {
    const song = playlist[currentSongIndex];
    musicNameLabel.textContent = '正在播放: '+ song.title;
}