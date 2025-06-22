<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Time } from './models/time.js';

  export let index = undefined;
	export let radius = window.innerHeight / 4;
  export let minimal = false;
  export let milliseconds = undefined;
  export let emphasis = false;

	let now = new Time(milliseconds);
	let interval: number;

	// Reactive statements for derived values
	$: diameter = radius * 2;
	$: outer = radius * 0.1;
	$: arrow = radius * 0.25;
	$: center = radius;
	$: stroke = radius * 0.02;
	$: font = radius * 0.1;

	// Update document title when now changes
	$: if (now.r) {
		document.title = now.toString();
	}

	onMount(() => {
    if (!milliseconds) {
      interval = window.setInterval(() => {
        now.setMilliseconds(Date.now());
        now = now; // Trigger reactivity
      }, 1000);
    }
	});

	onDestroy(() => {
		if (interval) {
			window.clearInterval(interval);
		}
	});
</script>

{#if now.r}
	<svg id={`clock-${index}`} width={diameter} height={diameter} class="clock" style="opacity: {emphasis ? '0.5' : '1'};">
		<!-- Text -->
    {#if !minimal}
		<text x={diameter} y={0} font-size={font/2} text-anchor="start">Now: R{(now.r*100).toFixed(1)}</text>
		<text x={diameter} y={font} font-size={font/2} text-anchor="start">Sunset: R{(now.s*100).toFixed(1)}</text>
    {:else if index !== undefined}
    <!-- <text x={diameter} y={0} font-size={font/2} text-anchor="start">{index}</text> -->
    {/if}

		<!-- Pies -->
		<path class="clock__day clock__day--dark" stroke="none" fill="grey" fill-opacity="0.15"
			d="M{center} {center}
			L{now.getSunriseX(center, radius)} {now.getSunriseY(center, radius)}
			A{radius} {radius} 1 0 1
			{now.getDayX(0.25, center, radius)} {now.getDayY(0.25, center, radius)} Z" />
		<path class="clock__day" stroke="none" fill="white"
			d="M{center} {center}
			L{now.getDayX(0.25, center, radius)} {now.getDayY(0.25, center, radius)}
			A{radius} {radius} 1 0 1
			{now.getDayX(0.75, center, radius)} {now.getDayY(0.75, center, radius)} Z" />
		<path class="clock__day clock__day--dark" stroke="none" fill="grey" fill-opacity="0.15"
			d="M{center} {center}
			L{now.getDayX(0.75, center, radius)} {now.getDayY(0.75, center, radius)}
			A{radius} {radius} 1 0 1
			{now.getSunsetX(center, radius)} {now.getSunsetY(center, radius)} Z" />

		<path class="clock__night clock__night--light" stroke="none" fill="black" fill-opacity="0.85"
			d="M{center} {center}
			L{now.getSunsetX(center, radius)} {now.getSunsetY(center, radius)}
			A{radius} {radius} 1 0 1
			{now.getNightX(0.25, center, radius)} {now.getNightY(0.25, center, radius)} Z" />
		<path class="clock__night" stroke="none" fill="black"
			d="M{center} {center}
			L{now.getNightX(0.25, center, radius)} {now.getNightY(0.25, center, radius)}
			A{radius} {radius} 1 0 1
			{now.getNightX(0.75, center, radius)} {now.getNightY(0.75, center, radius)} Z" />
		<path class="clock__night clock__night--light" stroke="none" fill="black" fill-opacity="0.85"
			d="M{center} {center}
			L{now.getNightX(0.75, center, radius)} {now.getNightY(0.75, center, radius)}
			A{radius} {radius} 1 0 1
			{now.getSunriseX(center, radius)} {now.getSunriseY(center, radius)} Z" />

		<!-- Clock outer edge -->
		<circle cx={center} cy={center} r={radius} class="clock__line" stroke="black" stroke-width={stroke} fill="transparent" />

		<!-- D0 -->
    {#if !minimal}
		<text font-size={font} font-weight="bold" text-anchor="end"
			x={now.getSunriseX(center, radius+outer+font/4)}
			y={now.getSunriseY(center, radius+outer+font/4)}>D0</text>
		<line class="clock__line" stroke="black" stroke-width={stroke}
			x1={now.getSunriseX(center, radius)}
			y1={now.getSunriseY(center, radius)}
			x2={now.getSunriseX(center, radius+outer)}
			y2={now.getSunriseY(center, radius+outer)} />
		<line class="clock__line" stroke="black" stroke-width={stroke/2}
			x1={now.getDayX(0.25, center, radius)}
			y1={now.getDayY(0.25, center, radius)}
			x2={now.getDayX(0.25, center, radius+outer/2)}
			y2={now.getDayY(0.25, center, radius+outer/2)} />
    {/if}

		<!-- D50 -->
    {#if !minimal}
		<text font-size={font} font-weight="bold" text-anchor="middle"
			x={now.getDayX(0.5, center, radius+outer+font/4)}
			y={now.getDayY(0.5, center, radius+outer+font/4)}>D50</text>
		<line class="clock__line" stroke="black" stroke-width={stroke}
			x1={now.getDayX(0.5, center, radius)}
			y1={now.getDayY(0.5, center, radius)}
			x2={now.getDayX(0.5, center, radius+outer)}
			y2={now.getDayY(0.5, center, radius+outer)} />
		<line class="clock__line" stroke="black" stroke-width={stroke/2}
			x1={now.getDayX(0.75, center, radius)}
			y1={now.getDayY(0.75, center, radius)}
			x2={now.getDayX(0.75, center, radius+outer/2)}
			y2={now.getDayY(0.75, center, radius+outer/2)} />
    {/if}

		<!-- N0 -->
    {#if !minimal}
		<text font-size={font} font-weight="bold" text-anchor="start"
			x={now.getSunsetX(center, radius+outer+font/4)}
			y={now.getSunsetY(center, radius+outer+font/4)}>N0</text>
		<line class="clock__line" stroke="black" stroke-width={stroke}
			x1={now.getSunsetX(center, radius)}
			y1={now.getSunsetY(center, radius)}
			x2={now.getSunsetX(center, radius+outer)}
			y2={now.getSunsetY(center, radius+outer)} />
		<line class="clock__line" stroke="black" stroke-width={stroke/2}
			x1={now.getNightX(0.25, center, radius)}
			y1={now.getNightY(0.25, center, radius)}
			x2={now.getNightX(0.25, center, radius+outer/2)}
			y2={now.getNightY(0.25, center, radius+outer/2)} />
    {/if}

		<!-- N50 -->
    {#if !minimal}
		<text font-size={font} font-weight="bold" text-anchor="middle"
			x={now.getNightX(0.5, center, radius+outer+font)}
			y={now.getNightY(0.5, center, radius+outer+font)}>N50</text>
		<line class="clock__line" stroke="black" stroke-width={stroke}
			x1={now.getNightX(0.5, center, radius)}
			y1={now.getNightY(0.5, center, radius)}
			x2={now.getNightX(0.5, center, radius+outer)}
			y2={now.getNightY(0.5, center, radius+outer)} />
		<line class="clock__line" stroke="black" stroke-width={stroke/2}
			x1={now.getNightX(0.75, center, radius)}
			y1={now.getNightY(0.75, center, radius)}
			x2={now.getNightX(0.75, center, radius+outer/2)}
			y2={now.getNightY(0.75, center, radius+outer/2)} />
    {/if}

		<!-- Clock hand -->
    {#if !minimal}
		<path d="M{center} {center}
			L{now.getNowX(center, arrow, -0.1)} {now.getNowY(center, arrow, -0.1)}
			L{now.getNowX(center, radius)} {now.getNowY(center, radius)}
			L{now.getNowX(center, arrow, 0.1)} {now.getNowY(center, arrow, 0.1)} Z" 
			class="clock__hand" stroke-width={stroke} stroke-linejoin="miter" stroke-miterlimit="5" fill="red" />
    {/if}

		<!-- Clock current time -->
    {#if !minimal}
		<text x={center} y={center} class="clock__now" stroke-width={String(stroke/2)} font-size={font*2} font-weight="bold"
      fill="red"
			text-anchor={now.r > now.s/2 && now.r < now.s+(now.nLength/2) ? "end" : "start"}>{now.toString()}</text>
    {/if}
	</svg>
{:else}
	<p>Fetching your location...<br />We never record your information.</p>
{/if}


<style lang="scss">

$white--light: #FFF;
$white: #f1f1f1;
$black--dark: #000;
$black: #1d1f21;
$black--light: #282a2e;
$grey: #373b41;
$grey--light: #969896;
$red: #cc6666;
$blue: #81a2be;
$green: #b5bd68;

$dark: fade-out($black--dark, 0.5);
$dark--light: fade-out($black, 0.5);
$light: fade-out($white--light, 0.5);
$light--dark: fade-out($white, 0.5);

$body_color: $black;
$headings_color: inherit;
$highlight: $grey--light;
$light_background: $light--dark;
$dark_background: $dark--light;
$alert_color: $black--light;


// #CLOCK

.clock {
	overflow: visible !important;

	// text {
	// 	fill: $highlight;
	// }
}

	// .clock__hand {
	// 	fill: $red;
	// }

	// .clock__line {
	// 	stroke: $dark;
	// }

	// text.clock__now {
	// 	fill: $white;
	// }

	// .clock__night {
	// 	fill: $dark;

	// 	&.clock__night--light {
	// 		fill: $dark--light;
	// 	}
	// }

	// .clock__day {
	// 	fill: $light;

	// 	&.clock__day--dark {
	// 		fill: $light--dark;
	// 	}
	// }
</style>