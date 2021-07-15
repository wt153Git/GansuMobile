import Moment from 'moment'

export function formatTime(time, type) {
    if (type === 'MM-DD HH:mm') {
        return formatMDHM(time)
    }
    return Moment(time).format('YYYY-MM-DD HH:mm:ss')
}
export function formatDay(time) {
    return Moment(time).format('YYYY-MM-DD')
}
export function formatYMD(time) {
    return Moment(time).format('YYYY年MM月DD日')
}
export function formatCircleTime(time) {
    return Moment(time).format('YYYY.MM.DD')
}
export function seconds(time) {
    return Moment(time).format('HH:mm')
}
export function formatYMDHM(time) {
    return Moment(time).format('YYYY年MM月DD日 HH:mm')
}
export function formatMDHMS(time) {
    return Moment(time).format('MM-DD HH:mm:ss')
}
export function formatMDHM(time) {
    return Moment(time).format('MM-DD HH:mm')
}

export function getHours(time) {
    const second = Moment.duration(time).asSeconds()
    if (second < 3600) {
        return `${Moment.duration(time).get('minutes')}分钟`
    } else {
        const remainder = second % 3600
        return `${Moment.duration(time).get('hours')}小时${remainder / 60}分钟`
    }
}

export function formatPT(time, type = 'months') {
    // @ts-ignore
    return Math.round(Moment.duration(time).get(type))
}

export function getServiceDay(time) {
    // @ts-ignore
    return seconds(new Date(Moment().startOf('days') + Moment.duration(time)))
}

export function price(value) {
    if (!Number(value)) return value
    return `${Number(value).toFixed(2)}`
}

// 保留digits位小数，integer
export function formatDigit(number, digits = 2, integer = true) {
    const zero = dig => {
        const numberList = []
        for (let i = 0; i < dig; i++) {
            numberList[i] = 0
        }
        return numberList.join('')
    }
    const arr = String(number).split('.')
    let decimal = arr[1] || ''
    if (decimal) {
        if (decimal.length > digits) {
            decimal = decimal.substr(0, digits)
        }
        if (decimal.length < digits) {
            if (integer) {
                decimal += zero(digits - decimal.length)
            }
        }
    } else {
        if (integer) {
            decimal = zero(digits)
        }
    }
    return integer ? Number(arr[0] + decimal) : Number(`${arr[0]}.${decimal}`)
}
export function RegexText(str, key) {
    return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%')
}

export function toSeconds({ day = 0, hours = 0, minutes = 0, _seconds = 0 }) {
    return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + _seconds
}

export function addZo(value = 0) {
    if (value.toString().length === 1) {
        return `0${value}`
    } else {
        return value.toString()
    }
}

export function secondToTime(_seconds) {
    let [day, hours, minutes, __seconds] = [0, 0, 0, 0]
    if (_seconds > 0) {
        day = Math.floor(_seconds / (60 * 60 * 24))
        hours = Math.floor(_seconds / (60 * 60)) - day * 24
        minutes = Math.floor(_seconds / 60) - day * 24 * 60 - hours * 60
        __seconds =
            Math.floor(_seconds) - day * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
    }
    return {
        day: addZo(day),
        hours: addZo(hours),
        minutes: addZo(minutes),
        seconds: addZo(__seconds)
    }
}

export function diffSecond(time) {
    const startDate = Moment(time)
    const endDate = Moment(new Date())
    return endDate.diff(startDate, 'seconds')
}

export function checkMobile(mobile) {
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    return reg.test(mobile)
}

export const getScene = options => {
    if (options.scene) {
        const scene = decodeURIComponent(options.scene)
        return scene || null
    }
    return null
}