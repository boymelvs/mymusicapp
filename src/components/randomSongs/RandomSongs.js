const RandomSongs = [
   "Philippine Top Hits",
   "Philippine Most Played Song",
   "Philippine New Release",
   "Philippine Greatest Songs",
   "Philippine Folk Songs",
   "Philippine Mainstreams",
   "Philippine Most Search Songs",
   "Philippine Top 100 Billboards",
   "Philippine Greatest Artist",
   "Philippine Greatest Albums",
];

const randomNumber = Math.floor(Math.random() * 10);

export default RandomSongs[randomNumber];
