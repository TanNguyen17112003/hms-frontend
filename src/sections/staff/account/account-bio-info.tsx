import { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Stack,
  Button,
  TextField,
  CircularProgress,
  Chip,
  IconButton
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import { Edit, Save, X } from 'lucide-react';
import React from 'react';
import { StaffDetail } from 'src/types/user';
import { UsersApi } from 'src/api/user';
import useFunction from 'src/hooks/use-function';

function AccountBioInfo({ staff }: { staff: StaffDetail }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [biography, setBiography] = useState(staff?.biography || '');
  const [services, setServices] = useState(staff?.services || []);
  const [specializations, setSpecializations] = useState(staff?.specializations || []);
  const [newService, setNewService] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');

  const initialValue = useMemo(
    () => [
      {
        title: 'License number',
        value: staff?.licenseNumber,
        icon: <BadgeIcon color='primary' />,
        field: 'license'
      },
      {
        title: 'Qualification',
        value: staff?.qualification,
        icon: <SchoolIcon color='primary' />,
        field: 'qualification'
      }
    ],
    [staff]
  );
  const [bioInfo, setBioInfo] = useState(initialValue);

  const yearExperience = new Date().getFullYear() - new Date(staff?.startWorkingDate).getFullYear();
  const experience = useMemo(() => {
    return `${yearExperience} years`;
  }, [yearExperience]);

  const handleAddService = () => {
    if (newService.trim()) {
      setServices((prev) => [...prev, newService.trim()]);
      setNewService('');
    }
  };

  const handleAddSpecialization = () => {
    if (newSpecialization.trim()) {
      setSpecializations((prev) => [...prev, newSpecialization.trim()]);
      setNewSpecialization('');
    }
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSpecialization = (index: number) => {
    setSpecializations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (field: string, newValue: string) => {
    setBioInfo((prev) =>
      prev.map((info) => (info.field === field ? { ...info, value: newValue } : info))
    );
  };

  const handleUpdateBio = useCallback(async () => {
    setLoading(true);
    try {
      await UsersApi.updateStaffInfo(staff.id, {
        biography,
        services,
        specializations,
        licenseNumber: bioInfo[0].value,
        qualification: bioInfo[1].value
      });
    } catch (error) {
      console.error('Error updating bio:', error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }, [biography, services, specializations]);

  const handleUpdateBioHelper = useFunction(handleUpdateBio, {
    successMessage: 'Bio updated successfully'
  });

  const toggleEdit = () => {
    if (isEditing) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsEditing(false);
        handleUpdateBioHelper.call({});
        // Save changes logic here (e.g., API call)
      }, 2000);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative'
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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

      <Box gap={1} display={'flex'} flexDirection={'column'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ mb: 2 }}
        >
          <Typography variant='h6' fontWeight='bold'>
            Bio Information
          </Typography>
          <Button
            startIcon={isEditing ? <Save size={16} /> : <Edit size={16} />}
            variant='contained'
            color='primary'
            onClick={toggleEdit}
            disabled={loading}
          >
            {isEditing ? 'Save Changes' : 'Edit Bio'}
          </Button>
        </Stack>

        <Typography variant='body1' fontWeight='bold'>
          Biography
        </Typography>
        {isEditing ? (
          <TextField
            variant='outlined'
            fullWidth
            multiline
            rows={3}
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        ) : (
          <Typography>{biography}</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant='body1' fontWeight='bold'>
          Services
        </Typography>
        <Stack direction='row' spacing={1} flexWrap='wrap'>
          {services.map((service, index) => (
            <Chip
              key={index}
              label={service}
              color='primary'
              variant='outlined'
              onDelete={isEditing ? () => handleRemoveService(index) : undefined}
              deleteIcon={isEditing ? <X size={16} /> : undefined}
            />
          ))}
        </Stack>
        {isEditing && (
          <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
            <TextField
              variant='outlined'
              size='small'
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder='Add a service'
            />
            <Button variant='contained' onClick={handleAddService}>
              Add
            </Button>
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant='body1' fontWeight='bold'>
          Specializations
        </Typography>
        <Stack direction='row' spacing={1} flexWrap='wrap'>
          {specializations.map((specialization, index) => (
            <Chip
              key={index}
              label={specialization}
              color='primary'
              variant='outlined'
              onDelete={isEditing ? () => handleRemoveSpecialization(index) : undefined}
              deleteIcon={isEditing ? <X size={16} /> : undefined}
            />
          ))}
        </Stack>
        {isEditing && (
          <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
            <TextField
              variant='outlined'
              size='small'
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              placeholder='Add a specialization'
            />
            <Button variant='contained' onClick={handleAddSpecialization}>
              Add
            </Button>
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        {bioInfo.map((info, index) => (
          <React.Fragment key={index}>
            <Grid container alignItems='center' spacing={2} sx={{ mb: 1 }}>
              <Grid item>{info.icon}</Grid>
              <Grid item xs>
                <Typography variant='body1' fontWeight='bold'>
                  {info.title}
                </Typography>
                {isEditing ? (
                  <TextField
                    variant='outlined'
                    size='small'
                    fullWidth
                    value={info.value}
                    onChange={(e) => handleChange(info.field, e.target.value)}
                  />
                ) : (
                  <Typography variant='body2' color='text.secondary'>
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

      <Grid container justifyContent='space-between' alignItems='center' sx={{ mt: 'auto' }}>
        <Grid item>
          <Typography variant='body1' fontWeight='bold'>
            Experience
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1' color='primary'>
            {experience}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountBioInfo;
