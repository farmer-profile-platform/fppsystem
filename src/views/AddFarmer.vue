<template>
  <div>
    <p>Plaese fill all fields for accurate data reports.</p>
    <el-form
      label-position="top"
      label-width="100px"
      :model="addFamerDetails"
      :rules="rules"
      ref="addFamerDetails"
    >
      <el-tabs v-model="activeTab" class="mt-4 px-2" stretch>
        <el-tab-pane label="Personal Bio" name="personal">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Title">
                <el-select
                  v-model="addFamerDetails.title"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option label="Mr." value="Mr."></el-option>
                  <el-option label="Mrs." value="Mrs."></el-option>
                  <el-option label="Madam." value="Madam"></el-option>
                  <el-option label="Miss." value="Miss."></el-option>
                  <el-option label="Sir." value="Sir."></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="First Name">
                <el-input v-model="addFamerDetails.firstName" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Last Name">
                <el-input v-model="addFamerDetails.lastName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="AKA">
                <el-input v-model="addFamerDetails.aka" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Date of Birth">
                <el-date-picker
                  type="date"
                  placeholder="Date of birth"
                  style="width: 100%; margin-top:-12px"
                  v-model="addFamerDetails.dob"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Phone Number">
                <el-input
                  v-model="addFamerDetails.phone"
                  placeholder="(054) 54153324"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Email Address">
                <el-input v-model="addFamerDetails.email" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Home Town">
                <el-input v-model="addFamerDetails.hometown" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Nationality">
                <el-input
                  v-model="addFamerDetails.nationality"
                  placeholder="Ghanaian"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Community/Town of Residence">
                <el-input v-model="addFamerDetails.townOfResidence" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Residential Address">
                <el-input v-model="addFamerDetails.res_address" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="FBO Membership Position">
                <el-input v-model="addFamerDetails.fbo_position" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="Name of FBO Membership">
                <el-input v-model="addFamerDetails.fboMember_name" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="National ID Type">
                <el-select
                  v-model="addFamerDetails.national_id"
                  placeholder="Select"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option
                    v-for="item in idcardTypes"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ID Number">
                <el-input v-model="addFamerDetails.id_number" />
              </el-form-item>
            </el-col> </el-row
          ><br />
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="d-flex">
                <div>
                  <img
                    src="../assets/images/charl.png"
                    alt="photo"
                    style="width:50px; margin-right: 20px"
                  />
                </div>
                <div>
                  <input type="file" ref="file" style="display: none" />
                  <el-button @click="$refs.file.click()" type="text">
                    <b style="color:#2fa512;"> Upload Photo</b></el-button
                  >
                  <p>
                    Photo should be in standard format JPG, PNG and no more than
                    2MB
                  </p>
                  <br />
                  <el-button type="danger" size="mini">Remove Photo</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="d-flex">
                <div>
                  <img
                    src="../assets/images/finger.png"
                    alt="photo"
                    style="width:50px; margin-right: 20px"
                  />
                </div>
                <div>
                  <input type="file" ref="file" style="display: none" />
                  <el-button @click="$refs.file.click()" type="text">
                    <b style="color:#2fa512;">
                      Upload Thumbprint / Signature</b
                    ></el-button
                  >
                  <p>
                    Photo should be in standard format JPG, PNG and no more than
                    2MB
                  </p>
                  <br />
                  <el-button type="danger" size="mini"
                    >Remove Finger print</el-button
                  >
                </div>
              </div>
            </el-col> </el-row
          ><br />
          <div class="mt-3 d-flex">
            <el-button class="full-width">Cancel and reset form</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('household')"
              >Save and Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- House Hold information -->
        <el-tab-pane label="Household Info" name="household">
          <h3 class="mb-1">Spouse</h3>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="Spouse First Name">
                <el-input v-model="addFamerDetails.spouse.firstName" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Spouse First Name">
                <el-input v-model="addFamerDetails.spouse.lastName" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Date of Birth">
                <el-date-picker
                  type="date"
                  placeholder="Date of birth"
                  style="width: 100%; margin-top:-12px"
                  v-model="addFamerDetails.spouse.dob"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="Phone Number">
                <el-input
                  v-model="addFamerDetails.spouse.phone"
                  placeholder="(054) 54153324"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="National ID Type">
                <el-select
                  v-model="addFamerDetails.spouse.national_id"
                  placeholder="Select"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option
                    v-for="item in idcardTypes"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="ID Number">
                <el-input v-model="addFamerDetails.spouse.id_number" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <div class="button-add-details">
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add Spouse</el-button>
              </div>
            </el-col>
          </el-row>
          <hr />
          <br />
          <h3 class="mb-1">Children</h3>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="Number of Children">
                <el-input-number
                  v-model="addFamerDetails.num_children"
                  :min="0"
                  :max="10"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Child's Name">
                <el-input v-model="addFamerDetails.children.name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Date of Birth">
                <el-date-picker
                  type="date"
                  placeholder="Date of birth"
                  style="width: 100%; margin-top:-12px"
                  v-model="addFamerDetails.children.dob"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <div class="button-add-details">
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add Children</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width">Cancel and reset form</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('farm')"
              >Save and Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Farm Information -->
        <el-tab-pane label="Farm Info" name="farm">
          <h3 class="mb-1">Farm History</h3>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="Years of Farming">
                <el-input-number
                  v-model="addFamerDetails.years_farming"
                  :min="0"
                  :max="10"
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Type of Farmland Ownership">
                <el-input v-model="addFamerDetails.farmLandOwnershipType" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Total number of Farmland Cultivated">
                <el-input v-model="addFamerDetails.num_farmLands">
                  <template slot="append">acres</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <hr />
          <br />
          <h3 class="mb-1">Crop</h3>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Crop Name">
                <el-input v-model="addFamerDetails.harvestYield.crop_name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Acres">
                <el-input v-model="addFamerDetails.harvestYield.acres" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <br />
            <h3 class="ml-1 mb-1">Harvest Yield</h3>
            <el-col :span="5">
              <el-form-item label="Year">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="2013"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Major Season">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="In bags"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Minor Season">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="In bags"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Minor Season">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="In bags"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="button-add-details">
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add Year</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <div>
            <el-button icon="el-icon-plus" type="info" class="full-width"
              >Add Crop</el-button
            >
          </div>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width">Cancel and reset form</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('income')"
              >Save and Continue</el-button
            >
          </div>
        </el-tab-pane>

        <!-- Farm yield Income -->
        <el-tab-pane label="Farm Yield Income" name="income">
          <h3 class="mb-1">Crop</h3>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Crop Name">
                <el-input v-model="addFamerDetails.harvestYield.crop_name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Acres">
                <el-input v-model="addFamerDetails.harvestYield.acres" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <br />
            <h3 class="ml-1 mb-1">Yield Income</h3>
            <el-col :span="5">
              <el-form-item label="Year">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="2013"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Major Season">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="In bags"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Minor Season">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="In bags"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Minor Season">
                <el-input
                  v-model="addFamerDetails.harvestYield.years"
                  placeholder="In bags"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="button-add-details">
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add Year</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <div>
            <el-button icon="el-icon-plus" type="info" class="full-width"
              >Add Crop</el-button
            >
          </div>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width">Cancel</el-button>
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('bank')"
              >Save and Continue</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="Bank Details" name="bank">
          <h3 class="mb-1">Banks Details</h3>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Bank Name">
                <el-input v-model="addFamerDetails.bank.name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Branch">
                <el-input v-model="addFamerDetails.bank.branch" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Account Name">
                <el-input v-model="addFamerDetails.bank.acc_name" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Account Number">
                <el-input v-model="addFamerDetails.bank.acc_number" />
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <div class="button-add-details">
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add Bank</el-button>
              </div>
            </el-col>
          </el-row>
          <hr />
          <br />
          <h3 class="mb-1">Mobile Money Details</h3>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="Phone Number">
                <el-input v-model="addFamerDetails.momo.phone" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Name">
                <el-input v-model="addFamerDetails.momo.name" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="button-add-details">
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add MoMo</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <div class="mt-3 d-flex">
            <el-button class="full-width" icon="el-icon-cancel"
              >Cancel</el-button
            >
            <el-button
              class="full-width"
              type="primary"
              @click="handleContinue('bank')"
              >Save and Continue</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addFamerDetails: {
        title: '',
        firstName: '',
        lastName: '',
        aka: '',
        dob: '',
        phone: '',
        email: '',
        hometown: '',
        nationality: '',
        townOfResidence: '',
        res_address: '',
        fbo_position: '',
        fboMember_name: '',
        national_id: '',
        id_number: '',
        photo: '',
        fingerprint: '',
        num_children: 0,
        years_farming: 0,
        farmLandOwnershipType: '',
        num_farmLands: '',
        spouse: [
          {
            firstName: '',
            lastName: '',
            dob: '',
            phone: '',
            national_id: '',
            id_number: '',
          },
        ],
        children: [
          {
            name: '',
            dob: '',
          },
        ],
        harvestYield: [
          {
            crop_name: '',
            acres: '',
            years: [
              {
                year: '',
                major_season_harvest: '',
                minor_season_harvest: '',
                yearly_harvest: '',
              },
            ],
          },
        ],
        yieldIncome: [
          {
            crop_name: '',
            acres: '',
            years: [
              {
                year: '',
                major_season_income: '',
                minor_season_income: '',
                yearly_income: '',
              },
            ],
          },
        ],
        bank: [
          {
            name: '',
            branch: '',
            acc_name: '',
            acc_number: '',
          },
        ],
        momo: [
          {
            phone: '',
            name: '',
          },
        ],
      },
      activeTab: 'personal',
      idcardTypes: [
        'Passport',
        'Voters ID',
        'Birth Certificate',
        'Health Insurance',
        'Ghana Card',
      ],
      rules: {
        firstName: [
          {
            required: true,
            message: 'Please enter a name',
            trigger: ['blur', 'change'],
          },
          { min: 5, message: 'Length should be 5 or more', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleContinue(nextTab) {
      this.activeTab = nextTab;
    },
  },
};
</script>
