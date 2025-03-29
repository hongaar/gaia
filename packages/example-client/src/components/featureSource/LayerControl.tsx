import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useFeatureSource } from "../../contexts/FeatureSourceContext";

export function LayerControl() {
  const { sources, toggleLayer, isLayerVisible } = useFeatureSource();

  if (sources.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 60,
        left: 10,
        zIndex: 1,
        width: 300,
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6">Layers</Typography>
        </Box>
        {sources.map((source) => (
          <Accordion key={source.href} defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{source.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {source.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {source.description}
                </Typography>
              )}
              {source.resources.map((resource) => (
                <Accordion
                  key={`${source.href}-${resource.href}`}
                  defaultExpanded={true}
                  disableGutters
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">{resource.type}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {resource.layers.map((layer) => (
                        <ListItem
                          key={`${source.href}-${resource.href}-${layer.id}`}
                        >
                          <ListItemText
                            primary={layer.name}
                            secondary={layer.description}
                          />
                          <ListItemSecondaryAction>
                            <Switch
                              edge="end"
                              checked={isLayerVisible(
                                source.href,
                                resource.href,
                                layer.id,
                              )}
                              onChange={() =>
                                toggleLayer(
                                  source.href,
                                  resource.href,
                                  layer.id,
                                )
                              }
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Box>
  );
}
