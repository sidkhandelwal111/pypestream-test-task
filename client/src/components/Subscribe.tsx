import React, { useState } from 'react';
import { TextField, Button, FormLabel, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { subscribe } from '../utils/apiUtils';
import './subscribe.css';

function Subscribe() {
  const [topic, setTopic] = useState('');
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    subscribe(email, topic).then(response => {
      if (!response.statusCode) {
        setEmail('');
        setTopic('');
        setSnackbar({
          open: true,
          message: `Subscribed to ${response.name}`
        });
      } else {
        setSnackbar({
          open: true,
          message: response.message
        });
      }
    });
  }

  const handleClose = () => {
    setSnackbar({
      open: false,
      message: ''
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="formWrapper">
        <FormLabel>
          <p>Email: </p>
          <TextField type="email" style={{ width: '500px' }} variant="outlined" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormLabel>
        <FormLabel>
          <p>Topic: </p>
          <TextField style={{ width: '500px' }} variant="outlined" placeholder="Enter Topic..." value={topic} onChange={(e) => setTopic(e.target.value)} />
        </FormLabel>
        <Button type="submit" variant="outlined" color="primary" className="submitButton">Subscribe</Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbar.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}

export default Subscribe;
