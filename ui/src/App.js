import * as _ from 'lodash';
import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
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
    fetch('/v1/job?status=new')
      .then((result) => result.json())
      .then((result) => {
        this.setState({ invited: _.get(result, 'jobs', []) });
      });
    fetch('/v1/job?status=accepted')
    .then((result) => result.json())
    .then((result) => {
      this.setState({ accepted: _.get(result, 'jobs', []) });
    });
  }

  listJobs(status) {
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
                const { id, contact_name, price, description, create_at, suburbs_name, postcode, categories_name } = job;
                return (
                  <Card key={id}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{contact_name}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button onClick={() => this.acceptJob(id)} size="small" color="primary">
                        Accept
                      </Button>
                      <Button onClick={() => this.declineJob(id)} size="small" color="primary">
                        Decline
                      </Button>
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
                  price, description, create_at, suburbs_name, postcode, categories_name, 
                } = job;
                return (
                  <Card key={id}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">{contact_name}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
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
