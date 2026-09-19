// im basically making up fake data bc
// this is a demo app and i don't have a backend yet

export const RESCO_NAMES = {
  "pauli-murray": "Pauli Murray",
};

export function getRescoName(slug) {
  return RESCO_NAMES[slug] || slug;
}

// in real backend this would be calculated
export const SAMPLE_DRYER_ELAPSED_MINUTES = 45;

export const SAMPLE_TIMES = {
  started: "2:30 PM",
  estimatedEnd: "3:00 PM",
  now: "3:42 PM",
};

export function getSampleLogs(netid) {
  return [
    { date: "9.18.2026 3:15 PM", text: `Load from Murray Washer #7 was moved to Cubby 5`, bold: true },
    { date: "9.18.2026 2:30 PM", text: `${netid} activated Murray Washer #7` },
    { date: "9.17.2026 10:00 PM", text: `${netid} removed personal laundry from Murray Dryer #8` },
    { date: "9.16.2026 5:00 PM", text: `${netid} entered load into Murray Dryer #8` },
  ];
}