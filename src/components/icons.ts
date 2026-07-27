/**
 * Line icons on a 24px grid with a 1.6 stroke, matching the weight of the
 * outlined Material set the app uses. Brand marks are filled silhouettes and
 * live in their own map so the renderer knows not to stroke them.
 */

export const strokeIcons = {
  live: 'M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM8 20h8M12 16v4',
  film: 'M4 4h16v16H4zM4 9h16M4 15h16M9 4v16M15 4v16',
  play: 'M8 5.5 18 12 8 18.5V5.5Z',
  download: 'M12 4v11m0 0 4-4m-4 4-4-4M5 19h14',
  history: 'M4 12a8 8 0 1 0 2.3-5.6M4 4v3.5h3.5M12 8v4.4l3 1.8',
  sliders: 'M5 7h14M5 12h14M5 17h14M9 5v4M15 10v4M8 15v4',
  remote:
    'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM12 7v3M9.5 14h.01M14.5 14h.01M9.5 17.5h.01M14.5 17.5h.01',
  lock: 'M6 10.5h12a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1ZM8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3',
  shield: 'M12 3.5 19.5 6v6c0 4.2-3 7.3-7.5 8.5C7.5 19.3 4.5 16.2 4.5 12V6L12 3.5Z',
  'wifi-off':
    'M3 3l18 18M8.8 12.4a7 7 0 0 1 3.4-1.3M5.2 9a12 12 0 0 1 4-2.4M18.8 9a12 12 0 0 0-6-2.8M15.4 12.6c-.4-.3-.8-.6-1.3-.8M12 18h.01',
  search: 'M11 4.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13ZM15.8 15.8 20 20',
  devices: 'M3 6h11v10H3zM6 20h6M9 16v4M16 9h5v11h-5z',
  tv: 'M3 5h18v12H3zM8 21h8M12 17v4',
  desktop: 'M3 5h18v11H3zM9 20h6l-1-4h-4l-1 4Z',
  globe: 'M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17ZM3.7 9.2h16.6M3.7 14.8h16.6M12 3.5c4 4.5 4 12.5 0 17M12 3.5c-4 4.5-4 12.5 0 17',
  arrow: 'M5 12h13m0 0-5-5m5 5-5 5',
} as const;

export const filledIcons = {
  android:
    'M8 7.4 6.4 4.8 5.2 5.5 6.8 8A6 6 0 0 0 5 12.3V19h14v-6.7A6 6 0 0 0 17.2 8l1.6-2.5-1.2-.7L16 7.4A7 7 0 0 0 8 7.4ZM8 11h1.4v1.4H8V11Zm6.6 0H16v1.4h-1.4V11Z',
  apple:
    'M16.7 2.2c.1 1.1-.3 2.2-1.1 3-.8.9-1.9 1.4-3 1.3-.1-1.1.3-2.1 1.1-3 .8-.8 2-1.4 3-1.3ZM20.4 17.6c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.3 3.4-4 3.4-1.5 0-1.9-1-3.9-1s-2.5 1-3.9 1c-1.7 0-3-1.7-4-3.2-2.7-4.2-3-9.1-1.3-11.7 1.2-1.8 3-2.8 4.7-2.8 1.8 0 2.9 1 4.4 1s2.4-1 4.4-1c1.5 0 3.2.8 4.4 2.3-3.9 2.1-3.3 7.6.7 9.2Z',
  windows: 'M3 5.5 11 4v7H3V5.5Zm10-1.8 8-1.5V11h-8V3.7ZM3 13h8v7l-8-1.5V13Zm10 0h8v8.8l-8-1.5V13Z',
} as const;

export type IconName = keyof typeof strokeIcons | keyof typeof filledIcons;
