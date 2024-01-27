import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const emailAddress = "HarmonX.enquiry@gmail.com";

  const handleEmailButtonClick = () => {
    const mailtoLink = `mailto:${emailAddress}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Navbar show={true} />
      <div className="home-container">
        <div className="hero">
          <div className="heading">
            <h1>Welcome to HarmonX</h1>
            <p>
              <strong>HarmonX</strong> is centered on promoting peace, fostering
              health and delivering free education
            </p>
            <Link to="/signup" className="homepage-link">
              <button className="signup-btn">Start for free</button>
            </Link>
          </div>
          <div className="video-container">
            <iframe
              width="460"
              height="300"
              src="https://www.youtube.com/embed/b-B3yKaWrVY"
              title="HarmonX Introduction"
              frameBorder="0"
              allowFullScreen
              className="hero-video"
              align="center"
            ></iframe>
          </div>
        </div>
        <div className="about" id="about">
          <div>
            <h2>About HarmonX</h2>
            <div className="about-flex">
              <p>
                HarmonX is a pioneering initiative at the intersection of
                technology and peace. We bring together innovators, developers,
                and visionaries with a common goal: to leverage technology for
                positive change. Our mission encompasses conflict prevention,
                mental health support and education in crisis areas. At HarmonX,
                we believe in the transformative power of collective action and
                innovation to build a harmonious world. Join us on this journey
                towards a future where technology is a catalyst for global
                well-being and unity.
              </p>
            </div>
          </div>
          <div className="features-container">
            <h3>Features</h3>
            <div className="features">
              <div className="feature">
                <div className="feature-icon">
                  <span className="icon-main" id="i1">
                    <i className="fa-solid fa-notes-medical fa-xl"></i>
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Mental Health Support</h4>
                  <p className="feature-category">Health</p>
                  <span className="feature-description">
                    <p>
                      {" "}
                      Explore virtual counseling, mood tracking, and an array of
                      self-help resources. Anonymized forums provide a safe
                      space for sharing experiences and support.{" "}
                    </p>
                  </span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <span className="icon-main" id="i2">
                    <i className="fa-solid fa-graduation-cap fa-xl"></i>
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Education Hub</h4>
                  <p className="feature-category">Education</p>
                  <span className="feature-description">
                    <p>
                      {" "}
                      HarmonX is a crisis-focused education hub with accessible
                      online courses, virtual classrooms, and peer-to-peer
                      mentoring networks.{" "}
                    </p>
                  </span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <span className="icon-main" id="i3">
                    <img
                      src={process.env.PUBLIC_URL + "/images/ai-icon.svg"}
                      alt="ai"
                    />
                  </span>
                </div>
                <div className="feature-text">
                  <h4> AI therapist Chatbot</h4>
                  <p className="feature-category">Health</p>
                  <span className="feature-description">
                    <p>
                      {" "}
                      Our AI therapist chatbot offers users a supportive
                      environment for seeking guidance and assistance with
                      mental health concerns. Through personalized interactions,
                      it aims to provide valuable insights and support.{" "}
                    </p>
                  </span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <span className="icon-main" id="i4">
                    <i className="fa-solid fa-message fa-xl"></i>
                  </span>
                </div>
                <div className="feature-text">
                  <h4> Real-Time Messaging </h4>
                  <p className="feature-category">Social</p>
                  <span className="feature-description">
                    <p>
                      {" "}
                      HarmonX facilitates real-time messaging, enabling
                      one-on-one communication with peers, mentors, and
                      therapists. This feature fosters direct and immediate
                      connections, enhancing collaboration and support within
                      the HarmonX community.{" "}
                    </p>
                  </span>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <span className="icon-main" id="i5">
                    <i className="fa-solid fa-chart-simple fa-xl"></i>
                  </span>
                </div>
                <div className="feature-text">
                  <h4>Assessment Dashboard</h4>
                  <p className="feature-category">Wellness</p>
                  <span className="feature-description">
                    <p>
                      {" "}
                      HarmonX offers a personalized assessment dashboard for
                      users to track progress, achievements, and areas for
                      improvement, empowering well-being and personal growth.{" "}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact">
          <h2> Contact HarmonX </h2>
          <div className="contact-container">
            <p>
              If you have any questions or inquiries, feel free to reach out
            </p>
            <button onClick={handleEmailButtonClick}>Send us an Email</button>
          </div>
        </div>
      </div>
      <Footer show={true} />
    </>
  );
}

export default Home;
