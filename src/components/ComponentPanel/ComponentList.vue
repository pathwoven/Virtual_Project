<template>
  <div class="component-panel">
    <h3>电子元件</h3>
    <div
      v-for="component in components"
      :key="component.type"
      class="component-item"
      
      @click="onDragStart(component.type)"
    >
      {{ component.name }}
    </div>
  </div>
</template>

<script setup>
import { NCollapse, NCollapseItem } from 'naive-ui';
import eventBus from '@/modules/useEventBus';

const emit = defineEmits(['dragstart']);


const components = [
  {type: 'TUNNEL', name: '隧道'},
  { type: 'INPUT', name: '输入引脚' },
  { type: 'OUTPUT', name: '输出引脚' },
  { type: 'CLOCK', name: '时钟' },
  { type: 'REGISTER', name: '寄存器' },
  { type: 'CONSTANT', name: '常量'},
  { type: 'SPLITTER', name : '分离器'},
  { type: 'COMBINER', name: '合并器'},
  // { type: 'MUX', name: '多路选择器' },
  // { type: 'DEMUX', name: '解多路选择器' },
  { type: 'AND', name: '与门' },
  { type: 'OR', name: '或门' },
  { type: 'NOT', name: '非门' },
  { type: 'XOR', name: '异或门' },
  {type: 'NXOR', name: '异或非门'},
  {type: 'NAND', name: '与非门'},
  {type: 'NOR', name: '或非门'},
  { type: 'POWER', name: '电源' },
  { type: 'GROUND', name: '接地' },
  { type: 'SEGMENT_DISPLAY', name: '七段数码器' },
  {type: 'HEX_DISPLAY', name: '十六进制数码管'},
  {type: 'REGISTER', name: '寄存器'},
  {type: 'D_FLIP_FLOP', name: 'D触发器'},
  {type: 'BUTTON', name: '按钮'},
  {type: 'LIGHT', name: '发光二极管'},
];


const onDragStart = (type) => {
  // event.dataTransfer.setData('component', JSON.stringify(component));
  eventBus.emit('start-place-component', {type: type, projectId:0}); // 发送拖动事件
};
</script>

<style scoped>
.component-panel {
  padding: 10px;
  background-color: transparent;
  height: 100%;
  overflow-y: auto;
  padding-right: 5px;
}

.component-item {
  padding: 10px;
  margin: 8px 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: move;
}

.component-item:hover {
  background-color: #f0f5ff;
}
</style>