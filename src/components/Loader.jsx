// Loading.jsx
export default function Loader() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner}></div>
      <p className="text-xl">Loading...</p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ddd",
    borderTop: "4px solid #1e40af",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};
