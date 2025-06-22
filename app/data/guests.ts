type Event = {
  name: string;
}

type EventAttendance = {
  event: Event;
  attending: boolean;
}

export type Guest = {
  fullName: string,
  attendance: EventAttendance[]
}

type AdditionalGuests = {
  additionalGuests: {
    count: number,
    guests: Guest[]
  }
}

export type PrimaryGuest = Guest & AdditionalGuests

const wedding: Event = {
  name: "Wedding",
}

const indiana: Event = {
  name: "Indiana Wedding Shower",
}

const washington: Event = {
  name: "Washington Wedding Shower",
}

export const events = [
  wedding,
  indiana,
  washington,
];

const attendance = events.map<EventAttendance>(event => ({
  event,
  attending: false,
}));

export const guests: PrimaryGuest[] = [
  {
    fullName: "Colby Zarger",
    attendance: [...attendance],
    additionalGuests: {
      count: 1,
      guests: [
        {
          fullName: "Sally Tucker",
          attendance
        }
      ]
    },
  },
  {
    fullName: "Phil Shaheen",
    attendance: [...attendance],
    additionalGuests: {
      count: 0,
      guests: [],
    },
  },
]
