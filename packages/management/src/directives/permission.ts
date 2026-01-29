import type { App, Directive, DirectiveBinding } from 'vue'
import { useAuthStore } from '@/stores/authStore'

/**
 * v-permission 指令
 * 
 * 用法:
 * ```html
 * <button v-permission="'leads:delete'">删除</button>
 * <button v-permission="['leads:create', 'leads:update']">编辑</button>
 * ```
 */
const permissionDirective: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
    },
}

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()
    const { value } = binding

    // ADMIN 拥有所有权限
    if (authStore.user?.role === 'ADMIN' || authStore.permissions.includes('*')) {
        return
    }

    let hasPermission = false

    if (typeof value === 'string') {
        // 单个权限
        hasPermission = authStore.permissions.includes(value)
    } else if (Array.isArray(value)) {
        // 满足任意一个即可
        hasPermission = value.some(p => authStore.permissions.includes(p))
    }

    if (!hasPermission) {
        // 移除元素或隐藏
        el.parentNode?.removeChild(el)
        // 或者使用隐藏: el.style.display = 'none'
    }
}

/**
 * 注册 v-permission 指令
 */
export function setupPermissionDirective(app: App) {
    app.directive('permission', permissionDirective)
}

export default permissionDirective
