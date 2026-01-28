<template>
  <div class="lead-list">
    <div class="page-header">
      <h2 class="page-title">线索管理</h2>
      <el-button type="primary" @click="showCreateDialog = true">
        <el-icon><Plus /></el-icon> 新建线索
      </el-button>
    </div>

    <!-- 过滤器 -->
    <el-card class="filter-card" shadow="never">
      <el-form :inline="true" :model="filters">
        <el-form-item label="状态">
          <el-select v-model="filters.status" clearable placeholder="全部状态">
            <el-option label="新线索" value="NEW" />
            <el-option label="已联系" value="CONTACTED" />
            <el-option label="已确认" value="QUALIFIED" />
            <el-option label="跟进中" value="IN_PROGRESS" />
            <el-option label="已流失" value="LOST" />
            <el-option label="已转化" value="CONVERTED" />
          </el-select>
        </el-form-item>

        <el-form-item label="来源">
          <el-select v-model="filters.sourceChannel" clearable placeholder="全部来源">
            <el-option label="官网表单" value="website_form" />
            <el-option label="推荐" value="referral" />
            <el-option label="活动" value="event" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="filters.search"
            placeholder="搜索联系人/公司/邮箱"
            style="width: 200px"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card shadow="never">
      <el-table
        v-loading="loading"
        :data="leads"
        style="width: 100%"
        @row-click="handleRowClick"
      >
        <el-table-column prop="contactName" label="联系人" width="120" />
        <el-table-column prop="companyName" label="公司" width="180" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="phone" label="电话" width="140" />
        <el-table-column prop="sourceChannel" label="来源" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ getSourceLabel(row.sourceChannel) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)" size="small">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分" width="80" align="center">
          <template #default="{ row }">
            <span :class="['score', getScoreClass(row.score)]">{{ row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assignedTo" label="负责人" width="100">
          <template #default="{ row }">
            {{ row.assignedTo?.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click.stop="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click.stop="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="page"
          :page-size="limit"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 新建/编辑对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      :title="editingLead ? '编辑线索' : '新建线索'"
      width="600px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入联系人姓名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="公司" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="国家/地区" prop="country">
          <el-select v-model="form.country" filterable placeholder="请选择">
            <el-option label="新加坡" value="Singapore" />
            <el-option label="中国" value="China" />
            <el-option label="香港" value="Hong Kong" />
            <el-option label="美国" value="USA" />
            <el-option label="其他" value="Other" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型" prop="serviceTypes">
          <el-select v-model="form.serviceTypes" multiple placeholder="请选择服务类型">
            <el-option label="企业设立" value="Enterprise Setup" />
            <el-option label="签证规划" value="Visa Planning" />
            <el-option label="税务规划" value="Tax Planning" />
            <el-option label="财富管理" value="Wealth Management" />
            <el-option label="家族办公室" value="Family Office" />
          </el-select>
        </el-form-item>
        <el-form-item label="来源渠道" prop="sourceChannel">
          <el-select v-model="form.sourceChannel" placeholder="请选择来源">
            <el-option label="官网表单" value="website_form" />
            <el-option label="推荐" value="referral" />
            <el-option label="活动" value="event" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="咨询内容" prop="inquiryMessage">
          <el-input
            v-model="form.inquiryMessage"
            type="textarea"
            :rows="3"
            placeholder="请输入咨询内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateDialog = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          {{ editingLead ? '保存' : '创建' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { useLeadStore } from '@/stores'
import type { Lead } from '@tonghai/shared/types'

const router = useRouter()
const leadStore = useLeadStore()
const { leads, loading, total, page, limit } = storeToRefs(leadStore)

const showCreateDialog = ref(false)
const editingLead = ref<Lead | null>(null)
const submitting = ref(false)
const formRef = ref<FormInstance>()

const filters = reactive({
  status: '',
  sourceChannel: '',
  search: '',
})

const form = reactive({
  contactName: '',
  email: '',
  phone: '',
  companyName: '',
  country: '',
  serviceTypes: [] as string[],
  sourceChannel: 'website_form',
  inquiryMessage: '',
})

const rules: FormRules = {
  contactName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
  sourceChannel: [{ required: true, message: '请选择来源渠道', trigger: 'change' }],
  email: [{ type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }],
}

onMounted(() => {
  leadStore.fetchLeads()
})

function handleSearch() {
  leadStore.setFilters({
    status: filters.status as any || undefined,
    sourceChannel: filters.sourceChannel || undefined,
    search: filters.search || undefined,
  })
  leadStore.fetchLeads()
}

function handleReset() {
  filters.status = ''
  filters.sourceChannel = ''
  filters.search = ''
  leadStore.setFilters({})
  leadStore.fetchLeads()
}

function handlePageChange(newPage: number) {
  leadStore.setPage(newPage)
  leadStore.fetchLeads()
}

function handleRowClick(row: Lead) {
  router.push(`/leads/${row.id}`)
}

function handleEdit(lead: Lead) {
  editingLead.value = lead
  Object.assign(form, {
    contactName: lead.contactName,
    email: lead.email || '',
    phone: lead.phone || '',
    companyName: lead.companyName || '',
    country: lead.country || '',
    serviceTypes: lead.serviceTypes || [],
    sourceChannel: lead.sourceChannel,
    inquiryMessage: lead.inquiryMessage || '',
  })
  showCreateDialog.value = true
}

async function handleDelete(lead: Lead) {
  try {
    await ElMessageBox.confirm(
      `确定要删除线索 "${lead.contactName}" 吗？`,
      '删除确认',
      { type: 'warning' }
    )
    await leadStore.deleteLead(lead.id)
    ElMessage.success('删除成功')
  } catch {
    // 用户取消
  }
}

async function handleSubmit() {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    submitting.value = true
    try {
      if (editingLead.value) {
        await leadStore.updateLead(editingLead.value.id, form)
        ElMessage.success('更新成功')
      } else {
        await leadStore.createLead(form)
        ElMessage.success('创建成功')
      }
      showCreateDialog.value = false
      resetForm()
      leadStore.fetchLeads()
    } catch (error: any) {
      ElMessage.error(error.message || '操作失败')
    } finally {
      submitting.value = false
    }
  })
}

function resetForm() {
  editingLead.value = null
  Object.assign(form, {
    contactName: '',
    email: '',
    phone: '',
    companyName: '',
    country: '',
    serviceTypes: [],
    sourceChannel: 'website_form',
    inquiryMessage: '',
  })
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('zh-CN')
}

function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    NEW: '新线索',
    CONTACTED: '已联系',
    QUALIFIED: '已确认',
    IN_PROGRESS: '跟进中',
    LOST: '已流失',
    CONVERTED: '已转化',
  }
  return map[status] || status
}

