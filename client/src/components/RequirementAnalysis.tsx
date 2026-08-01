import { type RequirementAnalysis as RequirementAnalysisType } from "../types/requirement";

interface RequirementAnalysisProps {
  requirement: string;
  analysis: RequirementAnalysisType;
}

function RequirementAnalysis({
  requirement,
  analysis,
}: RequirementAnalysisProps) {
  return (
    <div style={styles.configPanel}>
      <div style={styles.configSection}>
        <p style={styles.configLabel}>Requirement Submitted</p>

        <div style={styles.divider} />

        <p style={styles.configRequirement}>{requirement}</p>
      </div>

      <p style={styles.configLabel}>Requirement Analysis</p>

      <div style={styles.divider} />

      <div style={styles.reviewGrid}>
        <div style={styles.reviewRow}>
          <span style={styles.reviewTitle}>Approval Threshold</span>

          <span style={styles.reviewValue}>
            {analysis.approvalThreshold !== null
              ? `$${analysis.approvalThreshold.toLocaleString()}`
              : "Not specified"}
          </span>
        </div>

        <div style={styles.reviewRow}>
          <span style={styles.reviewTitle}>Approver</span>

          <span style={styles.reviewValue}>
            {analysis.approver
              ? analysis.approver.charAt(0).toUpperCase() +
                analysis.approver.slice(1)
              : "Not specified"}
          </span>
        </div>

        <div style={styles.reviewRow}>
          <span style={styles.reviewTitle}>Needs Clarification</span>

          <span
            style={{
              ...styles.statusBadge,
              backgroundColor: analysis.needsClarification
                ? "#422006"
                : "#052e16",
              color: analysis.needsClarification ? "#fbbf24" : "#22c55e",
            }}
          >
            {analysis.needsClarification ? "Clarification Required" : "Ready"}
          </span>
        </div>

        {analysis.questions.length > 0 && (
          <>
            <div style={styles.sectionDivider} />

            <div style={styles.questionSection}>
              <p style={styles.questionTitle}>Clarification Questions</p>

              <ul style={styles.questionList}>
                {analysis.questions.map((question, index) => (
                  <li key={index} style={styles.questionItem}>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  configPanel: {
    marginTop: "14px",
    backgroundColor: "#0f1117",
    border: "1px solid #2a2d3e",
    borderRadius: "10px",
    overflow: "hidden",
  },

  configSection: {
    padding: "16px 20px",
    borderBottom: "1px solid #2a2d3e",
  },

  configLabel: {
    margin: "0 0 10px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    color: "#4b5563",
    textTransform: "uppercase",
  },

  divider: {
    height: "1px",
    backgroundColor: "#2a2d3e",
    marginTop: "8px",
    marginBottom: "20px",
  },

  configRequirement: {
    margin: 0,
    fontSize: "14px",
    color: "#9ca3af",
    lineHeight: 1.6,
  },

  reviewGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  reviewRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #232633",
  },

  reviewTitle: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: 500,
  },

  reviewValue: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#f3f4f6",
  },

  sectionDivider: {
    height: "1px",
    backgroundColor: "#2a2d3e",
    marginTop: "24px",
    marginBottom: "20px",
  },

  questionSection: {
    marginTop: "4px",
  },

  questionTitle: {
    margin: "0 0 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#f3f4f6",
  },

  questionList: {
    margin: 0,
  },

  questionItem: {
    color: "#d1d5db",
    marginBottom: "12px",
    lineHeight: 1.6,
  },
};

export default RequirementAnalysis;
