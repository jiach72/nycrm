import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

/**
 * RBAC 权限检查 Composable
 * 
 * 用法:
 * ```ts
 * const { can, canAny, canAll } = usePermission()
 * 
 * if (can('leads:create')) { ... }
 * ```
 */
export function usePermission() {
    const authStore = useAuthStore()

    /**
     * 检查是否拥有某权限
     */
    function can(permissionCode: string): boolean {
        // ADMIN 拥有所有权限
        if (authStore.user?.role === 'ADMIN' || authStore.permissions.includes('*')) {
            return true
        }
        return authStore.permissions.includes(permissionCode)
    }

    /**
     * 检查是否拥有任意一个权限
     */
    function canAny(permissionCodes: string[]): boolean {
        return permissionCodes.some(code => can(code))
    }

    /**
     * 检查是否拥有所有权限
     */
    function canAll(permissionCodes: string[]): boolean {
        return permissionCodes.every(code => can(code))
    }

    /**
     * 是否为管理员
     */
    const isAdmin = computed(() => authStore.user?.role === 'ADMIN')

    return {
        can,
        canAny,
        canAll,
        isAdmin,
    }
}

export default usePermission