function getStatusTagType(status: string): 'success' | 'warning' | 'danger' | 'info' {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
    NEW: 'info',
    CONTACTED: 'success',
    QUALIFIED: 'warning',
    IN_PROGRESS: 'warning',
    LOST: 'danger',
    CONVERTED: 'success',
  }
  return map[status] || 'info'
}

function getSourceLabel(source: string): string {
  const map: Record<string, string> = {
    website_form: '官网',
    referral: '推荐',
    event: '活动',
    other: '其他',
  }
  return map[source] || source
}

function getScoreClass(score: number): string {
  if (score >= 80) return 'high'
  if (score >= 50) return 'medium'
  return 'low'
}
</script>

<style scoped>

.lead-list {
  max-width: 1600px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.02em;
}

.filter-card {
  margin-bottom: 24px;
}

:deep(.el-form-item__label) {
  color: var(--color-text-muted) !important;
  font-weight: 600;
}

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.score {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
}

.score.high {
  background: rgba(82, 196, 26, 0.15);
  color: #52c41a;
  box-shadow: 0 0 10px rgba(82, 196, 26, 0.2);
}

.score.medium {
  background: rgba(250, 140, 22, 0.15);
  color: #fa8c16;
}

.score.low {
  background: rgba(245, 34, 45, 0.15);
  color: #f5222d;
}

:deep(.el-table) {
  --el-table-border-color: var(--color-border);
  --el-table-header-bg-color: var(--color-surface-hover);
  --el-table-row-hover-bg-color: var(--color-surface-hover);
}

:deep(.el-table th.el-table__cell) {
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.05em;
}

:deep(.el-table tr) {
  cursor: pointer;
}

</style>
