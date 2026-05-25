import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------- Signup page ----------
function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    rollno: "",
    group: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.branch ||
      !form.rollno ||
      !form.group
    ) {
      toast.error("Please fill in all fields to create your student account.");
      return;
    }

    // Store user in localStorage (demo only)
    localStorage.setItem("user:" + form.email, JSON.stringify(form));

    toast.success("Student account created successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.portalTitle}>Student Portal</div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Create Student Account</h2>
        <p style={styles.cardSubtitle}>
          Register to access your dashboard and updates.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Student Email
            <input
              type="email"
              name="email"
              placeholder="e.g. student@example.com"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              name="password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Branch
            <input
              type="text"
              name="branch"
              placeholder="e.g. CSE, ECE, MECH"
              value={form.branch}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Roll Number
            <input
              type="text"
              name="rollno"
              placeholder="Enter your roll number"
              value={form.rollno}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Group
            <input
              type="text"
              name="group"
              placeholder="e.g. Group A, Section 1"
              value={form.group}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.primaryButton}>
            Sign up as Student
          </button>
        </form>

        <p style={styles.footerText}>
          Already registered?{" "}
          <Link to="/login" style={styles.link}>
            Go to Student Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// ---------- Login page ----------
function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your student email and password.");
      return;
    }

    const stored = localStorage.getItem("user:" + form.email);
    if (!stored) {
      toast.error("Student account not found. Please sign up first.");
      return;
    }

    const user = JSON.parse(stored);

    if (user.password !== form.password) {
      toast.error("Incorrect password. Please try again.");
      return;
    }

    // Save current user session
    localStorage.setItem("currentUser", JSON.stringify(user));

    toast.success(`Welcome back, ${user.name}!`);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.portalTitle}>Student Portal</div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Student Login</h2>
        <p style={styles.cardSubtitle}>
          Sign in to access your personalized student dashboard.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Student Email
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.primaryButton}>
            Login to Portal
          </button>
        </form>

        <p style={styles.footerText}>
          New student?{" "}
          <Link to="/signup" style={styles.link}>
            Create your student account
          </Link>
        </p>
      </div>
    </div>
  );
}

// ---------- Dashboard page ----------
function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) return null;

  const pageStyle = {
    minHeight: "100vh",
    margin: 0,
    padding: "40px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background:
      "radial-gradient(circle at top, rgba(159,132,255,0.15), transparent 60%), " +
      "radial-gradient(circle at bottom, #000000, #05030a)",
    color: "#ffffff",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "24px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#c4a4ff",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: "linear-gradient(145deg, #0f0b1a, #080413)",
    borderRadius: "18px",
    padding: "0 0 24px 0",
    boxShadow:
      "0 24px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(196, 164, 255, 0.12)",
    border: "1px solid #2a2438",
    overflow: "hidden",
  };

  // Banner image at top
  const bannerStyle = {
    width: "100%",
    height: "160px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "brightness(0.7)",
  };

  const cardContentStyle = {
    padding: "20px 22px 0 22px",
  };

  const headingStyle = {
    margin: 0,
    marginBottom: "8px",
    fontSize: "22px",
  };

  const subtitleStyle = {
    margin: 0,
    marginBottom: "18px",
    fontSize: "14px",
    color: "#c1bedf",
  };

  const sectionTitleStyle = {
    marginTop: "8px",
    marginBottom: "8px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#c4a4ff",
  };

  const detailsBoxStyle = {
    padding: "10px 12px",
    borderRadius: "12px",
    background: "#120a20",
    border: "1px solid #2a2438",
  };

  const detailRowStyle = {
    margin: 0,
    fontSize: "13px",
    color: "#c1bedf",
    lineHeight: 1.7,
  };

  const labelStyle = {
    fontWeight: 600,
    color: "#e2d5ff",
  };

  const logoutButtonStyle = {
    marginTop: "18px",
    padding: "10px 16px",
    fontSize: "15px",
    fontWeight: 500,
    borderRadius: "999px",
    border: "1px solid #2a2438",
    cursor: "pointer",
    backgroundColor: "#1b132d",
    color: "#f4efff",
    marginLeft: "22px",
  };

  return (
    <div style={pageStyle}>
      <div style={titleStyle}>Student Portal</div>

      <div style={cardStyle}>
        {/* Banner image */}
        <div style={bannerStyle} />

        {/* Content */}
        <div style={cardContentStyle}>
          <h2 style={headingStyle}>Welcome, {user.name}</h2>
          <p style={subtitleStyle}>
            This is your student dashboard with your registered details.
          </p>

          <h3 style={sectionTitleStyle}>Student Details</h3>
          <div style={detailsBoxStyle}>
            <p style={detailRowStyle}>
              <span style={labelStyle}>Name: </span>
              {user.name}
            </p>
            <p style={detailRowStyle}>
              <span style={labelStyle}>Roll Number: </span>
              {user.rollno}
            </p>
            <p style={detailRowStyle}>
              <span style={labelStyle}>Branch: </span>
              {user.branch}
            </p>
            <p style={detailRowStyle}>
              <span style={labelStyle}>Group: </span>
              {user.group}
            </p>
            <p style={detailRowStyle}>
              <span style={labelStyle}>Email: </span>
              {user.email}
            </p>
          </div>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Main app with routes ----------
function AppInner() {
  const isLoggedIn = !!localStorage.getItem("currentUser");

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

// ---------- Shared styles for signup & login ----------
const colors = {
  background: "#05030a",
  cardBg: "#0f0b1a",
  accentLavender: "#c4a4ff",
  accentLavenderSoft: "#9f84ff",
  textPrimary: "#ffffff",
  textMuted: "#c1bedf",
  borderSubtle: "#2a2438",
  buttonPrimaryBg: "#c4a4ff",
  buttonPrimaryText: "#05030a",
  link: "#e2d5ff",
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    margin: 0,
    padding: "40px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: `radial-gradient(circle at top, ${colors.accentLavenderSoft}22, transparent 60%), 
                 radial-gradient(circle at bottom, #000000, ${colors.background})`,
    color: colors.textPrimary,
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  portalTitle: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "24px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.accentLavender,
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: `linear-gradient(145deg, ${colors.cardBg}, #080413)`,
    borderRadius: "18px",
    padding: "24px 22px 28px",
    boxShadow:
      "0 24px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(196, 164, 255, 0.12)",
    border: `1px solid ${colors.borderSubtle}`,
  },
  cardTitle: {
    fontSize: "22px",
    margin: 0,
    marginBottom: "8px",
  },
  cardSubtitle: {
    fontSize: "14px",
    margin: 0,
    marginBottom: "18px",
    color: colors.textMuted,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "13px",
    color: colors.textMuted,
    gap: "4px",
    textAlign: "left",
  },
  input: {
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "10px",
    border: `1px solid ${colors.borderSubtle}`,
    backgroundColor: "#090513",
    color: colors.textPrimary,
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  primaryButton: {
    marginTop: "8px",
    padding: "10px 14px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background: `linear-gradient(135deg, ${colors.buttonPrimaryBg}, ${colors.accentLavenderSoft})`,
    color: colors.buttonPrimaryText,
    boxShadow: "0 10px 30px rgba(196, 164, 255, 0.4)",
  },
  footerText: {
    marginTop: "8px",
    fontSize: "13px",
    color: colors.textMuted,
    textAlign: "center",
  },
  link: {
    color: colors.link,
    textDecoration: "none",
    fontWeight: 500,
  },
};