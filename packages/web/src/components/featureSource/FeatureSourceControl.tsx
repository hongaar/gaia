import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  IconButton,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFeatureSource } from "../../contexts/FeatureSourceContext";

export function FeatureSourceControl() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newUrl, setNewUrl] = useState("");
  const { sources, addSource, removeSource } = useFeatureSource();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddSource = () => {
    addSource(newUrl);
    setNewUrl("");
  };

  return (
    <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
      <Button
        variant="contained"
        startIcon={<SettingsIcon />}
        onClick={handleClick}
        sx={{ backgroundColor: "white", color: "black" }}
      >
        Feature Sources
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{ paper: { sx: { minWidth: 300, maxWidth: 400 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Manage Feature Sources
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              size="small"
              placeholder="Enter source URL"
              value={newUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewUrl(e.target.value)
              }
              fullWidth
            />
            <IconButton onClick={handleAddSource} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
          {sources.map((source) => (
            <Box
              key={source.href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
                p: 1,
                bgcolor: "grey.100",
                borderRadius: 1,
              }}
            >
              <Typography sx={{ flex: 1, wordBreak: "break-all" }}>
                {source.name || source.href}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeSource(source.href)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Menu>
    </Box>
  );
}
