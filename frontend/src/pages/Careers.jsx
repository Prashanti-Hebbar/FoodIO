import React from "react";

const Careers = () => {
  return (
    <div className="container" style={{ padding: "2rem 1rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Careers at FoodIO</h1>
      <p style={{ maxWidth: 720 }}>
        We are building the most loved community for food enthusiasts. If you are passionate about
        crafting delightful user experiences and scalable systems, we would love to hear from you.
      </p>
      <h2 style={{ fontSize: "1.25rem", marginTop: "1.5rem" }}>Open Roles</h2>
      <ul>
        <li>Frontend Engineer (React)</li>
        <li>Backend Engineer (Node/Express)</li>
        <li>Product Designer</li>
        <li>Community Manager</li>
      </ul>
      <p>
        Send your profile to <a href="mailto:careers@foodio.com">careers@foodio.com</a>.
      </p>
    </div>
  );
};

export default Careers;


