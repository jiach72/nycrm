/**
 * 格式化货币
 */
export function formatCurrency(
    amount: number,
    currency = 'SGD',
    locale = 'zh-CN'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount)
}

/**
 * 格式化百分比
 */
export function formatPercent(value: number, decimals = 0): string {
    return `${value.toFixed(decimals)}%`
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

/**
 * 格式化电话号码
 */
export function formatPhone(phone: string): string {
    // 简单格式化，保留原始格式
    return phone.replace(/(\d{4})(\d{4})/, '$1 $2')
}

/**
 * 首字母大写
 */
export function capitalize(str: string): string {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 状态标签颜色映射
 */
export function getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
        // Lead Status
        NEW: 'info',
        CONTACTED: 'primary',
        QUALIFIED: 'success',
        IN_PROGRESS: 'warning',
        LOST: 'danger',
        CONVERTED: 'success',
        // Task Status
        NOT_STARTED: 'info',
        BLOCKED: 'danger',
        DONE: 'success',
        CANCELLED: 'info',
        // Project Status
        PLANNING: 'info',
        ACTIVE: 'primary',
        ON_HOLD: 'warning',
        COMPLETED: 'success',
        ARCHIVED: 'info',
    }
    return colorMap[status] || 'default'
}

/**
 * 状态中文映射
 */
export function getStatusLabel(status: string): string {
    const labelMap: Record<string, string> = {
        // Lead Status
        NEW: '新线索',
        CONTACTED: '已联系',
        QUALIFIED: '已确认',
        IN_PROGRESS: '跟进中',
        LOST: '已流失',
        CONVERTED: '已转化',
        // Task Status
        NOT_STARTED: '待开始',
        BLOCKED: '已阻塞',
        DONE: '已完成',
        CANCELLED: '已取消',
        // Project Status
        PLANNING: '规划中',
        ACTIVE: '进行中',
        ON_HOLD: '暂停',
        COMPLETED: '已完成',
        ARCHIVED: '已归档',
        // Priority
        LOW: '低',
        MEDIUM: '中',
        HIGH: '高',
        CRITICAL: '紧急',
    }
    return labelMap[status] || status
}
