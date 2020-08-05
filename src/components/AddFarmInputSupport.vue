<template>
  <div>
    <el-form
      label-position="top"
      label-width="100px"
      :model="inputSupportForm"
      ref="inputSupportForm"
    >
      <div v-for="(year, idx) in inputSupportForm.inputSupport" :key="idx">
        <el-button
          v-if="idx > 0"
          icon="el-icon-delete"
          type="text"
          style="color:red; margin-top: 30px;"
          size="mini"
          @click="inputSupportForm.inputSupport.splice(idx, 1)"
          >Remove Input Support Year</el-button
        >
        <el-row
          :gutter="20"
          v-for="(support, index) in year.inputs"
          :key="index"
        >
          <el-col :span="8">
            <el-form-item label="Input Type">
              <el-input v-model="support.type" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="Input Name">
              <el-input v-model="support.name" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Unit Price">
              <el-input
                v-model="support.unit_price"
                type="number"
                @input="setTotal(support, year)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div
              class="button-add-details"
              v-if="index < 1"
              @click="addDuplicateField(year.inputs, 'input')"
            >
              <i
                class="el-icon-circle-plus"
                style="color: grey; font-size: 20px;"
              ></i>
              <br />
              <el-button type="text" size="mini">Add Input</el-button>
            </div>
            <div
              class="button-add-details"
              v-else
              @click="year.inputs.splice(index, 1)"
            >
              <i
                class="el-icon-delete"
                style="color: red; font-size: 20px;"
              ></i>
              <br />
              <el-button type="text" size="mini">Remove</el-button>
            </div>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Quantity">
              <el-input
                v-model="support.quantity"
                type="number"
                @input="setTotal(support, year)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Total Amount">
              <el-input v-model="support.total" type="number" disabled>
                <template slot="prepend">GH₵</template>
              </el-input>
            </el-form-item>
          </el-col>
          <hr />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="Year">
              <el-input v-model="year.year" placeholder="2019" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Grand Total">
              <el-input v-model="year.grand_total" type="number" disabled>
                <template slot="prepend">GH₵</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <hr />
      </div>
      <br />
      <div>
        <el-button
          icon="el-icon-plus"
          type="info"
          class="full-width"
          @click="addInputSupportField"
          >Add Year</el-button
        >
      </div>
      <br /><br />
      <h5>
        Comment: Grand total is the sum of the total amount for each input
        entered.
      </h5>
      <div class="mt-3 d-flex">
        <el-button
          class="full-width"
          type="primary"
          :loading="btnLoading"
          @click="addInputSupport"
          >Save Details</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import farmersService from '../api/farmers';

export default {
  name: 'AddInputSupport',
  props: {
    selectedName: String,
    selectedId: String,
    selectedInputs: {
      type: Array,
      default: function() {
        return [
          {
            year: '',
            grand_total: 0,
            inputs: [
              { type: '', name: '', unit_price: 0, quantity: 1, total: 0 },
            ],
          },
        ];
      },
    },
  },
  data() {
    return {
      btnLoading: false,
      inputSupportForm: {
        id: '',
        inputSupport: [
          {
            year: '',
            grand_total: 0,
            inputs: [
              {
                type: '',
                name: '',
                unit_price: 0,
                quantity: 1,
                total: 0,
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.inputSupportForm.inputSupport = this.selectedInputs;
  },
  methods: {
    addInputSupportField() {
      this.infoMessage('Added another year');
      this.inputSupportForm.inputSupport.push({
        inputs: [{ type: '', name: '', unit_price: 0, quantity: 1, total: 0 }],
      });
    },
    setTotal(input, yrs) {
      input.total = input.unit_price * input.quantity;
      const grandTotal = yrs.inputs.reduce(
        (a, b) => ({ total: a.total + b.total }),
        { total: 0 }
      ).total;
      yrs.grand_total = grandTotal;
    },
    addInputSupport() {
      this.btnLoading = true;
      this.inputSupportForm.id = this.selectedId;
      farmersService
        .updateFarmer(this.inputSupportForm)
        .then(() => {
          this.addActivity(
            { _id: this.selectedId, name: this.selectedName },
            'Support Added'
          );
          this.btnLoading = false;
          this.$emit('addedInput');
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
  },
};
</script>
