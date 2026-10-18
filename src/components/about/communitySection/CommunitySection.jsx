import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import "./CommunitySection.css";
import communityPaint from "../../../assets/community-paint.png";
import corebtrLogo from "../../../assets/images/corebtr-w.png";
import econceptualLogo from "../../../assets/images/ec-w.png";
import grgLogo from "../../../assets/images/grg-w.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const platforms = [
  {
    name: "CoreBTR",
    image: corebtrLogo,
    imageType: "logo",
    paragraphs: [
      "Built for medical entrance preparation, CoreBTR helps students revise, practise, and prepare for NEET-PG, INI-CET and FMGE. But it has always been about more than preparation.",
      "CoreBTR brings together Dr. ZV's pioneering BTR approach, taught by her across all 19 subjects, Dr. Ravi's guidance on studying smarter and navigating the journey, and Dr. Apurv's philosophy of perseverance, moving forward, and trusting the bigger picture.",
      "At the heart of CoreBTR is Dr. Zainab Vora's vision, one that has become part of countless medical journeys, each with its own struggles, milestones, and dreams.",
      "And as Dr. ZV reminds us, “Kahani tumhaari hai.” Looking at the journeys this community has been a part of, there's only one thing to say:",
    ],
    closing: "“Kahani tumhaari hai, kya kamaal likhi hai.”",
  },
  {
    name: "eConceptual",
    image: econceptualLogo,
    imageType: "logo",
    paragraphs: [
      "Founded by Dr. Apurv Mehra, eConceptual is built for the next chapter of a doctor's journey: residency. With learning designed around the demands of postgraduate training, it helps residents keep growing through the challenges of clinical life.",
    ],
  },
  {
    name: "PHARMACOLOGY BY DR. GRG",
    image: grgLogo,
    imageType: "logo",
    subtitle: "Powered by eConceptual",
    paragraphs: [
      "With over two decades of teaching, Dr. Gobind Rai Garg has helped generations of medical students understand Pharmacology with greater clarity and confidence.",
      "From detailed classes and quick revisions to express learning, question banks and tests, the platform brings together everything students need to build a stronger grasp of the subject, with Dr. GRG's teaching at its heart.",
    ],
  },
  {
    name: "VIDYA JEEVAN",
    // Demo URL: replace with your Vidya Jeevan image URL.
    image:
      "https://cdn.dribbble.com/userupload/49348522/file/bd856b87c15848514e8bbffd9b4d94eb.webp",
    imageType: "photo",
    subtitle:
      "More than a place. More than a community. A small chapter in thousands of journeys.",
    paragraphs: [
      "Vidya Jeevan is where ambition meets belonging. Where early mornings, long study hours, everyday routines, and the pursuit of a dream become part of something bigger.",
      "It's where the academics keep you busy, the people keep you going, and the memories stay long after the exams.",
      "Through it all, there's a team that puts its heart into making this place what it is. Every student who walks through these doors, every person who works behind the scenes, and every life touched along the way becomes part of something bigger than themselves.",
    ],
    closing: "This is Vidya Jeevan. And this is a story we build together.",
  },
];

function CommunitySection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          compact: "(max-width: 900px)",
        },
        (context) => {
          if (!context.conditions.animate) return;
          const distance = context.conditions.compact ? 20 : 48;
          const headings = sectionRef.current.querySelectorAll(
            ".community-section__header h2, .community-section__tagline",
          );

          headings.forEach((heading) => {
            gsap.from(heading, {
              opacity: 0,
              y: 18,
              clipPath: "inset(0 0 100% 0)",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 92%",
                end: "bottom top",
                toggleActions: "restart none restart reset",
              },
              clearProps: "opacity,transform,clipPath",
            });
          });

          sectionRef.current
            .querySelectorAll(".community-section__card")
            .forEach((card, index) => {
              const direction = index % 2 === 0 ? -1 : 1;
              const visual = card.querySelector(".community-section__visual");
              const content = card.querySelector(".community-section__content");
              const timeline = gsap.timeline({
                defaults: {
                  ease: "power3.out",
                  clearProps: "opacity,transform",
                },
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              });

              timeline
                .from(visual, {
                  x: direction * distance,
                  scale: 1.03,
                  duration: 1.1,
                })
                .from(
                  content.children,
                  {
                    x: -direction * distance * 0.65,
                    y: 10,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.14,
                  },
                  0.18,
                );
            });
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="community-section"
      aria-labelledby="community-heading"
    >
      <div className="community-section__inner">
        <header className="community-section__header">
          <div>
            <p className="community-section__eyebrow">THE DOPAMINE FAMILY</p>
            <h2 id="community-heading">
              The people and platforms behind it all
            </h2>
          </div>
          <div className="community-section__introduction">
            <p className="community-section__tagline">
              Different journeys.
              <br />
              One bigger community.
            </p>
            <p className="community-section__intro">
              DOPAMINE brings together people and platforms that have become a
              part of so many medical journeys. Here's a little about the family
              behind the experience.
            </p>
          </div>
        </header>

        <nav
          className="community-section__navigation"
          aria-label="Explore the DOPAMINE community"
        >
          {platforms.map((platform, index) => (
            <a href={`#community-platform-${index}`} key={platform.name}>
              <span
                className="community-section__nav-number"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              {platform.name}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="community-section__platforms">
          {platforms.map((platform, index) => (
            <article
              className="community-section__card"
              key={platform.name}
              id={`community-platform-${index}`}
              aria-labelledby={`community-title-${index}`}
            >
              <div
                className={`community-section__visual${platform.imageType === "logo" ? " community-section__visual--logo" : ""}`}
              >
                {platform.imageType === "logo" && (
                  <img
                    className="community-section__paint"
                    src={communityPaint}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                )}
                <img
                  className={`community-section__platform-image community-section__platform-image--${platform.imageType}`}
                  src={platform.image}
                  alt={
                    platform.imageType === "logo"
                      ? `${platform.name} logo`
                      : "Vidya Jeevan image placeholder"
                  }
                  loading="lazy"
                />
              </div>
              <div className="community-section__content">
                <div className="community-section__identity">
                  <h3 id={`community-title-${index}`}>{platform.name}</h3>
                  {platform.subtitle && (
                    <p className="community-section__subtitle">
                      {platform.subtitle}
                    </p>
                  )}
                </div>
                <div className="community-section__story">
                  {platform.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {platform.closing && (
                  <div className="community-section__quote">
                    <p className="community-section__closing">
                      {platform.closing}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;
