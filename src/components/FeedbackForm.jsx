import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const EMAIL_ERROR_TEXT = 'Please provide valid email';
const COMMENT_ERROR_TEXT = "Please provide a comment that doesn't exceed 1000 symbols";

const styles = {};

// TODO: style properly
function FeedbackForm(props) {
  const {
    submitted, formValues, formErrors, onChange, onFormSubmit, classes
  } = props;

  return (
    <div className={classes.formContainer}>
      <Typography paragraph variant="headline">
        Leave a feedback
      </Typography>
      <form onSubmit={onFormSubmit}>
        <Grid container direction="column" spacing={24}>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
            <TextField
              disabled={submitted}
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formValues.email}
              error={formErrors.email}
              helperText={formErrors.email ? EMAIL_ERROR_TEXT : ''}
              fullWidth
              margin="none"
              onChange={onChange('email')}
            />
          </Grid>
          <Grid item xs={12} xl={8}>
            <TextField
              multiline
              disabled={submitted}
              id="comment"
              label="Comment"
              placeholder="Add a comment here"
              value={formValues.comment}
              error={formErrors.comment}
              helperText={formErrors.comment ? COMMENT_ERROR_TEXT : ''}
              fullWidth
              margin="none"
              onChange={onChange('comment')}
            />
          </Grid>
          <Grid item>
            {submitted ? (
              <Typography variant="subheading" color="primary">
                Thank you for the feedback!
              </Typography>
            ) : (
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

FeedbackForm.propTypes = {
  submitted: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({
    email: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired
  }).isRequired,
  formErrors: PropTypes.shape({
    email: PropTypes.bool.isRequired,
    comment: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(FeedbackForm);
