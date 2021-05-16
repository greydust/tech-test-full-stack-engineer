import * as _ from 'lodash';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import './App.css';
import AcceptedCard from './component/job/accepted-card';
import InvitedCard from './component/job/invited-card';

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
          method: 'POST',
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
                const { id } = job;
                return (
                  <InvitedCard key={id} job={job} acceptJob={this.acceptJob.bind(this)} declineJob={this.declineJob.bind(this)} />
                );
              })
            }
          </TabPanel>
          <TabPanel>
            {
              accepted.map((job) => {
                const { id } = job;
                return (
                  <AcceptedCard key={id} job={job} />
                );
              })
            }
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
