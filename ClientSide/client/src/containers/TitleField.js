import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '60ch',
      alignContent: 'center'  
    },
  },
}));

export default function TitleTextField(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.change(event.target.value)
  };

  return (
    <div className={classes.root} noValidate autoComplete="off">
      <TextField
        rows={1}
        multiline
        columns={40}
        variant="outlined"
        label="Your title goes here (for Reddit)"
        onChange={handleChange.bind(this)}
        placeholder="Type your title here..."
      />
    </div>
  );
}