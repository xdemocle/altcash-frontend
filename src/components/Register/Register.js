import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { EMAIL_REGEX } from '../../constants/constants'
import { CREATE_USER } from '../../graphql/mutations'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleUserInput = this._handleUserInput.bind(this)
    this._isFormValid = this._isFormValid.bind(this)
  }

  /**
   * Update the state as per user input
   * @param inputEvent
   */
  _handleUserInput(inputEvent) {
    const name = inputEvent.target.name
    const value = inputEvent.target.value
    this.setState({ [name]: value })
  }

  /**
   * Validates if form is valid or not
   * A form is considered as valid if (all condition satisfies)
   * a. It have all the fields name, email, password and confirm password
   * b. password and confirmation password is same
   * c. Email address is valid
   * @returns {boolean}
   */
  _isFormValid() {
    const { name, email, password, confirmPassword } = this.state
    return name && email && password && confirmPassword && (password === confirmPassword) && EMAIL_REGEX.test(email)
  }

  /**
   * Submit User details for new user creation
   */
  _handleSubmit = async(event) => {
    event.preventDefault()
    const { name, email, password } = this.state
    try {
      const response = await this.props.mutate({
        variables: {
          name: name,
          email: email,
          password: password
        }
      })
      // TODO: Add global success handler, to show toast notification to user
      this.props.history.push('/buy')
    } catch (e) {
      // TODO: Add global error handler, to show toast notification to user
    }
  }

  /**
   * Generates the page content
   * @returns {XML}
   */
  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon>lock</Icon>
          </Avatar>
          <Typography component="h1" variant="headline">
            Register
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                onChange={(e) => this._handleUserInput(e)}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                onChange={(e) => this._handleUserInput(e)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={(e) => this._handleUserInput(e)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="cPassword">Confirm Password</InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                onChange={(e) => this._handleUserInput(e)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this._isFormValid()}
              onClick={(e) => this._handleSubmit(e)}
            >
              Register
            </Button>
            <hr />
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const RegisterPage = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  graphql(CREATE_USER)
)(Register)

export default RegisterPage
