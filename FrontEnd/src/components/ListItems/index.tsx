import { Balance, BorderAll, Business, ExpandLess, ExpandMore, Inventory, Paid, QrCode, Receipt, Settings, StarBorder } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Collapse, Container, Divider, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { Link } from 'react-router-dom';

const pl = 3;
export function MenuOptions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  function handleChange(panel: string) {
    setExpanded(!!expanded ? false : panel);
  };


  return <Box
    component="main"
    sx={{
      flexGrow: 1,
      height: '80vh',
      overflow: 'auto',
    }}
  >
   
      <List component="nav">
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
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
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          Cadastros Básicos
        </ListSubheader>
        <Link to="/categoriasdedespesa" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton>
            <ListItemIcon>
              <BorderAll />
            </ListItemIcon>
            <ListItemText primary="Cat. de despesas" />
          </ListItemButton>
        </Link>
        <Link to="/fornecedores" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Fornecedores" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={() => handleChange('products')}>
          <ListItemIcon>
            <QrCode />
          </ListItemIcon>
          <ListItemText primary="Produtos" />
          {expanded === 'products' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expanded === 'products'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/produtos" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ pl }}>
                <ListItemIcon>
                  <Inventory />
                </ListItemIcon>
                <ListItemText primary="Prod consumidor" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link to="/usuarios" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton onClick={() => handleChange('user')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </Link>
        <Divider sx={{ my: 1 }} />
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
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
      </List>
  </Box >
};