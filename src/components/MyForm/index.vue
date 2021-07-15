<template>
  <div
    class="my_form two-form"
    :style="'width: ' + (form.width ? form.width : '100%')"
    :class="{ alignleft: form.isLeft === true }"
  >
    <!-- 标题 -->
    <div class="form-title" v-if="form.showTitle">{{ form.title }}</div>
    <!-- 通用表单 -->
    <el-form
      :class="{ showFormBorder: !!form.showFormBorder }"
      v-if="!form.isTable"
      :ref="myRef ? myRef : form.ref"
      :disabled="formDisabled"
      :label-position="form.labelPositon"
      :size="form.formSize ? form.formSize : 'mini'"
      :model="formData"
      enctype="multipart/form-data"
      @submit.native.prevent
      :label-width="form.labelWidth"
    >
      <el-row>
        <template v-for="(item, index) in formItem">
          <el-col
            :span="!item.colSpan ? 24 / form.column - 1 : item.colSpan"
            :key="index"
            v-if="item.show"
          >
            <div v-if="item.subTitle" :style="'margin-left:' + form.labelWidth">
              {{ item.subTitle }}
            </div>
            <el-form-item
              v-if="showItem(item) && !item.haveItem"
              :label="!!item.label ? item.label : ''"
              :style="
                item.inputWidth ? 'width:' + item.inputWidth : 'width:100%'
              "
              :prop="item.name"
              :rules="item.rule !== 'phone' ? item.rules : phoneVal"
              :label-width="
                item.labelWidth
                  ? item.labelWidth
                  : !!form.labelWidth
                  ? form.labelWidth
                  : '100%'
              "
            >
              <!-- 输入框 -->
              <el-input
                :class="'my_input_'+item.name"
                v-if="item.type === 'text'"
                v-model.trim="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :maxlength="item.maxlength || 50"
                :show-word-limit="item.showlimit ? item.showlimit : true"
                clearable
                :disabled="item.disabled"
              >
                <template v-if="form.style === 'prepend'" slot="prepend">
                  {{ item.label }}
                </template>
              </el-input>
              <!-- html文本 -->
              <div v-else-if="item.type === 'html'">
                <p v-html="item.value"></p>
              </div>
              <div v-else-if="item.type === 'slot'">
                <slot :name="item.slotName"></slot>
              </div>
              <div v-else-if="item.type === 'tipRow'">
                <p>{{ formData[item.name] }}</p>
              </div>
              <!-- 文本提示 -->
              <div v-else-if="item.type === 'tip'">
                <p class="tip-right">{{ item.value }}</p>
              </div>
              <!-- 日期选择框 -->
              <el-date-picker
                v-else-if="item.type === 'date'"
                v-model="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :picker-options="
                  item.showBefore
                    ? showBeforTime
                    : item.showAfter
                    ? pickerOptions
                    : {}
                "
                :disabled="item.disabled"
                :format="item.format ? item.format : 'yyyy-MM-dd'"
                :style="'width: ' + (item.width ? item.width : '100%')"
              ></el-date-picker>
              <!-- 时间选择框 -->
              <el-time-picker
                v-else-if="item.type === 'fixed-time'"
                v-model="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :disabled="item.disabled"
                :format="item.format ? item.format : 'hh:mm:ss'"
                :style="'width: ' + (item.width ? item.width : '100%')"
              ></el-time-picker>
              <!-- 日期时间选择器 -->
              <el-date-picker
                v-else-if="item.type == 'datetime'"
                v-model="formData[item.name]"
                :type="item.type"
                :placeholder="item.placeholder"
                :default-time="item.defaultTime"
                :align="item.align"
                :picker-options="pickerOptions"
                :disabled="item.disabled"
                :value-format="
                  item.format ? item.format : 'yyyy-MM-dd hh:mm:ss'
                "
                :format="item.format ? item.format : 'yyyy-MM-dd hh:mm:ss'"
                :style="'width: ' + (item.width ? item.width : '100%')"
              ></el-date-picker>
              <!-- 日期时间范围选择器 -->
              <el-date-picker
                v-else-if="item.type == 'datetimerange'"
                v-model="formData[item.name]"
                type="datetimerange"
                range-separator="至"
                :disabled="item.disabled"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
              <!-- 开关 -->
              <el-switch
                v-else-if="item.type == 'switch'"
                v-model="formData[item.name]"
              ></el-switch>
              <!-- select选择框 -->
              <el-select
                v-else-if="item.type == 'select'"
                v-model="formData[item.name]"
                :placeholder="item.placeholder"
                :multiple="item.multiple"
                :collapse-tags="item.collapseTags"
                default-first-option
                :filterable="item.filterable"
                value-key="id"
                :disabled="item.disabled"
                :allow-create="item.allowCreate"
                clearable
                @changeValue="selectChange($event, item.name)"
                @change="selectChange($event, item.name, item.limit)"
                :style="'width: ' + (item.width ? item.width : '100%')"
              >
                <el-option
                  v-for="iitem in item.options"
                  :key="iitem.value || iitem.id || iitem._id || iitem"
                  :label="iitem.label || iitem.name || iitem"
                  :value="iitem.value || iitem._id || iitem.name || iitem"
                ></el-option>
              </el-select>
              <!-- 复选框 -->
              <el-checkbox-group
                v-else-if="item.type == 'checkbox'"
                v-model="formData[item.name]"
                :style="'width: ' + (item.width ? item.width : '100%')"
              >
                <el-checkbox
                  v-for="iitem in item.options"
                  :key="iitem.value"
                  :label="iitem.value"
                  >{{ iitem.label }}</el-checkbox
                >
              </el-checkbox-group>
              <!-- 单选 -->
              <el-radio-group
                v-else-if="item.type == 'radio'"
                v-model="formData[item.name]"
              >
                <el-radio
                  v-for="(option, idx) in item.options"
                  :key="idx"
                  :label="option.value"
                  :disabled="!!option.disabled ? option.disabled : false"
                  >{{ option.label }}</el-radio
                >
              </el-radio-group>
              <!--单选按钮组 -->
              <el-radio-group
                v-else-if="item.type == 'radioGroup'"
                :disabled="item.disabled"
                v-model="formData[item.name]"
              >
                <el-radio-button
                  v-for="(option, idx) in item.options"
                  :key="idx"
                  :label="option.value"
                  >{{ option.label }}</el-radio-button
                >
              </el-radio-group>
              <!-- 文本域 -->
              <el-input
                v-else-if="item.type == 'textarea'"
                :type="item.type"
                :maxlength="item.maxlength"
                :show-word-limit="item.showlimit"
                v-model="formData[item.name]"
                :placeholder="item.placeholder"
                :rows="item.rows ? item.rows : 2"
                :disabled="item.disabled ? item.disabled : false"
              ></el-input>
              <!-- 计数器 -->
              <el-input-number
                v-else-if="item.type == 'inputnumber'"
                v-model="formData[item.name]"
                :min="
                  item.min
                    ? item.min
                    : item.minDataName
                    ? formData[item.minDataName]
                    : -Infinity
                "
                :max="
                  item.max
                    ? item.max
                    : item.maxDataName
                    ? formData[item.maxDataName]
                    : Infinity
                "
                :disabled="item.disabled"
                :precision="item.precision ? item.precision : 0"
                :step="item.step ? item.step : 1"
                :step-strictly="item.stepStrictly"
                :size="item.size"
                :controls-position="item.controlsPosition"
                @change="inputNumberValChange($event, item.name, item.min)"
              >
              </el-input-number>
              <!-- 其他 -->
              <el-input
                v-else-if="item.type == 'password'"
                :type="item.type"
                :placeholder="item.placeholder"
                v-model="formData[item.name]"
                clearable
                @keyup.enter.native="submitForm()"
              >
                <template v-if="form.style === 'prepend'" slot="prepend">
                  {{ item.label }}
                </template>
              </el-input>
              <span v-else-if="item.type === 'txt'">{{
                formData[item.name]
              }}</span>
              <div
                v-show="
                  item.type === 'btn' &&
                    !!form.hasSubmit &&
                    form.btnStyle === 'inline'
                "
                class="clearfix"
                :style="btnMinWidth ? 'min-width: 210px;max-width:215px;' : ''"
                :class="item.className || ''"
              >
                <el-button
                  v-if="form.showExportBtn"
                  type="primary"
                  :class="form.btnRight ? 'float-right' : ''"
                  size="mini"
                  class="margin-left-10"
                  :disabled="form.exportBtnDisabled"
                  @click="exportBtnFun()"
                  >导出</el-button
                >
                <el-button
                  v-if="!!form.cancleShow"
                  :class="[
                    form.btnRight ? 'float-right' : '',
                    form.cancleBtnClassName
                  ]"
                  size="mini"
                  :loading="cancleBtnLoading"
                  @click="resetForm()"
                >
                  {{ form.cancleText }}
                </el-button>
                <el-button
                  type="primary"
                  :class="form.btnRight ? 'float-right' : ''"
                  size="mini"
                  class="margin-left-10"
                  :loading="submitBtnLoading"
                  :disabled="form.submitDisabled"
                  @click="submitForm()"
                >
                  {{ form.submitText }}
                </el-button>
              </div>

              <!-- 是否显示单位 -->
              <span v-if="item.unit" style="margin-left:1px;">
                {{ item.unit }}
              </span>
              <!-- 是否显示tip提示 -->
              <span
                v-if="item.tip && item.tip.show"
                :class="item.tipClass ? item.tipClass : 'inline-tip'"
              >
                {{ item.tip.content }}
              </span>
            </el-form-item>
            <!-- 存在el-form-item -->
            <div v-if="item.haveItem && showItem(item)">
              <div class="operator_btn" v-if="item.type === 'btn'">
                <el-button
                  type="primary"
                  :class="item.btnRight ? 'float-right' : ''"
                  size="mini"
                  :loading="submitBtnLoading"
                  class="margin-left-20"
                  @click="handle(item.handleName, item)"
                  :disabled="item.disabled"
                >
                  {{ item.btnTxt }}
                </el-button>
              </div>
            </div>
            <!-- 是否显示tooltip提示 -->
            <el-tooltip
              v-if="item.tooltip && item.tooltip.show"
              effect="dark"
              class=""
              :content="item.tooltip.content"
              placement="top"
            >
              <i
                class="form_tooltip"
                :class="item.tooltip.icon ? item.tooltip.icon : 'el-icon-info'"
              >
              </i>
            </el-tooltip>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 表格式表单 -->
    <el-table
      v-else
      :data="form.data"
      :show-header="true"
      :border="true"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in form.column"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="auto"
      >
        <template slot-scope="scope">
          <el-input
            size="mini"
            v-model="scope.row[item.prop]"
            :disabled="item.disabled"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-row
      v-if="!!form.hasSubmit && !form.btnStyle"
      class="btn-group clearfix"
      :class="{ 'btn-group-top100': !!form.istop100 }"
    >
      <el-button
        type="primary"
        :class="form.btnRight ? 'float-right' : ''"
        size="mini"
        class="margin-left-20"
        @click="submitForm()"
        :loading="submitBtnLoading"
        :disabled="form.submitDisabled"
      >
        {{ form.submitText }}
      </el-button>
      <el-button
        v-if="!!form.cancleShow"
        :class="form.btnRight ? 'float-right' : ''"
        size="mini"
        @click="resetForm()"
      >
        {{ form.cancleText }}
      </el-button>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'MyForm',
  props: {
    fullscreenLoading: {
      type: Boolean,
      default: true
    },
    cancleBtnLoading: {
      type: Boolean,
      default: false
    },
    submitBtnLoading: {
      type: Boolean,
      default: false
    },
    btnMinWidth: {
      type: Boolean,
      default: true
    },
    form: {
      type: Object,
      default: () => {
        return {
          showExportBtn: {
            type: Boolean,
            default: false
          },
          submitDisabled: {
            type: Boolean,
            default: false
          },
          formSize: {
            type: String,
            default: 'mini'
          },
          btnStyle: {
            type: String,
            default: ''
          },
          btnRight: {
            type: Boolean,
            default: false
          },
          cancleShow: {
            type: Boolean,
            default: true
          },
          isLeft: {
            type: Boolean,
            default: true
          },
          title: {
            type: String,
            default: '标题'
          },
          showTitle: {
            type: Boolean,
            default: true
          },
          ref: {
            type: String,
            default: 'form'
          },
          width: {
            type: Number,
            default: 100
          },
          isTable: {
            type: Boolean,
            default: false
          },
          labelWidth: {
            type: String,
            default: '120px'
          },
          labelPositon: {
            type: String,
            default: 'right'
          },
          column: {
            type: Number,
            default: 1
          },
          hasSubmit: {
            type: Boolean,
            default: true
          },
          disabled: {
            type: Boolean,
            default: false
          }
        }
      }
    },
    formItem: {
      type: Array,
      default: () => [Object]
    },
    formDisabled: {
      type: Boolean,
      default: false
    },
    myRef: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    var validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      basicGroupInfo: [],
      sharedGroupInfo: [],
      defaultMSG: null,
      checkAll: false,
      isIndeterminate: true,
      phoneVal: [
        { required: true, trigger: 'blur', validator: validPhone } //这里需要用到全局变量
      ],
      showBeforTime: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      servicePeopleOpts: [], //家庭医生服务人员
      orderNamesOpts: [],
      orderStatusOpts: [],
      orderTypesOpts: [],
      orderScenesOpts: [],
      serviceDepartmentOpts: [],
      fdStatusOpts: [],
      productTypesOpts: [],
      orderActionsOpts: [],
      customSceneOpts: [],
      weappSceneOpts: []
    }
  },
  components: {},
  methods: {
    basicOption(val) {
      if (val && val.length) {
        this.$emit('basic-option', val)
      }
    },
    setBasicGroupInfo(val) {
      this.basicGroupInfo = val
      this.$emit('basicGroupInfo', val)
    },
    setSharedGroupInfo(val) {
      this.sharedGroupInfo = val
      this.$emit('sharedGroupInfo', val)
    },
    exportBtnFun() {
      this.$emit('exportFun')
    },
    showItem(item) {
      // 是否显此项item
      // 没有item且没有关联项时直接显示
      if (!item.haveItem && !item.cascaderItem) {
        return true
        //有关联项时再进行判断
      } else if (item.cascaderItem) {
        // 当关联项的值等于某值时显示
        if (item.cascaderValue || item.cascaderValue === false) {
          // 当某项值等于或存在某个值时显示（如：数组中存在某个值则显示）
          if (
            item.cascaderValue === this.formData[item.cascaderItem] ||
            _.indexOf(this.formData[item.cascaderItem], item.cascaderValue) !=
              -1 ||
            _.indexOf(item.cascaderValue, this.formData[item.cascaderItem]) !=
              -1
          ) {
            return true
          } else {
            return false
          }
        } else {
          // 当关联项的值不等于某个值时显示
          if (
            this.formData[item.cascaderItem] &&
            this.formData[item.cascaderItem] !== item.cascaderValueNot
          ) {
            return true
          } else {
            return false
          }
        }
      } else {
        return false
      }
    },
    selectChange($event, item, limit) {
      if (typeof $event === 'string') {
        if ($event && $event.trim() === '') {
          this.formData[item] = ''
          this.$message.error('输入内容不能为空格')
        } else if (
          limit &&
          limit.clear &&
          $event &&
          $event.length > limit.max
        ) {
          this.formData[item] = ''
          this.$message.error('请重新填写，最多输入' + limit.max + '个字')
        } else {
          this.formData[item] = $event.trim()
        }
      }
    },
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    getSubmitData(clear) {
      for (let i = 0; i < this.forms.length; i++) {
        const item = this.forms[i]
        this.formData[item.ref] = {}
        for (let j = 0; j < item.formItem.length; j++) {
          item.formItem[j].value = clear ? '' : item.formItem[j].value
          this.formData[item.ref][item.formItem[j].name] =
            item.formItem[j].value
        }
      }
    },

    onSubmit() {
      this.getSubmitData()
      this.formData.sourceChannelThird = this.sourceChannelThird
      this.$emit('submit', this.formData)
    },
    onCancel() {
      this.getSubmitData(true)
      this.$emit('cancle')
    },
    handle(str, item) {
      this.$emit(str, item) //将事件名字和参数值传递出去，
    },
    inputNumberValChange(val, key, min) {
      if (val <= min && min === 0) {
        this.formData[key] = null
      }
    },
    validForm() {
      return this.$refs[this.form.ref].validate()
    },
    submitForm(formRef) {
      let refs = formRef || this.form.ref
      this.$refs[refs].validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          return false
        }
      })
    },

    resetForm() {
      // 重置前判断是否表单数据为空，如果为空return
      if(_.isEmpty(this.formData)){
        return
      }
      this.$emit('resetForm')
    }
  }
}
</script>

