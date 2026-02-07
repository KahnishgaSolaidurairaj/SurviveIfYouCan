export default function IntroCutScene({ onFinish }) {
  return (
    <div className="fullscreen">
      <video
        src="/videos/haunted_house_intro.mp4"
        autoPlay
        muted
        onEnded={onFinish}
        className="video-bg"
      />
      <div className="overlay-text">
        <h1>Survive If You Can</h1>
        <p>Your friends ran ahead. You didn't.</p>
      </div>
    </div>
  );
}
