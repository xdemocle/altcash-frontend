import { Button, Card, CardContent, TextField } from '@mui/material';
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
import useStyles from './use-styles';

type IInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [captchaValid, setCaptchaValid] = useState(false);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true
  });

  const onCaptchaChange = (token: string | null) => {
    // console.log('Captcha value:', token)
    if (token && !!token.length) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
    }
  };

  const onSubmitHandler = (data: unknown) => {
    // console.log(data);
  };

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
              {...register('email', {
                required: REQUIRED_EMAIL_TEXT,
                maxLength: 320,
                pattern: {
                  value: FORM_EMAIL_VALIDATION_REGEX,
                  message: REQUIRED_EMAIL_TEXT
                }
              })}
              name="email"
              label="E-Mail"
              autoComplete="email"
              variant="outlined"
              required
              className={classes.textField}
              inputProps={{
                maxLength: '320'
              }}
              helperText={errors && errors.email && errors.email.message}
            />
            <TextField
              {...register('password', {
                required: true,
                maxLength: 255,
                minLength: {
                  value: 8,
                  message: REQUIRED_PASSWORD_TEXT
                }
              })}
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              variant="outlined"
              required
              className={classes.textField}
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
            Or <Link href="/signup">register here</Link> for a new account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
