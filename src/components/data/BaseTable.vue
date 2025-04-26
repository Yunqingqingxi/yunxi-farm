<template>
  <div class="base-table">
    <el-table
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @sort-change="handleSortChange"
    >
      <el-table-column v-if="showSelection" type="selection" width="55" />
      <el-table-column v-if="showIndex" type="index" :label="indexLabel" width="80" />
      <slot></slot>
    </el-table>

    <el-pagination
      v-if="showPagination"
      class="pagination"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="paginationLayout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
defineProps({
  tableData: {
    type: Array,
    required: true,
    default: () => [],
  },
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: Boolean,
  border: Boolean,
  size: {
    type: String,
    default: 'default',
  },
  fit: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: Boolean,
  rowKey: String,
  showSelection: Boolean,
  showIndex: Boolean,
  indexLabel: {
    type: String,
    default: '序号',
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits([
  'selection-change',
  'row-click',
  'sort-change',
  'size-change',
  'current-change',
]);

const handleSelectionChange = selection => {
  emit('selection-change', selection);
};

const handleRowClick = (row, column, event) => {
  emit('row-click', row, column, event);
};

const handleSortChange = ({ column, prop, order }) => {
  emit('sort-change', { column, prop, order });
};

const handleSizeChange = val => {
  emit('size-change', val);
};

const handleCurrentChange = val => {
  emit('current-change', val);
};
</script>

<style lang="scss" scoped>
.base-table {
  width: 100%;

  :deep(.el-table) {
    background-color: var(--el-bg-color);
    color: var(--el-text-color-primary);

    th {
      background-color: var(--el-bg-color);
      color: var(--el-text-color-primary);
    }

    tr {
      background-color: var(--el-bg-color);

      &:hover {
        background-color: var(--el-bg-color-hover);
      }
    }

    .el-table__row--striped {
      background-color: var(--el-bg-color-page);
    }
  }

  .pagination {
    margin-top: 16px;
    text-align: right;

    :deep(.btn-prev),
    :deep(.btn-next),
    :deep(.number) {
      background-color: var(--el-bg-color);
      color: var(--el-text-color-primary);
    }

    :deep(.active) {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }
}
</style>
