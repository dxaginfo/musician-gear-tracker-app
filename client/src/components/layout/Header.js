import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/auth/authSlice';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Dashboard, MusicNote, Build, Notifications } from '@mui/icons-material';

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenu = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMobileClose = () => {
    setMobileMenuAnchorEl(null);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
    handleMobileClose();
  };
  
  const mobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMobileClose}
    >
      <MenuItem component={RouterLink} to="/" onClick={handleMobileClose}>
        <Dashboard sx={{ mr: 1 }} /> Dashboard
      </MenuItem>
      <MenuItem component={RouterLink} to="/gear" onClick={handleMobileClose}>
        <MusicNote sx={{ mr: 1 }} /> My Gear
      </MenuItem>
      <MenuItem component={RouterLink} to="/reminders" onClick={handleMobileClose}>
        <Notifications sx={{ mr: 1 }} /> Reminders
      </MenuItem>
      {isAuthenticated ? (
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      ) : (
        <MenuItem component={RouterLink} to="/login" onClick={handleMobileClose}>
          Login
        </MenuItem>
      )}
    </Menu>
  );
  
  const userMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem disabled>{user?.name}</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MusicNote sx={{ mr: 1 }} />
            Musician Gear Tracker
          </Typography>
          
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
              {mobileMenu}
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={RouterLink} to="/">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/gear">
                    My Gear
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/reminders">
                    Reminders
                  </Button>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleMenu}
                  >
                    <AccountCircle />
                  </IconButton>
                  {userMenu}
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
