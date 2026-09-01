// Shared Tailwind utility strings reused across the auth forms so every
// submit/link button stays visually consistent without repeating the
// same long class string in five different files.

export const AUTH_FORM = 'flex flex-col gap-[18px]'

export const AUTH_SUBMIT =
  'rounded-[7px] border-none bg-brass px-[18px] py-3.5 text-[14.5px] font-bold text-ink transition-[background-color,opacity] duration-150 enabled:hover:bg-brass-bright enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.55]'

export const AUTH_LINK_BTN =
  'border-none bg-none p-0 text-[13.5px] font-semibold text-signal underline underline-offset-2 disabled:cursor-not-allowed disabled:text-muted-on-paper disabled:no-underline'

export const AUTH_LINK_BTN_CENTER = `block w-full text-center ${AUTH_LINK_BTN}`

export const AUTH_CARD_TITLE = 'mb-1.5 font-display text-[26px] font-bold text-ink'
export const AUTH_CARD_SUBTITLE = 'mb-7 text-[14.5px] leading-[1.5] text-muted-on-paper'
export const AUTH_BACK =
  'mb-[18px] inline-flex items-center gap-1.5 border-none bg-none p-0 font-mono text-[13px] text-muted-on-paper hover:text-ink'
export const AUTH_FOOTER = 'mt-6 text-center text-[13.5px] text-muted-on-paper'
export const AUTH_FOOTER_LINK = 'font-semibold text-signal no-underline hover:underline'

