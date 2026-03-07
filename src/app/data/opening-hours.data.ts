export interface OpeningHour {
  day: string;
  open: string;
  close: string;
}

export const OPENING_HOURS: OpeningHour[] = [
  {
    day: 'Lunedì',
    open: '09:00',
    close: '19:00'
  },
  {
    day: 'Martedì',
    open: '09:00',
    close: '19:00'
  },
  {
    day: 'Mercoledì',
    open: '09:00',
    close: '19:00'
  },
  {
    day: 'Giovedì',
    open: '09:00',
    close: '19:00'
  },
  {
    day: 'Venerdì',
    open: '09:00',
    close: '19:00'
  },
  {
    day: 'Sabato',
    open: '09:00',
    close: '13:00'
  }
];