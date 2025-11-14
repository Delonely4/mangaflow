import vagabondImage from "../../assets/vagmanga.png";

function SideImage() {
  return (
    <div className="vagabond-side-image">
      <img src={vagabondImage} alt="Vagabond" className="vagabond-side-img" />
      <div className="vagabond-side-overlay"></div>
    </div>
  );
}

export default SideImage;
