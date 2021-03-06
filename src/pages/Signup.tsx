import { Button, TextField } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  username: string
  password: string
  password2: string
}

const Signup: React.FC = () => {
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
      <h1 className="display-3">Signup</h1>
      <form
        noValidate
        autoComplete="off"
        method="POST"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          name="email"
          label="E-Mail"
          variant="outlined"
          required
          className={classes.textField}
          inputRef={register({
            required: true,
            maxLength: 320,
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'E-Mail field has an error'
            }
          })}
          inputProps={{
            maxLength: '320'
          }}
        />
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          required
          className={classes.textField}
          inputRef={register({ required: true, maxLength: 25 })}
          inputProps={{
            maxLength: '25'
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
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
        <TextField
          name="password2"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
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
          Register
        </Button>
        {errors && console.log(errors)}
      </form>
    </div>
  )
}

export default Signup

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
