import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import Title from './Title';

export default function PageNotFound() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >

      <Grid item xs={3}>
        <img alt='rota protegida' style={{ maxHeight: '20rem' }} src='/notfound.png' />
        <Title>Ops...</Title>
        <Typography>A página que você está acessando não foi encontrada, a página pode ter sido removida ou renomeada</Typography>
      </Grid>

    </Grid>

  );
}
