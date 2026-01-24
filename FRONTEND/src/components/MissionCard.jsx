import styles from "./MissionCard.module.css";
import { WhatsappIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

function MissionCard({ mission, showApplyButton = false, onApply = () => {} }) {
  if (!mission) return <p>Loading mission...</p>;

  return (
    <div className={styles.projectCard}>
      <div className={styles.cardImage}>
        <img
          src={mission.image}
          alt={mission.title}
          className={styles.treeImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h1 className={styles.projectTitle}>{mission.title}</h1>
        <p className={styles.projectSubtitle}>{mission.organization}</p>

        <div className={styles.infoSection}>
          <label className={styles.infoLabel}>DESCRIPTION</label>
          <p className={styles.infoText}>{mission.description}</p>
        </div>

        <div className={styles.infoSection}>
          <label className={styles.infoLabel}>LOCATION</label>
          <p className={styles.infoText}>{mission.location}</p>
        </div>

        <div className={styles.infoSection}>
          <label className={styles.infoLabel}>DATE RANGE</label>
          <p className={styles.infoText}>{mission.date}</p>
        </div>

        <div className={styles.infoSection}>
          <label className={styles.infoLabel}>VOLUNTEERS NEEDED</label>
          <p className={styles.infoText}>
            {mission.number} slots available
          </p>
        </div>

        <div className={styles.infoSection}>
          <label className={styles.infoLabel}>COMPETENCIES REQUIRED</label>
          <div className={styles.competencies}>
            {mission.competencies?.map((c, i) => (
              <button key={i} className={styles.competencyTag}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 APPLY BUTTON */}
        {showApplyButton && (
          <button className={styles.applyButton} onClick={onApply}>
            Apply Now
          </button>
        )}

        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialIcon} aria-label="WhatsApp">
            <WhatsappIcon />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default MissionCard;
