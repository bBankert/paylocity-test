import { ListItem, Drawer, Divider, List, ListItemText, Toolbar, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const NavigationBar = () => {

    return (
        <Drawer
            sx={{
                width: '15%',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '15%',
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem>
                    <Button variant="text" fullWidth component={Link} to="/">All Employees</Button>
                </ListItem>
                <ListItem>
                    <Button variant="text" fullWidth component={Link} to="add-employee">Add Employee</Button>
                </ListItem>
            </List>
        </Drawer>
        );
}

export default NavigationBar;