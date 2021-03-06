import { Button, TextField } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
  username: string
  password: string
}

const Login: React.FC = () => {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm<Inputs>({
    // mode: 'onSubmit',
    // reValidateMode: 'onChange',
    // defaultValues: {},
    // resolver: undefined,
    // context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true
  })

  const onSubmitHandler = (data: unknown) => {
    // e.preventDefault()
    console.log(data)
  }

  return (
    <div className={classes.root}>
      <h1 className="display-3">Login</h1>
      <form
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          name="email"
          label="Username / E-Mail"
          autoComplete="email"
          variant="outlined"
          required
          className={classes.textField}
          inputRef={register({ required: true, maxLength: 320 })}
          inputProps={{
            maxLength: '320'
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          autoComplete="password"
          variant="outlined"
          required
          className={classes.textField}
          inputRef={register({
            required: true,
            maxLength: 255,
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters'
            }
          })}
          inputProps={{
            maxLength: '255'
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.buttonField}
        >
          Login
        </Button>
        {errors && console.log(errors)}
      </form>
      <p>
        Or <Link to="/signup">register here</Link> for a new account.
      </p>
    </div>
  )
}

export default Login

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(3)
  },
  textField: {
    marginRight: spacing(3),
    marginBottom: spacing(3)
  },
  buttonField: {
    paddingLeft: spacing(5),
    paddingRight: spacing(5),
    height: '3.5rem'
  }
}))
