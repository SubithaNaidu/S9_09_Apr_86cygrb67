import { Box, Typography } from '@mui/material';

const Unauthorized = () => (
  <Box textAlign="center" mt={10}>
    <Typography variant="h4">Unauthorized</Typography>
    <Typography>You don’t have access to this page.</Typography>
  </Box>
);

export default Unauthorized;
