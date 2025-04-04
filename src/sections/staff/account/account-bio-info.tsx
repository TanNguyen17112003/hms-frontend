import { SetStateAction, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Stack,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import { Edit, Save } from "lucide-react";
import React from "react";

function AccountBioInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [bioInfo, setBioInfo] = useState([
    {
      title: "Specialization",
      value: "Cardiologist",
      icon: <LocalHospitalIcon color="primary" />,
      field: "specialization",
    },
    {
      title: "License number",
      value: "123456789",
      icon: <BadgeIcon color="primary" />,
      field: "license",
    },
    {
      title: "Qualification",
      value: "MBBS, MD",
      icon: <SchoolIcon color="primary" />,
      field: "qualification",
    },
  ]);
  const [experience, setExperience] = useState("5 years");

  const handleChange = (field: string, newValue: string) => {
    setBioInfo((prev) =>
      prev.map((info) =>
        info.field === field ? { ...info, value: newValue } : info
      )
    );
  };


  const handleExperienceChange = (newValue: SetStateAction<string>) => {
    setExperience(newValue);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false); 
        setIsEditing(false); 
      }, 2000); 
    } else {
      setIsEditing(true); 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%", 
        position: "relative", 
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" fontWeight="bold">
            Bio Information
          </Typography>
          <Button
            startIcon={isEditing ? <Save size={16} /> : <Edit size={16} />}
            variant="contained"
            color="primary"
            onClick={toggleEdit}
            disabled={loading} 
          >
            {isEditing ? "Save Changes" : "Edit Bio"}
          </Button>
        </Stack>

        {bioInfo.map((info, index) => (
          <React.Fragment key={index}>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <Grid item>{info.icon}</Grid>
              <Grid item xs>
                <Typography variant="body1" fontWeight="bold">
                  {info.title}
                </Typography>
                {isEditing ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={info.value}
                    onChange={(e) => handleChange(info.field, e.target.value)}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {info.value}
                  </Typography>
                )}
              </Grid>
            </Grid>
            {index < bioInfo.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: "auto" }} 
      >
        <Grid item>
          <Typography variant="body1" fontWeight="bold">
            Experience
          </Typography>
        </Grid>
        <Grid item>
          {isEditing ? (
            <TextField
              variant="outlined"
              size="small"
              value={experience}
              onChange={(e) => handleExperienceChange(e.target.value)}
            />
          ) : (
            <Typography variant="body1" color="primary">
              {experience}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountBioInfo;