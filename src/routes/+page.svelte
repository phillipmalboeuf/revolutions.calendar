<script lang="ts">
  import Calendar from '../lib/Calendar.svelte';
  import Clock from '../lib/Clock.svelte';
  import { browser } from '$app/environment';
  import { DateTime } from 'luxon';
  import { getSeasons } from '$lib/seasons';

  
  let now = DateTime.now().set({year: 2024});
  const [year, ...seasons] = getSeasons(now.year)
  let spring = DateTime.fromJSDate(seasons[0])
  let summer = DateTime.fromJSDate(seasons[1])
  let fall = DateTime.fromJSDate(seasons[2])
  let winter = DateTime.fromJSDate(seasons[3])
  // let next_spring = DateTime.fromISO(next_dates.spring)

  // Get first day of 2024
  let start = now.startOf('year');
  // Get days until first Monday
  let daysToMonday = (8 - start.weekday) % 7;
  // Create array starting from first Monday
  let allDates = new Array(366 + daysToMonday).fill(0).map((_, i) => {
    if (i < daysToMonday) {
      // For days before first Monday, get dates from previous year
      return start.minus({ days: daysToMonday - i });
    }
    // For rest of dates, get ordinal date from 2024
    return now.set({year: 2024, ordinal: i - daysToMonday + 1});
  });
  // Divide into weeks
  let weeks: DateTime[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }
</script>

<main>
  <!-- <Calendar /> -->
  {#if browser}
  <!-- {#each dates as date, i}
  {#if date.ordinal == spring.ordinal || date.ordinal == summer.ordinal || date.ordinal == fall.ordinal || date.ordinal == winter.ordinal}
  <strong>{i}</strong>
  {:else}
  {i}
  {/if}
  {/each} -->
  <table>
    <tbody>
    {#each weeks as week, i}
    <tr class="week-{(i+2) % 13} month-{(((i+2) % 13) - 1) % 4}" class:highlight={week.some(date => date.ordinal === spring.ordinal || date.ordinal === summer.ordinal || date.ordinal === fall.ordinal || date.ordinal === winter.ordinal)}>
    {#each week as date, i}
    <td>
    <!-- <Clock minimal radius={20} milliseconds={date.toMillis()} emphasis={date.ordinal == spring.ordinal || date.ordinal == summer.ordinal || date.ordinal == fall.ordinal || date.ordinal == winter.ordinal} /> -->
    {#if date.ordinal == spring.ordinal}<strong>Spring Equinox</strong><br />{/if}
    {#if date.ordinal == summer.ordinal}<strong>Summer Solstice</strong><br />{/if}
    {#if date.ordinal == fall.ordinal}<strong>Fall Equinox</strong><br />{/if}
    {#if date.ordinal == winter.ordinal}<strong>Winter Solstice</strong><br />{/if}
    {date.toLocaleString({weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}
    </td>
    {/each}
    </tr>
    {/each}
    </tbody>
  </table>

  <svg>
    {#each weeks as week, i}
    <g id={week.some(date => date.ordinal === spring.ordinal)
      ? 'spring'
      : week.some(date => date.ordinal === summer.ordinal)
      ? 'summer'
      : week.some(date => date.ordinal === fall.ordinal)
      ? 'fall'
      : week.some(date => date.ordinal === winter.ordinal)
      ? 'winter'
      : `week-${(i+2) % 13}-month-${(((i+2) % 13) - 1) % 4}`}>
    {#each week as date, i}
    <Clock minimal radius={20} index={i} milliseconds={date.toMillis()} emphasis={date.ordinal == spring.ordinal || date.ordinal == summer.ordinal || date.ordinal == fall.ordinal || date.ordinal == winter.ordinal} />
    {/each}
    </g>
    {/each}
  </svg>
  {/if}
</main>

<style>
  main {
    font-family: sans-serif;
  }

  tr.highlight {
    background-color: #f0f0f0;
  }

  tr.month-3 {
    background-color: #f0f0f0;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(7, 1fr); */
    gap: 10px;
  }

  div hr {
    width: 100%;
    height: 10px;
    /* grid-column: span 7; */
  }

  div hr.thin {
    height: 1px;
    border: none;
  }

  svg {
    overflow: visible !important;
  }
</style>