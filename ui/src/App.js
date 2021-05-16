import * as _ from 'lodash';
import {
  Avatar,
  Button,
  Card, CardActionArea, CardActions, CardContent, Typography,
  Chip,
  Divider,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import moment from 'moment';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './App.css';

export class App extends Component {
  state = {
    invited: [],
    accepted: [],
  };

  componentDidMount() {
    this.listJobs('new', 'invited');
    this.listJobs('accepted', 'accepted');
  }

  async listJobs(status, target) {
    fetch(`/v1/job?status=${status}`)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ [target]: _.get(result, 'jobs', []) });
      });
  }

  acceptJob(id) {
    const { invited } = this.state;
    const targetJob = invited.find((job) => job.id === id);
    
    if (targetJob) {
      this.setState({invited: invited.filter((job) => job.id !== id)});

      fetch(
        `v1/job/${id}`,
        {
          body: JSON.stringify({ operation: 'accept' }),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
      )
        .then((result) => result.json())
        .then((result) => {
          if (result.success) {
            const { accepted } = this.state;
            this.setState({ accepted: accepted.concat(targetJob) });
          } else {
            const { invited: newInvite } = this.state;
            this.setState({ invited: newInvite.concat(targetJob) });
          }
        });
    }
  }

  declineJob(id) {
    const { invited } = this.state;
    const targetJob = invited.find((job) => job.id === id);
    
    if (targetJob) {
      this.setState({ invited: invited.filter((job) => job.id !== id) });

      fetch(
        `v1/job/${id}`,
        {
          body: JSON.stringify({ operation: 'decline' }),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
      )
        .then((result) => result.json())
        .then((result) => {
          if (!result.success) {
            const { invited: newInvite } = this.state;
            this.setState({ invited: newInvite.concat(targetJob) });
          }
        });
    }
  }

  render() {
    const { invited, accepted } = this.state;

    return (
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Invited</Tab>
            <Tab>Accepted</Tab>
          </TabList>

          <TabPanel>
            {
              invited.map((job) => {
                const { id, contact_name, price, description, created_at, suburbs_name, postcode, categories_name } = job;
                return (
                  <Card key={id}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">{contact_name}</Typography>
                      <Typography>{moment(created_at).format('YYYY MMM D @ h:mm a')}</Typography>
                      <Divider />
                      <div>
                        <Chip avatar={<Avatar><RoomIcon /></Avatar>} label={`${suburbs_name} ${postcode}`} />
                        <Chip avatar={<Avatar><WorkIcon /></Avatar>} label={categories_name} />
                        <Chip label={`Job ID: ${id}`} />
                      </div>
                      <Divider />
                      <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => this.acceptJob(id)} size="small" color="primary">
                        Accept
                      </Button>
                      <Button onClick={() => this.declineJob(id)} size="small" color="primary">
                        Decline
                      </Button>
                      <Typography>${price} Lead Invitation</Typography>
                    </CardActions>
                  </Card>
                );
              })
            }
          </TabPanel>
          <TabPanel>
            {
              accepted.map((job) => {
                const { 
                  id, contact_name, contact_phone, contact_email, 
                  price, description, updated_at, suburbs_name, postcode, categories_name, 
                } = job;
                return (
                  <Card key={id}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">{contact_name}</Typography>
                      <Typography>{moment(updated_at).format('YYYY MMM D @ h:mm a')}</Typography>
                      <Divider />
                      <div>
                        <Chip avatar={<Avatar><RoomIcon /></Avatar>} label={`${suburbs_name} ${postcode}`} />
                        <Chip avatar={<Avatar><WorkIcon /></Avatar>} label={categories_name} />
                        <Chip label={`Job ID: ${id}`} />
                        <Chip label={`$${price} Lead Invitation`} />
                      </div>
                      <Divider />
                      <div>
                        <Chip avatar={<Avatar><PhoneIcon /></Avatar>} label={contact_phone} />                        
                        <Chip avatar={<Avatar><EmailIcon /></Avatar>} label={contact_email} />                        
                      </div>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            }
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
