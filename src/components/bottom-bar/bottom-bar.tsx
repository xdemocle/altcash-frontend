import { useQuery } from '@apollo/client';
import { Tooltip, Typography } from '@mui/material';
import { GET_COUNT } from '../../graphql/queries';
import { AppBarStyled, LinkStyled } from './styled';

const BottomBar = () => {
  const { data } = useQuery(GET_COUNT);

  return (
    <AppBarStyled color="secondary">
      <Typography variant="body1" color="inherit" align="right">
        {data &&
          data.count &&
          data.count.map(
            (count: { name: string; count: number }, ix: number) => (
              <span key={`${count}${ix}`}>
                {count.name}: {count.count} -{' '}
              </span>
            )
          )}{' '}
        <Tooltip
          title="Require assistance with customer Support"
          placement="top"
          arrow
        >
          <LinkStyled to="/support">Support</LinkStyled>
        </Tooltip>
        {' - '} &copy; Altcash {new Date().getFullYear()}
      </Typography>
    </AppBarStyled>
  );
};

export default BottomBar;
