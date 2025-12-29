interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Mess",
  details: {
    author: "ed sheeran",
    year: 2015,
  },
};

const song = "New song";
const {
  song: anotherSong,
  songDuration: duration,
  details: { author: newAuthor },
} = audioPlayer;

const { details } = audioPlayer;
const { author } = details;

// console.log(`Song:${anotherSong}`);
// console.log(`Duration:${duration}`);
// console.log(`Author:${author}`);

const dbz = ['goku', 'vegeta', 'trunks'];
const [,,,trunks = 'not found'] = dbz;
console.log('Personaje 3:', trunks)