<style lang="less" scoped>
.operator_btn {
  margin-top: -22px;
  margin-bottom: 4px;
}
.two-form {
  margin: 0 auto;
  font-size: 14px;
  text-align: left;
  color: #606266;
  .el-col-24 {
    width: 94%;
  }
  .imglabelstyle {
    position: absolute;
    left: 19px;
    font-size: 14px;
    font-weight: bold;
    color: #606266;
  }
  &-title {
    line-height: 40px;
    color: #fff; // text-align: left
    // background: $tc;
    margin-bottom: 20px;
  }
  i.el-icon-plus.avatar-uploader-icon {
    width: 140px;
    height: 140px;
    line-height: 140px;
    font-size: 28px;
    text-align: center;
    color: #8c939d;
    border: 1px dashed #d9d9d9;
    margin-bottom: 10px;
  }
  i.el-icon-plus.avatar-uploader-icon.mp4-i {
    width: 320px;
  }
  .avatar {
    position: absolute;
    top: 0;
    left: 93px;
    max-width: 140px;
    height: 140px;
  }
  .avatar-uploader {
    margin-left: 81px;
    text-align: left;
  }
  .my-video {
    position: absolute;
    top: 0;
    left: 93px;
    height: 150px;
  }
  .my-pdf {
    position: absolute;
    top: 120px;
    left: 456px;
    height: 150px;
  }
  .el-upload.el-upload--text {
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: default;
  }

  .el-upload__text {
    color: #8c939d;
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 20px;
  }

  .btn-group {
    text-align: center;
    cursor: default;
  }
  .btn-group-top100 {
    position: absolute;
    bottom: -89px;
    left: 46%;
  }
  .form-title {
    padding-left: 20px;
    width: 100%;
    line-height: 38px;
    color: #57606f;
    background-color: #e5e8ef;
  }
  form.el-form.el-form--label-left.showFormBorder {
    padding: 20px;
    border: 1px solid #e5e8ef;
  }
  .el-col-2 {
    width: 6.33333%;
  }
  .alignleft.el-col.el-col-2 {
    margin-left: 10px;
  }
  .el-col-22 {
    margin-left: -10px;
  }
  .tip-right {
    font-size: 12px;
    text-align: right;
    color: #f56c6c;
  }
  .el-col {
    position: relative;
  }
  .form_tooltip {
    position: absolute;
    top: 6px;
    left: 97%;
  }
  .inline-tip {
    position: absolute;
    top: 0;
    left: 103%;
    width: max-content;
    font-size: 12px;
    color: #f56c6c;
  }
  .diagnose_growth_btn {
    margin-top: -46px;
    .el-button:first-child {
      margin-bottom: 18px;
    }
  }
}
</style>
