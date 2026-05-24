// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form);
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <h2>Create account</h2>
      <form onSubmit={onSubmit} className="auth-form">
        <label>
          Full name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={onChange} />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={onChange} required minLength={6} />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create account"}</button>
      </form>
    </div>
  );
}