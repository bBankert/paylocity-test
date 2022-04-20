import { ListItem,Drawer,Divider,List,ListItemText,Toolbar,IconButton } from '@mui/material';
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
                    <Link to="/">All Employees</Link>
                </ListItem>
                <ListItem>
                    <Link to="add-employee">Add Employee</Link>
                </ListItem>
            </List>
        </Drawer>
        );
}

export default NavigationBar;