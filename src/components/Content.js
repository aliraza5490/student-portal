import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import EnhancedTable from "./EnhancedTable";

export default function Content() {
  return (
    <Box sx={{ width: "100%", margin: "auto" }}>
      {false && (
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No users for this project yet
        </Typography>
      )}
      <EnhancedTable />
    </Box>
  );
}
