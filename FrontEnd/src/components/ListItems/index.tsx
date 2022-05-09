import { Balance, BorderAll, Business, GraphicEq, Paid, Receipt, Settings } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <>
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/balanco" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <Balance />
        </ListItemIcon>
        <ListItemText primary="Balanço anual" />
      </ListItemButton>
    </Link>
    <Link to="/nf" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <Receipt />
        </ListItemIcon>
        <ListItemText primary="Notas Fiscais" />
      </ListItemButton>
    </Link>
    <Link to="/despesas" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <Paid />
        </ListItemIcon>
        <ListItemText primary="Despesas" />
      </ListItemButton>
    </Link>
    <Link to="/usuarios" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItemButton>
    </Link>
  </>
);

export const secondaryListItems = (
  <>
    <Link to="/configuracoes" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListSubheader component="div" inset>
        Configurações
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItemButton>
    </Link>
    <Link to="/categoriasdedespesa" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <BorderAll />
        </ListItemIcon>
        <ListItemText primary="Cat. de despesas" />
      </ListItemButton>
    </Link>
    <Link to="/empresas" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <Business />
        </ListItemIcon>
        <ListItemText primary="Empresas Parceiras" />
      </ListItemButton>
    </Link>
  </>
);
