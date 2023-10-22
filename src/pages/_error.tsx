import { NextPage, NextPageContext } from 'next';

type ErrorProps = {
  statusCode: number | undefined;
};

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  if (typeof window == 'undefined') {
    // use dynamic import to avoid typescript error
    // https://2ality.com/2017/01/import-operator.html
    const newrelic = await import('newrelic');
    newrelic.noticeError(err as Error);
  } else {
    window.newrelic.noticeError(err);
  }

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
