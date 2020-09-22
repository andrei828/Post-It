import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './TwitterCard.css'
import footer from './Images/TwitterFooter.png'
import twitterIcon from './Images/twitterIcon.png'

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width: 500,
    display: 'inline-block',
    margin: 5,
    boxShadow: '0px 11px 35px -5px rgba(0,0,0,0.57)',//'0px 0px 30px 0px rgba(0,0,0,0.2), 0px 0px 4px 0px rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  disabledRoot: {
    minWidth: 100,
    width: 500,
    display: 'inline-block',
    margin: 5,
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


export default function TwitterCard(props) { 

  const classes = useStyles()
  const [enabled, setEnabled] = useState(props.loggedIn)

  function toggleEnabled() {
    props.handlePost('twitter', !enabled)
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
      <CardContent className='TwitterContent'>
        <div className='LeftCardTwitter'>
            <img src={twitterIcon} style={{borderRadius: '20px', transform: 'translateX(4px)'}} width='35px' height='35px'/>
        </div>
        <div className='RightClassTwitter'>
          <div class='TwitterTitle'>
            Andrei Liviu <span className='TwitterInfo'>@andreiliviu2 &#8226; Just now</span>
          </div>
          <div className='TwitterBody'>
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
                  ? <span style={{color: 'grey'}}>Tap me to enable Twitter...</span>
                  : <span style={{color: 'grey'}}>Please login on Twitter to post...</span>
                }
                </Typography>
            }
            
            
          </div>
          <div className='TwitterFooter'>
            <img src={footer} height='29px' />
          </div>
        </div>
      </CardContent>
      
    </Card>
  );
}



