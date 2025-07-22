import React, { useState } from 'react';
import {
  TextField, Button, Box, Typography
} from '@mui/material';
import axios from 'axios';

const AddRunForm = ({ onRunAdded }) => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('user_id');

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('distance_km', distance);
    formData.append('time_minutes', time);
    formData.append('location_text', location);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    if (photo) formData.append('photo', photo);

    try {
      const API_BASE = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${API_BASE}/api/runs`, formData);

      setSuccess(true);
      onRunAdded();
      setDistance('');
      setTime('');
      setLocation('');
      setLatitude('');
      setLongitude('');
      setPhoto(null);
    } catch (err) {
      console.error('Error uploading run:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={4}>
      <Typography variant="h6" gutterBottom>Add a New Run</Typography>
      {success && <Typography color="success.main">Run saved!</Typography>}

      <TextField
        label="Distance (km)"
        fullWidth margin="normal"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <TextField
        label="Time (minutes)"
        fullWidth margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <TextField
        label="Location"
        fullWidth margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Latitude"
        fullWidth margin="normal"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <TextField
        label="Longitude"
        fullWidth margin="normal"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />

      <Button
        variant="outlined"
        component="label"
        sx={{ mt: 2 }}
      >
        Upload Photo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Button>

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
      >
        Save Run
      </Button>
    </Box>
  );
};

export default AddRunForm;
