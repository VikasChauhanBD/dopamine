import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "./ClosingBanner.css";

function ClosingBanner() {
  return (
    <section
      className="closing-banner"
      aria-labelledby="closing-banner-heading"
    >
      <div className="closing-banner__card">
        <p className="closing-banner__presenter">Vidya Jeevan presents</p>
        <h2 id="closing-banner-heading">
          <span>The wait is over.</span>
          <span>The fun is on.</span>
        </h2>
        <p className="closing-banner__description">
          A day of big celebrations, great food, live music, unexpected moments,
          and people coming together from across different journeys.
        </p>
        <Link className="closing-banner__cta" to="#">
          Let's get you in <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default ClosingBanner;
