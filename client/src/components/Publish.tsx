import React, { useState, useEffect } from 'react';
import { TextField, Button, FormLabel, List, ListItem, ListItemText, Snackbar, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getMessages, publishMessage } from '../utils/apiUtils';
import './publish.css';

interface BroadcastMessage {
  topic: string,
  message: string
}

function Publish() {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [messages, setMessages] = useState<BroadcastMessage[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    publishMessage(topic, message).then(response => {
      if (!response.statusCode) {
        setMessage('');
        setTopic('');
        setSnackbar({
          open: true,
          message: 'Message broadcasted'
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

  useEffect(() => {
    getMessages().then(topics => {
      let messagesArray: BroadcastMessage[] = [];
      topics.forEach((topicItem: any) => {
        topicItem.messages.forEach((messageItem: string) => {
          messagesArray.push({
            topic: topicItem.name,
            message: messageItem
          })
        })
      });
      setMessages(messagesArray);
    });
  }, [])

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="formWrapper">
        <FormLabel>
          <p>Topic: </p>
          <TextField required style={{ width: '400px' }} variant="outlined" placeholder="Enter Topic..." value={topic} onChange={(e) => setTopic(e.target.value)} />
        </FormLabel>
        <FormLabel>
          <p>Message: </p>
          <TextField required style={{ width: '400px' }} multiline rows={4} variant="outlined" placeholder="Enter Text/HTML Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
        </FormLabel>
        <Button type="submit" variant="outlined" color="primary" className="submitButton">Broadcast</Button>
      </form>
      <div className="messageListWrapper">
        {messages.length > 0 ?
          <List className="messageList">
            {messages.map(messageItem =>
              <ListItem>
                <ListItemText primary={messageItem.topic} secondary={messageItem.message} />
              </ListItem>
            )}
          </List> : <div className="loader">
            <CircularProgress />
          </div>
        }
      </div>
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

export default Publish;
