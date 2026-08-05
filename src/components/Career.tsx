import "./styles/Career.css";
import { config } from "../config";

const getDisplayYear = (period: string) => {
  if (period.includes("Present") || period.includes("Doing")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0];
  }
  return period;
};

const Career = () => {
  const education = (config as any).education || [];
  const certifications = (config as any).certifications || [];

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          {/* Work Experience */}
          {config.experiences.map((exp, index) => (
            <div key={`exp-${index}`} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{getDisplayYear(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}

          {/* Education */}
          {education.map((edu: any, index: number) => (
            <div key={`edu-${index}`} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{edu.degree} in {edu.major}</h4>
                  <h5>{edu.school}</h5>
                </div>
                <h3>{getDisplayYear(edu.range)}</h3>
              </div>
              <p>{edu.range}</p>
            </div>
          ))}

          {/* Certifications */}
          {certifications.map((cert: any, index: number) => (
            <div key={`cert-${index}`} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{cert.name}</h4>
                  <h5>{cert.description}</h5>
                </div>
                <h3>CERT</h3>
              </div>
              <p>{cert.proof ? <a href={cert.proof} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accentColor, #00E5FF)' }}>{cert.proof}</a> : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
