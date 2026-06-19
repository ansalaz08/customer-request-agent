import { useState } from 'react'
import { submitRequirement } from './services/api';
import { type Transaction } from './types/transaction';
import CsvUploader from './components/CsvUploader';
import TransactionTable from './components/TransactionTable';

interface RequirementResponse {
  summary: string;
  status: string;
}

function App() {
  const [requirement, setrequirement] = useState("");
  const [response, setResponse] = useState<RequirementResponse | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
  if (!requirement.trim()) return;

  try {
    setLoading(true);
    setResponse(null);
    setError(null);

    await submitRequirement(requirement);

    setResponse({summary: "Require manager approval for purchases over $5000", status: "Ready for processing"});
  } catch {
    setError("Failed to submit requirement");
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.badge}>AGENT</span>
          <h1 style={styles.title}>Customer Request</h1>
          <p style={styles.subtitle}>Submit a business requirement below.</p>
        </div>
 
        <textarea
          style={styles.textarea}
          placeholder="e.g. Require manager approval for purchases over $5000"
          value={requirement}
          onChange={(e) => setrequirement(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          disabled={loading}
        />
 
        <button
          style={{
            ...styles.button,
            ...(loading || !requirement.trim() ? styles.buttonDisabled : {}),
          }}
          onClick={handleSubmit}
          disabled={loading || !requirement.trim()}
        >
          {loading ? (
            <span style={styles.loadingRow}>
              <span style={styles.dot} />
              <span style={styles.dot} />
              <span style={styles.dot} />
            </span>
          ) : (
            "Submit Requirement"
          )}
        </button>
 
        {(response || error) && (
          <div style={{ ...styles.panel, ...(error ? styles.panelError : {}) }}>
            {error ? (
              <span style={styles.errorText}>{error}</span>
            ) : (
              <>
                <span style={styles.checkmark}>✓</span>
                <span style={styles.responseText}>{response.summary}</span>
              </>
            )}
          </div>
        )}

        {response && !error && (
          <div style={styles.configPanel}>
            <div style={styles.configSection}>
              <p style={styles.configLabel}>Requirement Submitted</p>
              <div style={styles.divider} />
              <p style={styles.configRequirement}>
                Require manager approval<br />for purchases over $5000
              </p>
            </div>
            <div style={styles.configSection}>
              <p style={styles.configLabel}>Generated Configuration</p>
              <div style={styles.divider} />
              <pre style={styles.configCode}>{`{
                "approvalThreshold": 5000,
                "approver": "manager",
                "escalationHours": 48
                }`}
              </pre>
            </div>
          </div>
        )}
 
        <p style={styles.hint}>Press Ctrl/Cmd + Enter to submit</p>

        <CsvUploader
          onTransactionsLoaded={setTransactions}
        />

        <TransactionTable
          transactions={transactions}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f1117",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    padding: "24px",
  },
  card: {
    backgroundColor: "#1a1d27",
    border: "1px solid #2a2d3e",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
  },
  header: {
    marginBottom: "28px",
  },
  badge: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    color: "#6c63ff",
    backgroundColor: "rgba(108,99,255,0.12)",
    border: "1px solid rgba(108,99,255,0.25)",
    borderRadius: "4px",
    padding: "3px 8px",
    marginBottom: "12px",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "24px",
    fontWeight: 700,
    color: "#f0f0f5",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },
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
  panel: {
    marginTop: "18px",
    backgroundColor: "rgba(108,99,255,0.08)",
    border: "1px solid rgba(108,99,255,0.2)",
    borderRadius: "10px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  panelError: {
    backgroundColor: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)",
  },
  checkmark: {
    fontSize: "18px",
    color: "#6c63ff",
    flexShrink: 0,
  },
  responseText: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#c4c0ff",
  },
  errorText: {
    fontSize: "14px",
    color: "#f87171",
  },
  hint: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#374151",
    textAlign: "center",
  },
  loadingRow: {
    display: "inline-flex",
    gap: "5px",
    alignItems: "center",
  },
  dot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#9ca3af",
    animation: "pulse 1.2s ease-in-out infinite",
  },
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
    textTransform: "uppercase" as const,
  },
  divider: {
    height: "1px",
    backgroundColor: "#2a2d3e",
    marginBottom: "12px",
  },
  configRequirement: {
    margin: 0,
    fontSize: "14px",
    color: "#9ca3af",
    lineHeight: 1.6,
  },
  configCode: {
    margin: 0,
    fontSize: "13px",
    color: "#a5b4fc",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Menlo', monospace",
    lineHeight: 1.7,
    whiteSpace: "pre" as const,
  },
};

export default App
