import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IEmployeeGuides } from '@/types/user.types';
import { markAsRead } from '@/api-service/employee.service';

export default function MediaCard({guides}:{guides: IEmployeeGuides}) {
    console.log(guides);
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {guides?.user_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {guides?.guide_id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>markAsRead(guides?._id)} onMouseEnter={()=>markAsRead(guides?._id)} size="small">Mark as read</Button>
      </CardActions>
    </Card>
  );
}