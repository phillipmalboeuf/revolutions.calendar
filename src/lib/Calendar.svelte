<script lang="ts">
  import { onMount } from 'svelte'
  import { DateTime } from 'luxon'
  
  import holidays from './holidays.json'
  import { getSeasons } from './seasons'

  let now = DateTime.now()
  const [year, ...seasons] = getSeasons()
  // let dates = holidays.find(({year}) => year == now.year)
  let next_dates = holidays.find(({year}) => year == now.year + 1)

  let spring = DateTime.fromJSDate(seasons[0])
  let summer = DateTime.fromJSDate(seasons[1])
  let fall = DateTime.fromJSDate(seasons[2])
  let winter = DateTime.fromJSDate(seasons[3])
  let next_spring = DateTime.fromISO(next_dates.spring)

  function format(d: DateTime) {
    return d.toLocaleString({
      dateStyle: 'long',
      // timeStyle: 'long'
    })
  }

  const start = spring.plus({ days: 0 })

  const season_length = 84
  const spring_length = 7
  const summer_length = 7
  const fall_length = 7
  const winter_length = now.isInLeapYear ? 9 : 8

  // onMount(() => {
  //   setInterval(() => {
  //     now = now.plus({ seconds: 1 })
  //   }, 1000)
  // })
</script>

<table>
  <tr>Now: {format(now)} (Leap: {now.isInLeapYear})</tr>
  <tr>-</tr>
  <tr>Spring equinox: {format(start)} ({format(spring)})</tr>
  <tr>{format(start.plus({ days: spring_length }))} {format(start.plus({ days: spring_length+season_length }))}</tr>
  <tr>-</tr>
  <tr>Summer solstice: {format(start.plus({ days: spring_length+season_length }))} ({format(summer)})</tr>
  <tr>{format(start.plus({ days: spring_length+season_length+summer_length }))} {format(start.plus({ days: spring_length+season_length+summer_length+season_length }))}</tr>
  <tr>-</tr>
  <tr>Fall equinox: {format(start.plus({ days: spring_length+season_length+summer_length+season_length }))} ({format(fall)})</tr>
  <tr>{format(start.plus({ days: spring_length+season_length+summer_length+season_length+fall_length }))} {format(start.plus({ days: spring_length+season_length+summer_length+season_length+fall_length+season_length }))}</tr>
  <tr>-</tr>
  <tr>Winter solstice: {format(start.plus({ days: spring_length+season_length+summer_length+season_length+fall_length+season_length }))} ({format(winter)})</tr>
  <tr>{format(start.plus({ days: spring_length+season_length+summer_length+season_length+fall_length+season_length+winter_length }))} {format(start.plus({ days: spring_length+season_length+summer_length+season_length+fall_length+season_length+winter_length+season_length }))}</tr>
  <tr>-</tr>
  <tr>Next spring equinox: {format(start.plus({ days: spring_length+season_length+summer_length+season_length+fall_length+season_length+winter_length+season_length }))} ({format(next_spring)})</tr>
  <tr>{spring_length+season_length+summer_length+season_length+fall_length+season_length+winter_length+season_length}</tr>
</table>

<style>
  table {

  }
</style>