import { Button, Drawer } from 'antd';
import  { useState } from 'react';


const DrawerUser = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                ver Data
            </Button>
            <Drawer
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
            >
                <div>
                    
                </div>     
            </Drawer>
        </>

    )
}
export { DrawerUser }