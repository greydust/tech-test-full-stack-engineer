import moment from 'moment';
import {
  Avatar,
  Button,
  Card, CardActions, CardContent, Typography,
  Chip,
  Divider,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import WorkIcon from '@material-ui/icons/Work';
import React, { Component } from 'react';

class InvitedCard extends Component {
  render() {
    const {
      job: {
        id, contact_name, price, description, created_at, suburbs_name, postcode, categories_name,
      },
      acceptJob,
      declineJob,
    } = this.props;
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
          <Button onClick={() => acceptJob(id)} size="small" color="primary">
            Accept
          </Button>
          <Button onClick={() => declineJob(id)} size="small" color="primary">
            Decline
          </Button>
          <Typography>${price} Lead Invitation</Typography>
        </CardActions>
      </Card>
    );
  }
}

export default InvitedCard;
