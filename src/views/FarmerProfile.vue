<template>
  <div>
    <el-card v-loading="loading">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8" class="d-flex">
          <div>
            <img
              src="../assets/images/finger.png"
              alt="photo"
              style="width:130px; margin-right: 20px"
            />
          </div>

          <div>
            <h4 class="mb-0">{{ farmer.name }}</h4>
            <p style="font-size: 12px;">{{ farmer.hometown }}</p>
            <p style="font-size: 12px;">{{ farmer.phone }}</p>
            <el-button type="text" size="mini">
              <i class="el-icon-star-on" style="color:gold; font-size:18px"></i>
              4.3</el-button
            >
          </div>
        </el-col>
        <el-col :span="6">
          <el-button size="mini" icon="el-icon-edit" type="success">
            Edit
          </el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger">
            Delete
          </el-button>
        </el-col>
      </el-row>
      <el-collapse v-model="activeTab" accordion class="mt-5">
        <el-collapse-item title="Personal Bio" name="personal">
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Title</p>
              <h5>{{ farmer.title }}</h5>
            </el-col>
            <el-col :span="6">
              <p>First Name</p>
              <h5>{{ farmer.firstName }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Last Name</p>
              <h5>{{ farmer.lastName }}</h5>
            </el-col>
            <el-col :span="6">
              <p>AKA</p>
              <h5>{{ farmer.aka }}</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Age</p>
              <h5>45</h5>
            </el-col>
            <el-col :span="6">
              <p>Phone Number</p>
              <h5>{{ farmer.phone }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Email Address</p>
              <h5>{{ farmer.email }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Home Town</p>
              <h5>{{ farmer.hometown }}</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Nationality</p>
              <h5>{{ farmer.nationality }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Community of Residence</p>
              <h5>{{ farmer.townOfResidence }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Residential Address</p>
              <h5>{{ farmer.res_address }}</h5>
            </el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>FBO Membership Position</p>
              <h5>{{ farmer.fbo_position }}</h5>
              <br />
              <p>National ID Type</p>
              <h5>{{ farmer.national_id }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Name of FBO Membership</p>
              <h5>{{ farmer.fboMember_name }}</h5>
              <br />
              <p>ID Number</p>
              <h5>{{ farmer.id_number }}</h5>
            </el-col>
            <el-col :span="6">
              <p>Signature/Thumbprint</p>
              <img
                src="../assets/images/finger.png"
                alt="photo"
                style="width:100px; border:1px solid white; padding:5px;"
              />
            </el-col>
            <el-col :span="6"> </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="Household Info" name="2">
          <div class="profile-tab-bg pt-0">
            <!-- Spouse Information -->
            <h3 class="mb-1">Spouse</h3>
            <div v-for="(spouse, index) in farmer.spouse" :key="index">
              <el-row type="flex" justify="space-between">
                <el-col :span="5">
                  <p>Spouse Name</p>
                  <h5>{{ spouse.firstName + ' ' + spouse.lastName }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Phone Number</p>
                  <h5>{{ spouse.phone }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Age</p>
                  <h5>{{ getuserAge(spouse.dob) }}</h5>
                </el-col>
                <el-col :span="6"> </el-col> </el-row
              ><br />
              <el-row type="flex" justify="space-between">
                <el-col :span="5">
                  <p>National ID Type</p>
                  <h5>{{ spouse.national_id }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>ID Number</p>
                  <h5>{{ spouse.id_number }}</h5>
                </el-col>
                <el-col :span="6"> </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
            </div>
            <br />
            <hr />

            <!-- Children Information -->
            <h3 class="mb-1 mt-1">Children</h3>
            <p>Number of Children</p>
            <h5>{{ farmer.num_children }}</h5>

            <div v-for="children in farmer.children" :key="children.name">
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="5">
                  <p>Child Name</p>
                  <h5>{{ children.name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Age</p>
                  <h5>{{ getuserAge(children.dob) }} years old</h5>
                </el-col>
                <el-col :span="6"> </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <hr />
            </div>
          </div>
        </el-collapse-item>

        <!-- Farm History -->
        <el-collapse-item title="Farm Info" name="3">
          <div class="profile-tab-bg pt-0">
            <h3 class="mb-1">Farm History</h3>
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <p>Years of Farming</p>
                <h5>{{ farmer.years_farming }} years</h5>
              </el-col>
              <el-col :span="5">
                <p>Type of Farmland Ownership</p>
                <h5>{{ farmer.farmLandOwnershipType }}</h5>
              </el-col>
              <el-col :span="8">
                <p>Total Number of Farmland Cultivated (acres)</p>
                <h5>{{ farmer.num_farmLands }}</h5>
              </el-col>
              <el-col :span="3"> </el-col> </el-row
            ><br />
            <hr />
            <h3 class="mb-1 mt-1">Harvest Yield</h3>
            <div v-for="(harvest, index) in farmer.harvestYield" :key="index">
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="5">
                  <p>Crop Name</p>
                  <h5>{{ harvest.crop_name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Acres</p>
                  <h5>{{ harvest.acres }}</h5>
                </el-col>
                <el-col :span="6"> </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <el-row
                type="flex"
                justify="space-between"
                class="mt-1"
                v-for="years in harvest.years"
                :key="years.year"
              >
                <el-col :span="5">
                  <p>Year</p>
                  <h5>{{ years.year }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Major Season</p>
                  <h5>{{ years.major_season_harvest }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Minor Season</p>
                  <h5>{{ years.minor_season_harvest }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Yearly</p>
                  <h5>{{ years.yearly_harvest }}</h5>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="Farm Yield Income" name="4">
          <div class="profile-tab-bg pt-0">
            <div
              v-for="(yieldIncome, index) in farmer.yieldIncome"
              :key="index"
            >
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="5">
                  <p>Crop Name</p>
                  <h5 style="color:green;">{{ yieldIncome.crop_name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Acres</p>
                  <h5 style="color:green;">{{ yieldIncome.acres }}</h5>
                </el-col>
                <el-col :span="6"> </el-col>
                <el-col :span="6"> </el-col>
              </el-row>
              <h3 class="mb-1 mt-1">Yield Income</h3>
              <el-row
                type="flex"
                justify="space-between"
                class="mt-1"
                v-for="year in yieldIncome.years"
                :key="year.year"
              >
                <el-col :span="5">
                  <p>Year</p>
                  <h5>{{ year.year }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Major Season Income</p>
                  <h5>{{ year.major_season_income }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Minor Season Income</p>
                  <h5>{{ year.minor_season_income }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Yearly Income</p>
                  <h5>{{ year.yearly_income }}</h5>
                </el-col>
              </el-row>
              <hr />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Analytics" name="5">
          <div>
            Will be done later on.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Farm Input Support" name="6">
          <div class="profile-tab-bg pt-0">
            <h5 class="mb-1 mt-1" style="color:green;">2016</h5>
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Input Type</p>
                <h5>Fertilizer</h5>
              </el-col>
              <el-col :span="5">
                <p>Input Name</p>
                <h5>Urea 15-15-15</h5>
              </el-col>
              <el-col :span="5">
                <p>Unit Price</p>
                <h5>GHS 120</h5>
              </el-col>
              <el-col :span="5">
                <p>Quantity</p>
                <h5>2</h5>
              </el-col>
              <el-col :span="5">
                <p>Total Amount</p>
                <h5>GHS 240</h5>
              </el-col>
            </el-row>
            <el-row type="flex" justify="end" class="mt-1">
              <div>
                <h5>Grand Total: <span style="color:green;">GHS 240</span></h5>
              </div> </el-row
            ><br />
            <hr />
            <h5 class="mb-1 mt-1" style="color:green;">2020</h5>
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Input Type</p>
                <h5>Fertilizer</h5>
              </el-col>
              <el-col :span="5">
                <p>Input Name</p>
                <h5>Urea 15-15-15</h5>
              </el-col>
              <el-col :span="5">
                <p>Unit Price</p>
                <h5>GHS 120</h5>
              </el-col>
              <el-col :span="5">
                <p>Quantity</p>
                <h5>2</h5>
              </el-col>
              <el-col :span="5">
                <p>Total Amount</p>
                <h5>GHS 240</h5>
              </el-col>
            </el-row>
            <el-row type="flex" justify="end" class="mt-1">
              <div>
                <h5>Grand Total: <span style="color:green;">GHS 240</span></h5>
              </div>
            </el-row>
          </div>
        </el-collapse-item>

        <!-- Bank Information -->
        <el-collapse-item title="Bank Details" name="7">
          <div class="profile-tab-bg pt-0">
            <div v-for="(bank, index) in farmer.bank" :key="index">
              <h5 class="mb-1 mt-1">
                Bank: <span style="color:green;">{{ bank.name }}</span>
              </h5>
              <h5 class="mb-1 mt-1">
                Branch: <span style="color:green;">{{ bank.branch }}</span>
              </h5>
              <el-row type="flex" justify="space-between" class="mt-1">
                <el-col :span="6">
                  <p>Account Name</p>
                  <h5>{{ bank.acc_name }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Account Number</p>
                  <h5>{{ bank.acc_number }}</h5>
                </el-col>
                <el-col :span="6">
                  <p>Swift Code</p>
                  <h5>{{ bank.swift_code }}</h5>
                </el-col>
                <el-col :span="3"> </el-col>
              </el-row>
              <br />
              <hr />
            </div>

            <!-- Mobile Money -->
            <h5 class="mb-1 mt-1">Mobile Money</h5>
            <el-row
              type="flex"
              justify="space-between"
              class="mt-1"
              v-for="momo in farmer.momo"
              :key="momo.phone"
            >
              <el-col :span="6">
                <p>MoMo Number</p>
                <h5>{{ momo.phone }}</h5>
              </el-col>
              <el-col :span="6">
                <p>Account Name</p>
                <h5>{{ momo.name }}</h5>
              </el-col>
              <el-col :span="6">
                <p>Network</p>
                <h5>MTN</h5>
              </el-col>
              <el-col :span="3"> </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import farmersService from '../api/farmers';

export default {
  name: 'FarmerProfile',
  data() {
    return {
      activeTab: 'personal',
      loading: false,
      farmer: {},
    };
  },
  created() {
    this.getFarmer(this.$route.params.id);
  },
  methods: {
    getFarmer(id) {
      this.loading = true;
      farmersService
        .getFarmer(id)
        .then((response) => {
          this.farmer = response.data;
          this.farmer.name =
            response.data.firstName + ' ' + response.data.lastName;
          this.loading = false;
        })
        .catch((errors) => this.errorMessage(errors.error));
    },
  },
};
</script>
