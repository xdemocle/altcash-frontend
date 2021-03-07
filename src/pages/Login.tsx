/* eslint-disable no-console */
import { Button, Card, CardContent, TextField } from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  FORM_EMAIL_VALIDATION_REGEX,
  GOOGLE_CAPTCHA_SITEKEY,
  REQUIRED_EMAIL_TEXT,
  REQUIRED_PASSWORD_TEXT
} from '../constants'

type Inputs = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const classes = useStyles()
  const [captchaValid, setCaptchaValid] = useState(false)
  const { register, handleSubmit, errors } = useForm<Inputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // defaultValues: {},
    // resolver: undefined,
    // context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true
  })

  function onCaptchaChange(token: string | null) {
    // console.log('Captcha value:', token)
    if (token && !!token.length) {
      setCaptchaValid(true)
    } else {
      setCaptchaValid(false)
    }
  }

  const onSubmitHandler = (data: unknown) => {
    console.log(data)
  }

  return (
    <div className={classes.root}>
      <h1 className="display-3">Login</h1>
      <Card>
        <CardContent>
          <form
            noValidate
            autoComplete="off"
            method="POST"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <TextField
              name="email"
              label="E-Mail"
              autoComplete="email"
              variant="outlined"
              required
              className={classes.textField}
              inputProps={{
                maxLength: '320'
              }}
              inputRef={register({
                required: REQUIRED_EMAIL_TEXT,
                maxLength: 320,
                pattern: {
                  value: FORM_EMAIL_VALIDATION_REGEX,
                  message: REQUIRED_EMAIL_TEXT
                }
              })}
              helperText={errors && errors.email && errors.email.message}
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
                  message: REQUIRED_PASSWORD_TEXT
                }
              })}
              inputProps={{
                maxLength: '255'
              }}
              helperText={errors && errors.password && errors.password.message}
            />
            <div className={classes.textField}>
              <ReCAPTCHA
                sitekey={GOOGLE_CAPTCHA_SITEKEY}
                onChange={onCaptchaChange}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.buttonField}
              disabled={!captchaValid || !!errors.email || !!errors.password}
            >
              Login
            </Button>
          </form>
          <p className={classes.paragraphText}>
            Or <Link to="/signup">register here</Link> for a new account.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login

const useStyles = makeStyles(({ breakpoints, spacing, typography }: Theme) => ({
  root: {
    paddingTop: typography.pxToRem(spacing(2)),
    marginLeft: typography.pxToRem(spacing(2)),
    paddingBottom: typography.pxToRem(spacing(2)),
    marginRight: typography.pxToRem(spacing(2)),
    [breakpoints.up('sm')]: {
      paddingTop: typography.pxToRem(spacing(2)),
      marginLeft: typography.pxToRem(spacing(5)),
      paddingBottom: typography.pxToRem(spacing(5)),
      marginRight: typography.pxToRem(spacing(5))
    }
  },
  textField: {
    marginRight: spacing(3),
    marginBottom: spacing(3),
    display: 'block',
    '& .MuiInputBase-formControl': {
      width: '100%',
      [breakpoints.up('sm')]: {
        width: '50%'
      }
    },
    '& .MuiFormHelperText-root': {
      color: red[600]
    }
  },
  buttonField: {
    paddingLeft: spacing(5),
    paddingRight: spacing(5),
    height: '3.5rem'
  },
  paragraphText: {
    marginTop: spacing(4)
  }
}))
