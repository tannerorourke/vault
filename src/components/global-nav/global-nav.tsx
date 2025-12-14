// src/components/Layout/Navbar.tsx
'use client'; // This component needs client-side interaction (hooks, state for menu)

import { useState } from 'react';
import Link from 'next/link';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Profile', path: '/profile' },
  { label: 'Projects', path: '/projects/first-project' }, // Example link
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My Portfolio
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Link href={item.path} passHref legacyBehavior>
              <ListItemText primary={item.label} sx={{ textAlign: 'center', width: '100%', py: 1 }} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} // Show only on small screens
        >
          <MenuIcon />
        </IconButton>

        {/* Logo/Title */}
        <Link href="/" passHref legacyBehavior>
          <Typography
            variant="h6"
            component="a"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            My Portfolio
          </Typography>
        </Link>
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref legacyBehavior>
              <Button sx={{ color: '#fff' }}>
                {item.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better mobile performance
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
}