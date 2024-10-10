import { ceil } from "lodash";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

const VPlayer = () => {
  const playRef = useRef<ReactPlayer>(null);
  const [duration, setDuration] = useState<number | null>(null); // State to store the duration
  const [played, setPlayed] = useState<number>(0); // State to store the played time
  const [playing, setPlaying] = useState<boolean>(false); // State to manage playback

  // Update played time as the video progresses
  useEffect(() => {
    const interval = setInterval(() => {
      if (playRef.current) {
        const currentTime = playRef.current.getCurrentTime(); // Get current time from the player
        setPlayed(currentTime);
        console.log(currentTime);
        
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value); // Get the new time from the range input
    if (playRef.current) {
      playRef.current.seekTo(newTime); // Seek to the new time
    }
    setPlayed(newTime); // Update the played state to reflect the change
  };

  return (
    <>
      <ReactPlayer 
        ref={playRef}
        url='https://youtu.be/TiP72S9tf7o?si=f5lNKz-HLswURwO1'
        playing={playing} // Control the playing state
        onReady={() => {
          if (playRef.current) {
            const duration = playRef.current.getDuration();
            setDuration(duration); // Set duration when player is ready
          }
        }}
        onPlay={() => setPlaying(true)} // Set playing state to true
        onPause={() => setPlaying(false)} // Set playing state to false
      />
      <h1>Duration: {duration !== null ? duration : "Loading..."}</h1> {/* Display duration in seconds */}
      <input 
        type="range" 
        min={0} 
        max={duration || 0} 
        value={played} // Use the played time as the value
        onChange={handleSeekChange} // Handle seeking
      /> <br />
      <button onClick={() => setPlaying(true)}>play</button> <br />
      <button onClick={() => setPlaying(false)}>pause</button>
      <h1>Played: {ceil(played)} seconds</h1> {/* Display played time */}
    </>
  );
}

export default VPlayer;
