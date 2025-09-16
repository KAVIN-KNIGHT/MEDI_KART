import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import '../styles/doctors.css'; 

const FindDoctors = () => {
  const toggleMenu = () => {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
  };

  return (
    <>
      <Header /> {/* Use the imported Header component */}

      <section className="hero">
        <h1>Find the Right Doctor for You</h1>
        <input type="text" placeholder="Search by doctor name or specialty..." />
      </section>

      <h2 className="page-title">Browse by Specialties</h2>

      <div className="specialties">
        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #fff7fa, #fdeef2)' }}>
          <img src="/src/assets/images/general-physician.png" alt="General Physician" />
          <p>General Physician</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #fefaf7, #fceee5)' }}>
          <img src="/src/assets/images/dermatology.png" alt="Dermatology" />
          <p>Dermatology</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #fff8f5, #ffebe0)' }}>
          <img src="/src/assets/images/orthopaedics.jpeg" alt="Orthopaedics" />
          <p>Orthopaedics</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #faf7ff, #f1eaff)' }}>
          <img src="/src/assets/images/ent.png" alt="ENT" />
          <p>ENT</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #f7fff9, #eafff1)' }}>
          <img src="/src/assets/images/neurology.png" alt="Neurology" />
          <p>Neurology</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #f8fbff, #e9f3ff)' }}>
          <img src="/src/assets/images/cardiology.png" alt="Cardiology" />
          <p>Cardiology</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #f6fffc, #eafff6)' }}>
          <img src="/src/assets/images/stomach.png" alt="Gastroenterology" />
          <p>Gastroenterology</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #fff8fa, #ffeff4)' }}>
          <img src="/src/assets/images/psycology.jpeg" alt="Psychiatry" />
          <p>Psychiatry</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #fafff7, #efffe9)' }}>
          <img src="/src/assets/images/pediatrics.png" alt="Paediatrics" />
          <p>Paediatrics</p>
        </div>

        <div className="specialty-card" style={{ background: 'linear-gradient(to right, #fff6ff, #f9eaff)' }}>
          <img src="/src/assets/images/endochrinology.png" alt="Endocrinology" />
          <p>Endocrinology</p>
        </div>
      </div>

     
    </>
  );
};

export default FindDoctors;