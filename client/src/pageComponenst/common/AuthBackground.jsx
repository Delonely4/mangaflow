import vagabondImage from "../../assets/vagmanga.png";

function AuthBackground() {
  return (
    <div className="auth-background">
      <div className="vagabond-image-container">
        <img
          src={vagabondImage}
          alt="Vagabond"
          className="vagabond-image"
          onError={(e) => {
            console.error("Failed to load image:", imagePath);
            e.target.style.display = "none";
          }}
        />
        <div className="vagabond-overlay"></div>
      </div>

      <svg className="ink-stroke-1" viewBox="0 0 500 500">
        <path
          d="M100,150 Q250,80 350,120 T450,180"
          stroke="#1a1a1a"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.1"
        />
      </svg>

      <svg className="ink-stroke-2" viewBox="0 0 500 500">
        <path
          d="M50,300 Q150,250 280,280 T400,320"
          stroke="#4a4a4a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}

export default AuthBackground;
