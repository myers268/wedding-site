type Event = {
  name: string;
  location: string;
  timestamp: number,
  description: string;
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
  location: "123 Main St, Washington, D.C. 22201",
  timestamp: new Date(2026, 0, 2, 17, 30, 0).getTime(),
  description: "",
}

const indiana: Event = {
  name: "Indiana Wedding Shower",
  location: "456 Country Rd, Kokomo, IN 46902",
  timestamp: new Date(2025, 7, 9, 14, 0, 0).getTime(),
  description: "",
}

const washington: Event = {
  name: "Washington Wedding Shower",
  location: "642 River Blvd, Longview, WA 99999",
  timestamp: new Date(2025, 11, 9, 16, 0, 0).getTime(),
  description: "",
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
