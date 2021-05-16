import moment from 'moment';
import {
  Avatar,
  Card, CardContent, Typography,
  Chip,
  Divider,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import React, { Component } from 'react';

class AcceptedCard extends Component {
  render() {
    const { job: {
      id, contact_name, contact_phone, contact_email, 
      price, description, updated_at, suburbs_name, postcode, categories_name, 
    } } = this.props;
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
  }
}

export default AcceptedCard;
