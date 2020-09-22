import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './RedditCard.css'
import downvote from './Images/downvoteReddit.png'
import upvote from './Images/upvoteReddit.png'
import comment from './Images/CommentIconReddit.png'
import footer from './Images/RedditStuff.png'

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width: 500,
    display: 'inline-block',
    margin: 5,
    boxShadow: '0px 11px 35px -5px rgba(0,0,0,0.57)',//'0px 0px 30px 0px rgba(0,0,0,0.2), 0px 0px 4px 0px rgba(0,0,0,0.14), 0px 0px 4px 0px rgba(0,0,0,0.12)',
    borderRadius: '10px'
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

export default function RedditCard(props) {

  const classes = useStyles();
  const [enabled, setEnabled] = useState(props.loggedIn)

  function toggleEnabled() {
    props.handlePost('reddit', !enabled)
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
      
      <CardContent className='RedditContent'>
        <div className='LeftCardReddit'>
            <div><img src={upvote} width='15px'/> </div>
            <div> 253 </div>
            <div><img src={downvote} width='15px'/> </div>
        </div>
        <div className='RightClassReddit'>
          <div class='RedditHeader'>
          Posted by u/postittest just now
          </div>
          <div class='RedditTitle'>
            {
              enabled == true
              ? props.title
                ? props.title
                : <span>Amazing title from Postit</span>
              : <span>The post was canceled</span>
            }
          </div>
          <div className='RedditBody'>
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
                ? <span style={{color: 'grey'}}>Tap me to enable Reddit...</span>
                : <span style={{color: 'grey'}}>Please login on Reddit to post...</span>
              }
              </Typography>
          }
          </div>
          <div className='RedditFooter'>
            <img src={footer} height='25px' />
          </div>
        </div>
      </CardContent>
      
    </Card>
  );
}