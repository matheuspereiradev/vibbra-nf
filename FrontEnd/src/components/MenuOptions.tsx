import { Balance, BorderAll, Business, ExpandLess, ExpandMore, Handyman, Inventory, Paid, ProductionQuantityLimits, QrCode, Receipt, Settings, WorkHistory } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar, Box, Collapse, Divider, List, ListItem, ListItemAvatar } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AccountBox } from './AccountBox';

const pl = 3;
export function MenuOptions({ isOpen }: { isOpen: boolean }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  function handleChange(panel: string) {
    setExpanded(!!expanded ? false : panel);
  };

  return <Box
    component="main"
    sx={() => {
      if (isOpen)
        return {
          flexGrow: 1,
          height: '80vh',
          overflow: 'auto',
        }
      else
        return {
          height: '80vh',
        }
    }}
  >

    <List component="nav">

      {
        isOpen && <AccountBox />
      }

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
        <List component="div" style={{background: '#F5F5F5'}} disablePadding>
          <Link to="/produtos" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl }}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Produtos" />
            </ListItemButton>
          </Link>
          <Link to="/servicos" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl }}>
              <ListItemIcon>
                <Handyman />
              </ListItemIcon>
              <ListItemText primary="Serviços" />
            </ListItemButton>
          </Link>
          <Link to="/almoxarifado" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl }}>
              <ListItemIcon>
                <ProductionQuantityLimits />
              </ListItemIcon>
              <ListItemText primary="Almoxarifado" />
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
    </List>
  </Box >
};