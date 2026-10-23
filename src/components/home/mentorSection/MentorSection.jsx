import React, { useState, useEffect } from "react";
import "./MentorSection.css";

// Temporary shared background. Replace each card's bgImage with its own URL later.
const BG_IMAGE =
  "https://cdn.dribbble.com/userupload/49355473/file/b8b45eda0c2cb6c5e2b35644b39252a1.jpeg";

function MentorSection() {
  const [activeCard, setActiveCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      image:
        "https://cdn.dribbble.com/userupload/49395474/file/41b2055ef786a1be39c6ae4d67ed1616.png",
      bgImage:
        "https://cdn.dribbble.com/userupload/49387331/file/f8b41f882f857e3b4835f07aada2bc9b.jpeg",
      title: "Dr. Zainab Vora",
      description: (
        <>
          <b>Radiologist</b>
          <br />
          <b>Founder - CoreBTR &amp; Conceptual Radiology</b>
          <br />
          <b>Co-Founder - Vidya Jeevan Experience Centre</b>
          <br />
          <br />
          <b>“Kahani tumhaari hai. Ho sake toh kamaal likhna.”</b>
          <br />
          Some words become more than words. They become a voice in your head
          when things get difficult, a little courage when you need it most, and
          a reminder of what you’re capable of when you forget.
          <br />
          For thousands of BTR students, that voice is Dr. ZV.
        </>
      ),
      fullContent: (
        <>
          <b>Radiologist</b>
          <br />
          <b>Founder - CoreBTR &amp; Conceptual Radiology</b>
          <br />
          <b>Co-Founder - Vidya Jeevan Experience Centre</b>
          <br />
          <br />
          <b>“Kahani tumhaari hai. Ho sake toh kamaal likhna.”</b>
          <br />
          Some words become more than words. They become a voice in your head
          when things get difficult, a little courage when you need it most, and
          a reminder of what you’re capable of when you forget.
          <br />
          <br />
          For thousands of BTR students, that voice is Dr. ZV.
          <br />
          <br />
          Long before CoreBTR, Dr. ZV had already become a part of countless
          students’ journeys. And with CoreBTR, that connection only grew
          stronger, reaching more students and inspiring them to believe in
          themselves, back their hard work, and write stories of their own.
          Different beginnings, different battles, different dreams. One belief
          that keeps finding its way into every story: your kahani is yours to
          write.
          <br />
          <br />
          And that belief comes with something even more special. Her care. The
          kind that celebrates every win, makes room for every dream, and keeps
          believing in you as you find your way. At home, there's Zara. And in
          every student she worries about, guides and cheers for, there's a
          little of that same boundless love.
          <br />
          <br />
          And now, those stories are bringing us together at DOPAMINE.
          <br />
          <br />
          For the hard work that became a rank. For the dreams that kept someone
          going. For the milestones that deserve to be celebrated, and the
          journeys that are only just beginning.
          <br />
          <br />
          Because the best part of a story isn't always where it takes you.
          Sometimes, it's the people who help you believe you can get there.
          <br />
          <br />
          <b>
            This one's for the stories she's inspired, and the students who are
            out there making them extraordinary.
          </b>
        </>
      ),
    },
    {
      id: 2,
      image:
        "https://cdn.dribbble.com/userupload/49409279/file/c0f58705fa646c6db3ddb9b3bef033ec.png",
      bgImage:
        "https://cdn.dribbble.com/userupload/49409174/file/3cd77632077842557aa4bc234e037b6b.jpeg",
      title: "Dr. Ravi Sharma",
      description: (
        <>
          <b>Neurosurgeon</b>
          <br />
          <b>Co-Founder - CoreBTR &amp; Vidya Jeevan Experience Centre</b>
          <br />
          <br />
          <b>“Tu kar, main hoon tere saath.”</b>
          <br />
          And somehow, he means it every single time.
          <br />
          For the conversations that run a little longer. For the worries that
          need untangling. For the ideas that begin with{" "}
          <em>“Sir, ek baat thi…”</em> and turn into conversations about
          everything under the sun. With Dr. Ravi, there’s always room to talk
          things through.
        </>
      ),
      fullContent: (
        <>
          <b>Neurosurgeon</b>
          <br />
          <b>Co-Founder - CoreBTR &amp; Vidya Jeevan Experience Centre</b>
          <br />
          <br />
          <b>“Tu kar, main hoon tere saath.”</b>
          <br />
          And somehow, he means it every single time.
          <br />
          <br />
          For the conversations that run a little longer. For the worries that
          need untangling. For the ideas that begin with{" "}
          <em>“Sir, ek baat thi…”</em> and turn into conversations about
          everything under the sun. With Dr. Ravi, there’s always room to talk
          things through.
          <br />
          <br />
          And if you’ve ever looked around Vidya Jeevan and thought, “Yeh toh
          students ke liye hi banaya hai,” you’ll find his touch in that, too.
          In the thought behind the spaces, the effort that goes into the
          facilities, and the little details that make life here better for
          students.
          <br />
          <br />
          A little more room to dream, a little more support to keep going, and
          one familiar assurance:
          <br />
          <b>Tu kar, main hoon tere saath.</b>
        </>
      ),
    },

    {
      id: 3,
      image:
        "https://cdn.dribbble.com/userupload/49395473/file/976de04f57345884a68565b4334a123a.png",
      bgImage:
        "https://cdn.dribbble.com/userupload/49387330/file/0f6144e8f2558bdb0e0ed5db0c5ae82f.jpeg",
      title: "Mr. Ritesh Kapoor",
      description: (
        <>
          <b>Financial &amp; Strategic Consultant | CA</b>
          <br />
          <b>Director - Vidya Jeevan Experience Centre</b>
          <br />
          <br />
          <b>Our very own Mama Ji Sir.</b>
          <br />
          For pretty much anything, there’s one name that comes to mind: Mama
          Ji. Whether it’s something you need, something you’ve forgotten,
          something that’s gone wrong, or something you simply need help
          figuring out, you know where to go.
        </>
      ),
      fullContent: (
        <>
          <b>Financial &amp; Strategic Consultant | CA</b>
          <br />
          <b>Director - Vidya Jeevan Experience Centre</b>
          <br />
          <br />
          <b>Our very own Mama Ji Sir.</b>
          <br />
          For pretty much anything, there’s one name that comes to mind: Mama
          Ji. Whether it’s something you need, something you’ve forgotten,
          something that’s gone wrong, or something you simply need help
          figuring out, you know where to go.
          <br />
          <br />
          And while students know him as their go-to person for just about
          everything, there’s a much bigger story behind the place they call
          Vidya Jeevan. From one floor to an entire building, Mama Ji has been
          part of building VJ into what it is today, one step, one challenge,
          and a whole lot of dedication at a time.
          <br />
          <br />
          The building may have grown, but for students, some things have stayed
          just the same: the familiar face, the helping hand, and the feeling
          that Mama Ji is always somewhere around.
          <br />
          <br />
          <b>
            The hands that helped build Vidya Jeevan, and the heart that makes
            it feel like home.
          </b>
        </>
      ),
    },

    {
      id: 4,
      image:
        "https://cdn.dribbble.com/userupload/49406609/file/a4e623af3088dc2b25e8a7c02b9b15a9.png",
      bgImage:
        "https://cdn.dribbble.com/userupload/49406608/file/471aa3f9b76abb04b5052408bc97eb80.jpeg",
      title: "Dr. Apurv Mehra",
      description: (
        <>
          <b>Orthopedic Surgeon</b>
          <br />
          <b>Founder - E-Conceptual &amp; Vidya Jeevan Experience Centre</b>
          <br />
          <b>Co-Founder - CoreBTR</b>
          <br />
          <br />
          <b>
            “Teri kismat da likhya tere to koi kho nai sakda, te je us di meher
            hove te tenu o vi mil jae jo tera ho nai sakda.”
          </b>
          <br />A name students have learnt from, a presence they look forward
          to, and a part of what makes Vidya Jeevan, Vidya Jeevan.
        </>
      ),
      fullContent: (
        <>
          <b>Orthopedic Surgeon</b>
          <br />
          <b>Founder - E-Conceptual &amp; Vidya Jeevan Experience Centre</b>
          <br />
          <b>Co-Founder - CoreBTR</b>
          <br />
          <br />
          <b>
            “Teri kismat da likhya tere to koi kho nai sakda, te je us di meher
            hove te tenu o vi mil jae jo tera ho nai sakda.”
          </b>
          <br />A name students have learnt from, a presence they look forward
          to, and a part of what makes Vidya Jeevan, Vidya Jeevan.
          <br />
          <br />
          Somewhere between having a plan and learning to trust the process,
          there’s a lesson Dr. Apurv keeps bringing home.
          <br />
          <br />
          The discipline to keep showing up. The strength to hold your ground
          when things get difficult. And the faith to keep doing your part, even
          when the outcome is still unwritten.
          <br />
          <br />
          At Vidya Jeevan, that belief extends beyond the exam hall. It’s in the
          bigger picture, in the possibilities students are encouraged to see
          for themselves, and in the reminder that there’s more to becoming a
          doctor than the rank you earn.
          <br />
          <br />
          <b>
            Do your bit. Trust the timing. And leave room for life to surprise
            you.
          </b>
        </>
      ),
    },
    {
      id: 5,
      image:
        "https://cdn.dribbble.com/userupload/49395471/file/50942e8f7a75321caa2a9c9794b9a8ad.png",
      bgImage:
        "https://cdn.dribbble.com/userupload/49387327/file/55b41e383eec2f67979ae8fbe317fdfd.jpeg",
      title: "Dr. Gobind Rai Garg",
      description: (
        <>
          <b>Founder of Pharmacology by GRG</b>
          <br />
          <br />
          <b>“Dum bande mein hota hai, branch mein nahi.”</b>
          <br />
          If you’ve heard Dr. GRG say this, you know the line needs no
          introduction.For generations of medical students, Dr. GRG has been the
          name in Pharmacology.
        </>
      ),
      fullContent: (
        <>
          <b>Founder of Pharmacology by GRG</b>
          <br />
          <br />
          <b>“Dum bande mein hota hai, branch mein nahi.”</b>
          <br />
          If you’ve heard Dr. GRG say this, you know the line needs no
          introduction.
          <br />
          <br />
          For generations of medical students, Dr. GRG has been the name in
          Pharmacology. Years of teaching, concepts that finally click, and a
          familiar voice through countless hours of preparation. For many VJ
          students, their association with him began long before they ever
          walked through VJ’s doors.
          <br />
          <br />
          But Dr. GRG’s place at Vidya Jeevan represents the kind of medical
          education VJ brings together: educators who leave a mark far beyond
          their lectures, perspectives that stay with students, and people who
          make the experience here so much bigger than exam preparation.
          <br />
          <br />
          And when those surprise visits happen, that connection comes alive
          right here at VJ.
          <br />
          <br />
          <b>
            From shaping how generations learn Pharmacology to inspiring the
            doctors they’re becoming, Dr. GRG’s impact reaches far beyond the
            classroom.
          </b>
        </>
      ),
    },
  ];

  // Read more popup: close on Escape + lock page scroll while open
  useEffect(() => {
    if (!activeCard) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCard]);

  return (
    <section className="mentor-section-container">
      <div className="mentor-section-header">
        <h2 className="mentor-section-heading">The People Behind DOPAMINE</h2>
        <h3 className="mentor-section-sub-heading">
          Some humans just feel like home.
        </h3>
        <p className="mentor-section-para">
          Every community has its own familiar faces, the people whose presence
          makes a place what it is. At Vidya Jeevan, these are the people
          students learn from, turn to, laugh with and look up to. Meet the
          people who've helped shape this community.
        </p>
      </div>

      <div className="mentor-section-cards">
        {cardsData.map((card) => (
          <article className="mentor-section-card" key={card.id}>
            <div
              className="mentor-section-card-inner"
              style={{ backgroundImage: `url(${card.bgImage})` }}
            >
              <div className="mentor-section-card-image">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="mentor-section-card-content">
                <h3>{card.title}</h3>
                <p className="mentor-section-card-desc">
                  {card.description || card.fullContent}
                </p>
                {card.description && (
                  <button
                    type="button"
                    className="mentor-section-read-more"
                    onClick={() => setActiveCard(card)}
                  >
                    Read more →
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeCard && (
        <div
          className="mentor-section-modal-overlay"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="mentor-section-modal"
            role="dialog"
            aria-modal="true"
            aria-label={activeCard.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mentor-section-modal-close"
              aria-label="Close"
              onClick={() => setActiveCard(null)}
            >
              ×
            </button>
            <h3 className="mentor-section-modal-title">{activeCard.title}</h3>
            <div className="mentor-section-modal-body">
              {activeCard.fullContent}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MentorSection;
