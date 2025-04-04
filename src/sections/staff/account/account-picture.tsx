import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

function AccountPicture({ photoUrl }: { photoUrl: string }) {
  const [image, setImage] = useState<string>(photoUrl);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true); 
      const imageUrl = URL.createObjectURL(file);
      setTimeout(() => {
        setImage(imageUrl); 
        setLoading(false); 
      }, 1000);
    }
  }, []);

  const handleRemove = useCallback(() => {
    setLoading(true); 
    setTimeout(() => {
      setImage(''); 
      setLoading(false); 
    }, 1000); 
  }, []);

  return (
    <Box className="gap-3 flex flex-col" position="relative">
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography variant="h6">Profile Picture</Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={3}
        bgcolor={"white"}
        borderRadius={2}
      >
        <Box className="flex items-center gap-4">
          <Avatar
            src={image || photoUrl} 
            alt="Profile Picture"
            sx={{ width: 60, height: 60 }}
          />
          <Stack>
            <Typography color="textSecondary">
              You can upload jpg, gif, or png image
            </Typography>
            <Typography color="textSecondary">files, Max size of 3MB</Typography>
          </Stack>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Button variant="outlined" color="inherit" onClick={handleRemove}>
            Remove
          </Button>
          <Button variant="contained" component="label">
            Upload New Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload} 
            />
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default AccountPicture;