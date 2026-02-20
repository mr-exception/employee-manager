import { Card, CardContent, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Props {
  message?: string;
}

export default function ErrorView({ message }: Props) {
  return (
    <Card variant="outlined" sx={{ py: 6, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />
        <Typography color="error" variant="body1">
          {message ?? "Something went wrong."}
        </Typography>
      </CardContent>
    </Card>
  );
}
