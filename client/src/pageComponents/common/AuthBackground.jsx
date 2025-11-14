function AuthBackground() {
  return (
    <div className="auth-background">
      <svg className="ink-stroke-1" viewBox="0 0 500 500">
        <path
          d="M100,150 Q250,80 350,120 T450,180"
          stroke="#212529"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.1"
        />
      </svg>

      <svg className="ink-stroke-2" viewBox="0 0 500 500">
        <path
          d="M50,300 Q150,250 280,280 T400,320"
          stroke="#212529"
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
