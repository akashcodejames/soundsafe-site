import "./PartnerCarousel.css";
import "./partnerLogos.css";

export function PartnerCarousel({ logos }) {
  if (!logos?.length) return null;

  const track = [...logos, ...logos];

  return (
    <div className="partner-carousel" aria-label="Technology partners">
      <div className="partner-carousel__track">
        {track.map((img, i) => (
          <figure key={`${img.url}-${i}`} className="partner-carousel__cell">
            <img src={img.url} alt="Partner logo" loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}
