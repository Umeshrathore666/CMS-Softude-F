import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/content', {
          headers: {
            'x-auth-token': token,
          },
        });
        setContent(response.data);
      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load content. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };
    fetchContent();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="content-list">
        {content.length > 0 ? (
          content.map((item) => (
            <div key={item._id} className="content-item">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
