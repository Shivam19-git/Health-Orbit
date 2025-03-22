import YouTube from "react-youtube";

const WorkoutPrograms = () => {
  const videos = {
    strength: "OPEDjl88P-4", // Strength Training video ID
    cardio: "_fesO5oNcEs",   // Cardio video ID
  };

  const renderYouTubeVideo = (videoId) => {
    const opts = {
      height: "200",
      width: "100%",
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <div className="aspect-w-16 aspect-h-9">
        <YouTube videoId={videoId} opts={opts} />
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Workout Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Strength Training</h3>
          <p className="text-sm text-gray-600">Build muscle and increase your overall strength</p>
          {renderYouTubeVideo(videos.strength)}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Cardio Workouts</h3>
          <p className="text-sm text-gray-600">Improve your endurance and heart health</p>
          {renderYouTubeVideo(videos.cardio)}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPrograms;