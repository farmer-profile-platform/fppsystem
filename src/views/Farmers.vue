<template>
  <div>
    <!-- <router-link to="/add-farmer">
    </router-link> -->
    <el-button
      icon="el-icon-plus"
      plain
      type="primary"
      size="small"
      @click="addFarmerModal"
      >Add New Farmer</el-button
    >
    <div>
      <el-input
        placeholder="Search farmers by thier names"
        v-model="search"
        class="mt-4 mb-1"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-card class="">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.firstName.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-loading="tableLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
      >
        <el-table-column label="Basic Info" width="250">
          <template slot-scope="props">
            <span style="float:left; margin-right: 10px;">
              <img
                :src="getImageFile(props.row.photo)"
                alt="pic"
                style="width:40px;"
              />
            </span>
            <span>
              <b style="font-weight:bold; font-size: 16px">{{
                props.row.name
              }}</b>
              <br />
              <span style="font-size:12px;">{{
                props.row.townOfResidence
              }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Rating" align="center">
          <template>
            <el-button type="text" size="mini">
              <i class="el-icon-star-on" style="color:gold; font-size:18px"></i>
              4.3</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="Crop Information" width="250">
          <template slot-scope="props">
            <span v-for="(crop, index) in props.row.harvestYield" :key="index">
              <el-button
                type="primary"
                round
                plain
                size="mini"
                style="margin-right:10px;"
                >{{ crop.crop_name }}</el-button
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Support Status" width="200">
          <template slot-scope="props">
            <el-tag
              size="mini"
              :type="props.row.inputSupport.length == 0 ? 'warning' : 'success'"
            >
              {{
                props.row.inputSupport.length == 0
                  ? 'Not supported'
                  : 'Supported'
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="props">
            <el-tooltip
              class="item"
              effect="dark"
              content="Download PDF"
              placement="top"
            >
              <el-button
                type="primary"
                plain
                size="mini"
                icon="el-icon-download"
              ></el-button>
            </el-tooltip>
            <el-dropdown class="ml-1">
              <i class="el-icon-more fa-rotate-45"></i>
              <el-dropdown-menu slot="dropdown">
                <router-link
                  :to="{
                    name: 'Farmer Profile',
                    params: { id: props.row._id, name: props.row.firstName },
                  }"
                >
                  <el-dropdown-item>
                    <i class="el-icon-user" style="margin-right: 10px"></i>
                    View Profile</el-dropdown-item
                  >
                </router-link>

                <el-dropdown-item>
                  <span
                    @click="
                      showInputSupport(props.row._id, props.row.firstName)
                    "
                  >
                    <i class="el-icon-s-flag" style="margin-right: 10px"></i>
                    Add Farm Support
                  </span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="showEditModal(props.row)">
                    <i class="el-icon-edit" style="margin-right: 10px"></i>
                    Edit Farmer
                  </span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span @click="confirmDelete(props.row._id)">
                    <i class="el-icon-delete" style="margin-right: 10px"></i>
                    Delete Farmer
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div style="text-align: center;margin-top: 10px; padding-bottom:10px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        layout="prev, pager, next, jumper, sizes, total"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- add farmers dialog -->
    <el-dialog :visible.sync="showAddFarmerModal" fullscreen>
      <template slot="title">
        <h3>Add Farmer</h3>
        <p>Plaese fill all fields for accurate data reports.</p>
      </template>
      <AddNewFarmers v-on:addedFarmer="farmerAdded" />
    </el-dialog>

    <!-- Add farmer Input Support -->
    <el-dialog :visible.sync="showInputSupportModal" width="58%">
      <template slot="title">
        <h3>{{ inputSupportTitle }}</h3>
        <p>Take note of the unit details and amounts.</p>
      </template>
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
                <el-input v-model="year.grand_total" type="number">
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
          <el-button class="full-width">Cancel</el-button>
          <el-button class="full-width" type="primary" @click="addInputSupport"
            >Save Details</el-button
          >
        </div>
      </el-form>
    </el-dialog>

    <!-- Edit farmer details -->
    <el-dialog :visible.sync="showEditFarmerModal" fullscreen>
      <template slot="title">
        <h3>{{ editTitle }}</h3>
        <p>Edit field and make sure all required fields has data.</p>
      </template>
      <EditFarmerDetails
        :farmer.sync="farmer"
        v-on:editedFarmer="farmerEdited"
      />
    </el-dialog>
  </div>
</template>

<script>
import farmersService from '../api/farmers';
import AddNewFarmers from '../components/AddNewFarmers';
import EditFarmerDetails from '../components/EditFarmerDetails';

export default {
  name: 'farmers',
  components: {
    AddNewFarmers,
    EditFarmerDetails,
  },
  data() {
    return {
      tableData: [],
      farmer: {},
      tableLoading: false,
      showAddFarmerModal: false,
      showEditFarmerModal: false,
      showInputSupportModal: false,
      editTitle: '',
      inputSupportTitle: '',
      selectedId: null,
      currentPage: 1,
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
      total: 3,
      inputTotal: 0,
      search: '',
    };
  },
  computed: {},
  created() {
    this.getFarmers();
  },
  methods: {
    getFarmers() {
      let self = this;
      this.tableLoading = true;
      farmersService
        .getFarmers()
        .then((response) => {
          this.tableLoading = false;
          this.tableData = response.data;
          this.total = response.total;
        })
        .catch((errors) => {
          self.errorMessage(errors.error);
          self.tableLoading = false;
        });
    },
    addInputSupportField() {
      this.infoMessage('Added another year');
      this.inputSupportForm.inputSupport.push({
        inputs: [{ type: '', name: '', unit_price: 0, quantity: 1, total: 0 }],
      });
    },
    showInputSupport(id, name) {
      this.selectedId = id;
      this.inputSupportTitle =
        'Farm Input Support for ' +
        name +
        ' (' +
        this.inputSupportForm.inputSupport.length +
        ')';
      this.showInputSupportModal = true;
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
      this.inputSupportForm.id = this.selectedId;
      farmersService
        .updateFarmer(this.inputSupportForm)
        .then(() => {
          this.showInputSupportModal = false;
          this.getFarmers();
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
    showEditModal(farmer) {
      this.editTitle = `Edit Farmer Details for ${farmer.name} (${farmer.farmerId})`;
      this.farmer = farmer;
      this.showEditFarmerModal = true;
    },
    confirmDelete(id) {
      this.$confirm('This will permanently delete farmer data', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.deleteFarmer(id);
        })
        .catch(() => {
          this.errorMessage('Delete cancelled');
        });
    },
    deleteFarmer(id) {
      farmersService.deleteFarmer(id).then(() => {
        this.successNotification('Success', 'Farmer deleted successfully');
        this.getFarmers();
      });
    },
    addFarmerModal() {
      this.showAddFarmerModal = true;
    },
    farmerAdded() {
      this.showAddFarmerModal = false;
      this.getFarmers();
    },
    farmerEdited() {
      this.showEditFarmerModal = false;
      this.getFarmers();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
};
</script>
