import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Dialog, TextField, Button } from '@mui/material';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, start: info.dateStr });
    setOpen(true);
  };

  const handleEventAdd = () => {
    setEvents([...events, newEvent]);
    setOpen(false);
    setNewEvent({ title: '', start: '', end: '' });
  };

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: 20 }}>
          <h2>Новая встреча</h2>
          <TextField
            label="Название"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Дата и время начала"
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Дата и время окончания"
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={handleEventAdd} variant="contained" color="primary">
            Добавить
          </Button>
        </div>
      </Dialog>
    </Container>
  );
};

export default Calendar;
