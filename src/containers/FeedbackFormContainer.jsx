import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

const COMMENT_MAX_LENGTH = 1000;

class FeedbackFormContainer extends React.Component {
  state = {
    submitted: false,
    formValues: {
      email: '',
      comment: ''
    },
    formErrors: {
      email: false,
      comment: false
    }
  };

  handleFormChange = name => (event) => {
    const { value } = event.currentTarget;

    this.setState(prevState => ({
      ...prevState,
      formValues: {
        ...prevState.formValues,
        [name]: value
      },
      formErrors: {
        ...prevState.formErrors,
        [name]: false
      }
    }));
  };

  isCommentValid = comment => comment.length > 0 && comment.length < COMMENT_MAX_LENGTH;

  isEmailValid = email => email.length > 0;

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { formValues } = this.state;
    const { email, comment } = formValues;

    const errors = {
      email: false,
      comment: false
    };
    if (!this.isCommentValid(comment)) {
      errors.comment = true;
    }
    if (!this.isEmailValid(email)) {
      errors.email = true;
    }
    if (errors.email || errors.comment) {
      this.setState(prevState => ({
        ...prevState,
        formErrors: {
          ...errors
        }
      }));
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      submitted: true
    }));
  };

  render() {
    const { formValues, formErrors, submitted } = this.state;

    return (
      <FeedbackForm
        submitted={submitted}
        formValues={formValues}
        formErrors={formErrors}
        onChange={this.handleFormChange}
        onFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

export default FeedbackFormContainer;
