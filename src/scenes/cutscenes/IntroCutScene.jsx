export default function IntroCutScene({ onFinish }) {
  const handleFinish = () => {
    if (onFinish) onFinish()
  }

  return (
    <div
      className="fullscreen"
      onClick={handleFinish} // click anywhere to skip
      style={{ cursor: "pointer" }}
    >
      <video
        src="/videos/haunted_house_intro.mp4"
        autoPlay
        muted
        onEnded={handleFinish}
        className="video-bg"
      />

      <div className="overlay-text">
        <h1>Survive If You Can</h1>
        <p>Your friends ran ahead. You didn't.</p>
      </div>
    </div>
  )
}