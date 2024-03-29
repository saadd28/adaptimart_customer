import { AboutUsPerson1 } from "../../Assets";
import "./AboutUs.css";
import React from "react";
import Fade from "react-reveal";

export default function AboutUs() {
  return (
    <>
      <div className="team_intro_box">
        <div className="team_title">Team</div>

        <div className="team_info_card_container">
          <Fade left>
            <div className="team_infocard">
              <img
                src={AboutUsPerson1}
                alt="person"
                className="team_infocard_img"
              />

              <div className="team_content_container">
                <div className="team_infocard_name">
                  Saad Khan - Lead Web Developer
                </div>

                <div className="team_points_container">
                  <div className="team_intro_point">
                    Hi there, I'm Saad Khan, the Lead Web Developer for this
                    project. Besides coding, I've automated our data process to
                    make things run smoothly and accurately. I've also worked on
                    improving our AI features, working closely with the team to
                    make our project smarter. I'm dedicated to pushing limits
                    and creating digital solutions that really stand out.
                  </div>

                  {/* {data.intro.map((data, index) => (
                    //   <BulletPoint data={data} />
                    <li className="team_intro_point">{data}</li>
                  ))} */}
                </div>
              </div>
            </div>
          </Fade>
          {/* {data.map((data, index) => (
            <TeamInfoCard data={data} />
          ))} */}
        </div>
      </div>
    </>
  );
}
