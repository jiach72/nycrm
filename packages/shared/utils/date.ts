import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

/**
 * 格式化日期
 */
export function formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
    return dayjs(date).format(format)
}

/**
 * 格式化日期时间
 */
export function formatDateTime(date: string | Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
}

/**
 * 格式化为相对时间 (如 "3 小时前")
 */
export function formatRelativeTime(date: string | Date): string {
    return dayjs(date).fromNow()
}

/**
 * 检查日期是否已过期
 */
export function isOverdue(date: string | Date): boolean {
    return dayjs(date).isBefore(dayjs(), 'day')
}

/**
 * 检查日期是否是今天
 */
export function isToday(date: string | Date): boolean {
    return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 获取日期距今天数
 */
export function getDaysUntil(date: string | Date): number {
    return dayjs(date).diff(dayjs(), 'day')
}

export { dayjs }
