import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useFeatureSource } from "../../contexts/FeatureSourceContext";

export function FeatureSourceList() {
  const { sources, removeSource } = useFeatureSource();

  if (sources.length === 0) {
    return (
      <Paper sx={{ p: 2, m: 2 }}>
        <Typography color="text.secondary">
          No feature sources configured. Add sources using the Feature Sources
          button.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ m: 2 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">Active Feature Sources</Typography>
      </Box>
      <List>
        {sources.map((source) => (
          <ListItem key={source.href} divider>
            <ListItemText
              primary={source.name}
              secondary={
                <>
                  {source.description && (
                    <Typography variant="body2" component="div" gutterBottom>
                      {source.description}
                    </Typography>
                  )}
                  <Typography variant="caption" component="div">
                    URL: {source.href}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeSource(source.href)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
