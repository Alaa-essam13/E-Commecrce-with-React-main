import React from 'react';
import sideImage from '../images/Logo.png';
import Dev from "../components/dev";

const AboutPage = () => {
  return (
<div className="container mt-5 text-center">
      <h1 className="text-center mb-4" style={{ backgroundColor: '#3498db', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
        Welcome to BIT E-Commerce
      </h1>
      <div className="row">
        <div className="col-lg-5">
          <img
            src={sideImage}
            alt="Store Image"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-6">
          <p>
            At BIT E-Commerce, we are revolutionizing the way you shop online. Our commitment is to provide you with high-quality products and an exceptional shopping experience.
          </p>
          <p>
            Established in 2023, we offer a diverse range of products meticulously curated to meet your needs, from cutting-edge electronics to the latest fashion trends.
          </p>
          <p>
            What makes us stand out is our unwavering dedication to customer satisfaction. We strive to make your online shopping seamless, secure, and enjoyable. Our team works tirelessly to ensure top-notch products and excellent customer service.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-center">Our Mission</h2>
        <p>
          Our mission is to redefine the online shopping experience. We believe in providing unparalleled value and aim to exceed your expectations. By embracing innovation and customer-centric values, we seek to make a positive impact on your life through our products and services.
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-center">Meet Our Team</h2>
        <p>
          Behind XYZ E-Commerce is a dedicated team of professionals passionate about E-commerce. Our team consists of experts in various fields, working together to bring you the best shopping experience. From technology enthusiasts to fashion experts, our team is committed to delivering excellence.
        </p>
      </div>
      <div className='mt-8'>
        <Dev />
      </div>
    </div>
  );
};

export default AboutPage;
