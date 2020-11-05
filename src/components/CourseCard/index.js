import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function CourseCard(props) {
  const classes = useStyles();
  const {course} = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          课程: {course.subject_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          课时: {course.subject_period}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          课程性质: {course.subject_character}
        </Typography>
        <Typography variant="body2" component="p">
          教授班级: {course.teach_class}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
        <DeleteForeverIcon color="secondary" fontSize="large"/>
        </Button>
      </CardActions>
    </Card>
  );
}