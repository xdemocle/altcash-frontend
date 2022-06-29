/* eslint-disable no-console */
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField
} from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import {
  FORM_EMAIL_VALIDATION_REGEX,
  GOOGLE_CAPTCHA_SITEKEY,
  REQUIRED_EMAIL_TEXT,
  REQUIRED_PASSWORD_TEXT
} from '../../common/constants';
import {
  strengthColor,
  strengthIndicator
} from '../../common/strength-password';
import useStyles from './use-styles';

interface IInputs {
  email: string;
  username: string;
  password: string;
  password2: string;
}

const Signup = () => {
  const classes = useStyles();
  const [captchaValid, setCaptchaValid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // defaultValues: {},
    // resolver: undefined,
    // context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const strength = strengthIndicator(watch('password') || '');
  const color = strengthColor(strength);

  function onCaptchaChange(token: string | null) {
    // console.log('Captcha value:', token)
    if (token && !!token.length) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
    }
  }

  const onSubmitHandler = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <h1 className="display-3">Signup</h1>
      <Card>
        <CardContent>
          <form
            noValidate
            autoComplete="off"
            method="POST"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <TextField
              {...register('email', {
                required: REQUIRED_EMAIL_TEXT,
                maxLength: 320,
                pattern: {
                  value: FORM_EMAIL_VALIDATION_REGEX,
                  message: 'E-Mail field has an error'
                }
              })}
              name="email"
              // label="E-Mail"
              placeholder="E-Mail"
              variant="outlined"
              required
              autoComplete="email"
              className={classes.textField}
              inputProps={{
                maxLength: '320'
              }}
              helperText={errors && errors.email && errors.email.message}
            />

            <TextField
              {...register('password', {
                required: REQUIRED_PASSWORD_TEXT,
                maxLength: 255,
                minLength: {
                  value: 8,
                  message: REQUIRED_PASSWORD_TEXT
                }
              })}
              name="password"
              // label="Password"
              placeholder="Password"
              type="password"
              variant="outlined"
              required
              autoComplete="new-password"
              className={classes.textField}
              inputProps={{
                maxLength: '255'
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">{color}</InputAdornment>
                )
              }}
              helperText={errors && errors.password && errors.password.message}
            />

            <TextField
              {...register('password2', {
                required: REQUIRED_PASSWORD_TEXT,
                maxLength: 255,
                minLength: {
                  value: 8,
                  message: REQUIRED_PASSWORD_TEXT
                }
              })}
              name="password2"
              // label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              variant="outlined"
              required
              autoComplete="new-password"
              className={classes.textField}
              inputProps={{
                maxLength: '255'
              }}
              helperText={
                errors && errors.password2 && errors.password2.message
              }
            />

            <div className={clsx(classes.textField, classes.captcha)}>
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
              disabled={
                !captchaValid ||
                !!errors.email ||
                !!errors.password ||
                !!errors.password2
              }
            >
              Register
            </Button>
          </form>
          <p className={classes.paragraphText}>
            Or <Link href="/login">login here</Link> if you already have an
            account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
