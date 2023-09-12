import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './style.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const generatePDF = () => {
    const el = document.getElementById('lead-form');
    const opt = {
      margin: 0,
      filename: 'lead-form.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const pdf = html2pdf().set(opt).from(el).outputPdf('arraybuffer');
    return pdf.then((res) => {
      const base64 = btoa(String.fromCharCode(...new Uint8Array(res)));
      const formData = new FormData();
      formData.append('pdf', base64);
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

      console.log('PDF generated');
    });
  };

  return (
    <div className="form-container" id='lead-form'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type='button' onClick={generatePDF}>Generate PDF</button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
