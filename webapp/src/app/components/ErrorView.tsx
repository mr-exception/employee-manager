import { Box, Typography } from "@mui/material";

interface Props {
  message?: string;
}

export default function ErrorView({ message }: Props) {
  return (
    <Box sx={{ py: 4 }}>
      <Typography color="error">{message ?? "Something went wrong."}</Typography>
    </Box>
  );
}
