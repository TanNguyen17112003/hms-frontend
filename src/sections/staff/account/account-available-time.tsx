import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// 🗓 Hàm tạo danh sách ngày trong tuần
const getWeekDays = (baseDate: string | number | Date) => {
  const days = [];
  const currentDay = new Date(baseDate).getDay(); // Lấy thứ của ngày hiện tại

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(new Date(baseDate).getDate() - currentDay + i); // Tính ngày theo thứ

    days.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue"
      date: date.getDate(), // Lấy ngày số
      fullDate: date, // Lưu lại full date để dùng sau này
    });
  }
  return days;
};

// 🕒 Tạo danh sách time slots
const generateTimeSlots = () => {
  return [
    { startTime: "07:00 am", endTime: "08:45 am", isAvailable: true },
    { startTime: "09:00 am", endTime: "10:45 am", isAvailable: false },
    { startTime: "11:00 am", endTime: "12:45 pm", isAvailable: true },
    { startTime: "13:00 pm", endTime: "14:45 pm", isAvailable: true },
    { startTime: "15:00 pm", endTime: "16:45 pm", isAvailable: false },
  ];
};

const BookingCalendar = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);


  const weekDays = useMemo(() => getWeekDays(baseDate), [baseDate]);

  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const prevWeek = () => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() - 7);
    setBaseDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + 7);
    setBaseDate(newDate);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight="bold">
          {baseDate.toLocaleDateString("en-US", { month: "long" })}
        </Typography>
        <Box>
          <IconButton onClick={prevWeek}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={nextWeek}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" my={1}>
        <Grid container spacing={1} justifyContent="center">
          {weekDays.map((d) => (
            <Grid item key={d.date}>
              <Button
                variant={d.date === selectedDate ? "contained" : "text"}
                color="primary"
                onClick={() => setSelectedDate(d.date)}
                sx={{
                  minWidth: 50, 
                  width: 60,
                  color: d.date === selectedDate ? "white" : "black",
                  bgcolor: d.date === selectedDate ? "primary.main" : "transparent",
                }}
              >
                <Box textAlign="center">
                  <Typography variant="body2">{d.day}</Typography>
                  <Typography fontWeight="bold">{d.date}</Typography>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold">Time Slot</Typography>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {timeSlots.map((slot, index) => (
          <Grid item xs={12} key={index}>
            <Button
              variant={selectedTime === slot.startTime ? "contained" : "outlined"}
              color="primary"
              onClick={() => setSelectedTime(slot.startTime)}
              fullWidth
              disabled={!slot.isAvailable}
              sx={{
                fontSize: "0.9rem",
                p: 1,
                borderRadius: 2,
                bgcolor: slot.isAvailable
                  ? selectedTime === slot.startTime
                    ? "primary.main"
                    : "white"
                  : "#ccc",
                color: slot.isAvailable
                  ? selectedTime === slot.startTime
                    ? "white"
                    : "black"
                  : "gray",
              }}
            >
              {slot.startTime} - {slot.endTime}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookingCalendar;
