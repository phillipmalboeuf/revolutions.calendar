import SunCalc from 'suncalc'

export class Time {
	sunrise: number
	sunset: number
	nextSunrise: number
	dLength: number
	nLength: number
	rLength: number
	s: number
	milliseconds: number
	r: number
	d: number
	n: number

	constructor(milliseconds?: number) {

		milliseconds = milliseconds ? milliseconds : Date.now()

		
		Time.getCurrentPosition((latitude, longitude)=> {
			this.calculateTimes(milliseconds, latitude, longitude)
		})


		return this
	}

	static getCurrentPosition(success: (latitude: number, longitude: number) => void) {
		if (localStorage.getItem("latitude")) {
			success(parseFloat(localStorage.getItem("latitude")!), parseFloat(localStorage.getItem("longitude")!))
		}

		navigator.geolocation.getCurrentPosition((position)=> {
			localStorage.setItem("latitude", position.coords.latitude.toString())
			localStorage.setItem("longitude", position.coords.longitude.toString())

			success(position.coords.latitude, position.coords.longitude)
		})
	}

	calculateTimes(milliseconds: number, latitude: number, longitude: number) {
		let times = SunCalc.getTimes(new Date(milliseconds), latitude, longitude)
		
		this.sunrise = times.sunrise.getTime()
		this.sunset = times.sunset.getTime()
		this.nextSunrise = this.sunrise + 86400000

		this.dLength = this.sunset - this.sunrise
		this.nLength = this.nextSunrise - this.sunset
		this.rLength = this.nextSunrise - this.sunrise
		
		this.s = (this.sunset - this.sunrise) / this.rLength

		this.setMilliseconds(milliseconds)
	}

	setMilliseconds(milliseconds: number) {
		this.milliseconds = milliseconds
		
		this.r = (this.milliseconds - this.sunrise) / this.rLength
		this.d = (this.milliseconds - this.sunrise) / this.dLength
		this.n = (this.milliseconds - this.sunset) / this.nLength

		if (this.r > 1) {
			this.constructor(milliseconds)
		}
	}

	toString(decimals: number = 1): string {
		return this.r >= this.s ? 
			`N${(this.n * 100).toFixed(decimals)}`
			: 
			`D${(this.d * 100).toFixed(decimals)}`
	}

	getNowX(center: number, radius: number, offset: number = 0): number {
		return this.getX(this.r, center, radius, offset)
	}

	getNowY(center: number, radius: number, offset: number = 0): number {
		return this.getY(this.r, center, radius, offset)
	}

	getSunriseX(center: number, radius: number, offset: number = 0): number {
		return this.getX(0, center, radius, offset)
	}

	getSunriseY(center: number, radius: number, offset: number = 0): number {
		return this.getY(0, center, radius, offset)
	}

	getSunsetX(center: number, radius: number, offset: number = 0): number {
		return this.getX(this.s, center, radius, offset)
	}

	getSunsetY(center: number, radius: number, offset: number = 0): number {
		return this.getY(this.s, center, radius, offset)
	}

	getDayX(fraction: number, center: number, radius: number, offset: number = 0): number {
		return this.getX(this.s * fraction, center, radius, offset)
	}

	getDayY(fraction: number, center: number, radius: number, offset: number = 0): number {
		return this.getY(this.s * fraction, center, radius, offset)
	}

	getNightX(fraction: number, center: number, radius: number, offset: number = 0): number {
		return this.getX(this.s + (this.nLength/this.rLength * fraction), center, radius, offset)
	}

	getNightY(fraction: number, center: number, radius: number, offset: number = 0): number {
		return this.getY(this.s + (this.nLength/this.rLength * fraction), center, radius, offset)
	}


	getX(time: number, center: number, radius: number, offset: number = 0): number {
		return center + (radius * Math.cos((time + offset + 1 - this.s + ((this.s - 0.5) / 2)) * 2 * Math.PI))
	}

	getY(time: number, center: number, radius: number, offset: number = 0): number {
		return center + (radius * Math.sin((time + offset + 1 - this.s + ((this.s - 0.5) / 2)) * 2 * Math.PI))
	}

	getCurrentPosition(): void {

	}
}