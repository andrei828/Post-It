import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import facebookIcon from './Images/facebookIcon1.png'
import './FacebookCard.css'

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width: 500,
    display: 'inline-block',
    margin: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    boxShadow: '0px 11px 35px -5px rgba(0,0,0,0.57)', //'0px 0px 30px 0px rgba(0,0,0,0.2), 0px 0px 4px 0px rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  disabledRoot: {
    minWidth: 100,
    width: 500,
    display: 'inline-block',
    margin: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    borderRadius: '10px',
    opacity: 0.6,
    cursor: 'pointer',
    userSelect: 'none',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function FacebookCard(props) {
  const classes = useStyles();
  const [enabled, setEnabled] = useState(props.loggedIn)

  function toggleEnabled() {
    props.handlePost('facebook', !enabled)
    setEnabled(!enabled)
  }

  return (
    <Card className=
    {
      enabled === true
      ? classes.root
      : classes.disabledRoot
    } onClick={() => props.loggedIn ? toggleEnabled() : ()=>{}}
    >
      <div className='HeaderCard'>
        <img 
          src={facebookIcon}
          width='35px' height='35px'
          style={{borderRadius: '20px', transform: 'translateY(20%)'}} 
        />
        <div className='fbProfile'>
          <div><b>Andrei Liviu</b></div>
          <div style={{fontSize: 'small', color: 'grey'}}>Just now</div>
        </div>
      </div>
      <CardContent>
        {
          enabled === true
          ? <Typography variant="body2" component="p">
            {
              props.content
              ? props.content
              : <span style={{color: 'grey'}}>Great to post from here...</span>
            }
            </Typography>

          : <Typography variant="body2" component="p">
            {
              props.loggedIn
              ? <span style={{color: 'grey'}}>Tap me to enable Facebook...</span>
              : <span style={{color: 'grey'}}>Please login on Facebook to post...</span>
            }
            </Typography>
        }
      </CardContent>
      <div class='FooterCard'>
        <div class='FooterContainerLeft'>
          <span>150 likes</span>
        </div>
        <div class='FooterContainerRight'>
          <span>20 comments</span>  <span>8 shares</span>
        </div>
      </div>
    </Card>
  );
}
