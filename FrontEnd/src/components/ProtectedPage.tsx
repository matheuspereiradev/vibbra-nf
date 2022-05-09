import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

export default function ProtectedPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <img alt='rota protegida' style={{ maxHeight: '25rem' }} src='https://img.freepik.com/vetores-gratis/seguranca-global-de-dados-seguranca-de-dados-pessoais-ilustracao-do-conceito-on-line-de-seguranca-de-dados-ciberneticos-seguranca-da-internet-ou-privacidade-e-protecao-de-informacoes_1150-37353.jpg?t=st=1651705269~exp=1651705869~hmac=b7e5c8243fc6c5bb1fb3374c7cefe1de27e9c7f0434430bf6f67ec7fc1b53afa&w=740' />
        <Title>Ops...</Title>
        <Typography>Parece que você está tentando acessar uma rota protegida, por favor <Link to="/entrar">faça login</Link></Typography>
      </Grid>

    </Grid>

  );
}
