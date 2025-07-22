import React, { useEffect, useState } from 'react';
import AddRunForm from '../components/AddRunForm';
import {
  Typography, Box, Card, CardContent, Grid
} from '@mui/material';
import axios from 'axios';

const DashboardPage = () => {
  const user_id = localStorage.getItem('user_id');
  const [summary, setSummary] = useState(null);
  const [runs, setRuns] = useState([]);

  useEffect(() => {

    if (!user_id) return;

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

    axios.get(`${API_BASE}/api/summary?user_id=${user_id}`)
        .then(res => setSummary(res.data))
        .catch(() => setSummary(null));

    axios.get(`${API_BASE}/api/runs?user_id=${user_id}`)
        .then(res => setRuns(res.data))
        .catch(() => setRuns([]));

    }, [user_id]);


  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      {summary && (
        <Box mb={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Summary</Typography>
              <Typography>Total Runs: {summary.total_runs}</Typography>
              <Typography>Total Distance: {summary.total_distance_km} km</Typography>
              <Typography>Average Pace: {summary.avg_pace_min_per_km} min/km</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    
        <AddRunForm onRunAdded={() => {
            axios.get(`${API_BASE}/api/summary?user_id=${user_id}`)
                .then(res => setSummary(res.data));
            axios.get(`${API_BASE}/api/runs?user_id=${user_id}`)
                .then(res => setRuns(res.data));
        }} />

      <Typography variant="h6" gutterBottom>Your Runs</Typography>
      <Grid container spacing={2}>
        {runs.map(run => (
          <Grid item xs={12} sm={6} key={run.id}>
            <Card>
              <CardContent>
                <Typography>Date: {new Date(run.run_date).toISOString().split('T')[0]}</Typography>
                <Typography>Location: {run.location}</Typography>
                <Typography>Distance: {run.distance_km} km</Typography>
                <Typography>Time: {run.time_minutes} min</Typography>
                <Typography>Pace: {run.pace_min_per_km} min/km</Typography>
                {run.photo_url && (
                  <Box
                        sx={{
                            width: '100%',
                            height: 180,
                            overflow: 'hidden',
                            borderRadius: 1,
                            border: '1px solid #ccc',
                            mt: 2
                        }}
                        >
                        <img
                            src={run.photo_url}
                            alt="run"
                            style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                            }}
                        />
                    </Box>
                )}
                {run.map_link && (
                  <Typography mt={1}>
                    <a href={run.map_link} target="_blank" rel="noreferrer">View on Map</a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
