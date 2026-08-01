import { useState } from "react";

interface RequirementFormProps {
  loading: boolean;
  onSubmit: (requirement: string) => Promise<void>;
}

function RequirementForm({ loading, onSubmit }: RequirementFormProps) {
  const [requirement, setRequirement] = useState("");

  const handleSubmit = async () => {
    if (!requirement.trim()) return;

    await onSubmit(requirement);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <>
      <textarea
        style={styles.textarea}
        value={requirement}
        placeholder="e.g. Require manager approval for purchases over $5000"
        onChange={(e) => setRequirement(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        disabled={loading}
      />

      <button
        style={{
          ...styles.button,
          ...(loading || !requirement.trim() ? styles.buttonDisabled : {}),
        }}
        disabled={loading || !requirement.trim()}
        onClick={handleSubmit}
      >
        {loading ? "Analyzing..." : "Submit Requirement"}
      </button>

      <p style={styles.hint}>Press Ctrl/Cmd + Enter to submit</p>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  textarea: {
    width: "100%",
    backgroundColor: "#0f1117",
    border: "1px solid #2a2d3e",
    borderRadius: "10px",
    padding: "14px 16px",
    fontSize: "14px",
    color: "#e5e7eb",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    lineHeight: 1.6,
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  button: {
    marginTop: "14px",
    width: "100%",
    padding: "13px",
    backgroundColor: "#6c63ff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "background-color 0.15s",
  },
  buttonDisabled: {
    backgroundColor: "#2a2d3e",
    color: "#4b5563",
    cursor: "not-allowed",
  },
  hint: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#374151",
    textAlign: "center",
  },
};

export default RequirementForm;
