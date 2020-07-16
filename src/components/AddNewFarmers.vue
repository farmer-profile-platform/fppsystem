<template>
  <div style="margin-top:-40px;">
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
              <el-form-item label="First Name" prop="firstName">
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
              <el-form-item label="Date of Birth" prop="dob">
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
              <el-form-item label="Phone Number" prop="phone">
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
              <el-form-item label="Nationality" prop="nationality">
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
              <el-form-item label="National ID Type" prop="national_id">
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
              <el-form-item label="ID Number" prop="id_number">
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
          <h3 class="mb-1">Spouse ( {{ addFamerDetails.spouse.length }} )</h3>
          <div v-for="(spouse, spIdx) in addFamerDetails.spouse" :key="spIdx">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="Spouse First Name">
                  <el-input v-model="spouse.firstName" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="Spouse First Name">
                  <el-input v-model="spouse.lastName" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="Date of Birth">
                  <el-date-picker
                    type="date"
                    placeholder="Date of birth"
                    style="width: 100%; margin-top:-12px"
                    v-model="spouse.dob"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <div class="button-add-details" v-if="spIdx > 0">
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button
                    type="text"
                    size="mini"
                    @click="addFamerDetails.spouse.splice(spIdx, 1)"
                    >Delete</el-button
                  >
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="Phone Number">
                  <el-input
                    v-model="spouse.phone"
                    placeholder="(054) 54153324"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="National ID Type">
                  <el-select
                    v-model="spouse.national_id"
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
                  <el-input v-model="spouse.id_number" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <div class="button-add-details" v-if="spIdx < 1">
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button
                    type="text"
                    size="mini"
                    @click="addDuplicateField(addFamerDetails.spouse, 'spouse')"
                    >Add Spouse</el-button
                  >
                </div>
              </el-col>
            </el-row>
            <hr />
          </div>
          <br />

          <!-- Children Information -->
          <h3 class="mb-1">
            Children ( {{ addFamerDetails.children.length }} )
          </h3>
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
          <div v-for="(child, cIdx) in addFamerDetails.children" :key="cIdx">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Child's Name">
                  <el-input v-model="child.name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Date of Birth">
                  <el-date-picker
                    type="date"
                    placeholder="Date of birth"
                    style="width: 100%; margin-top:-12px"
                    v-model="child.dob"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <div
                  class="button-add-details"
                  v-if="cIdx < 1"
                  @click="addDuplicateField(addFamerDetails.children, 'child')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Children</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="addFamerDetails.children.splice(cIdx, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete</el-button>
                </div>
              </el-col>
            </el-row>
            <hr />
          </div>

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
                <el-input v-model="addFamerDetails.years_farming" />
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
          <h3 class="mb-1">
            Crop ( {{ addFamerDetails.harvestYield.length }} )
          </h3>
          <div
            v-for="(harvest, harvestIdx) in addFamerDetails.harvestYield"
            :key="harvestIdx"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Crop Name">
                  <el-input v-model="harvest.crop_name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Acres">
                  <el-input v-model="harvest.acres" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="harvestIdx > 0"
                  @click="addFamerDetails.harvestYield.splice(harvestIdx, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete Crop</el-button>
                </div>
              </el-col>
            </el-row>
            <br />
            <h4 class="ml-1 mb-1">Harvest Yield Info</h4>
            <el-row :gutter="20" v-for="(year, i) in harvest.years" :key="i">
              <el-col :span="5">
                <el-form-item label="Year">
                  <el-input v-model="year.year" placeholder="2013" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Major Season">
                  <el-input
                    v-model="year.major_season_harvest"
                    placeholder="In bags"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Minor Season">
                  <el-input
                    v-model="year.minor_season_harvest"
                    placeholder="In bags"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Yearly Harvest">
                  <el-input
                    v-model="year.yearly_harvest"
                    placeholder="In bags"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="i < 1"
                  @click="addDuplicateField(harvest.years, 'years')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Year</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="harvest.years.splice(i, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Remove Year</el-button>
                </div>
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
              @click="addCropHarvest"
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
          <h3 class="mb-1">
            Crop ( {{ addFamerDetails.yieldIncome.length }} )
          </h3>
          <div
            v-for="(yieldIncome, idx) in addFamerDetails.yieldIncome"
            :key="idx"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Crop Name">
                  <el-input v-model="yieldIncome.crop_name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Acres">
                  <el-input v-model="yieldIncome.acres" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="idx > 0"
                  @click="addFamerDetails.yieldIncome.splice(idx, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete Crop</el-button>
                </div>
              </el-col>
            </el-row>

            <br />
            <h4 class="ml-1 mb-1">Yield Income</h4>
            <el-row
              :gutter="20"
              v-for="(year, yearindex) in yieldIncome.years"
              :key="yearindex"
            >
              <el-col :span="5">
                <el-form-item label="Year">
                  <el-input v-model="year.year" placeholder="2013" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Major Season">
                  <el-input
                    v-model="year.major_season_income"
                    placeholder="GHc"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Minor Season">
                  <el-input
                    v-model="year.minor_season_income"
                    placeholder="GHc"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="Yearly Income">
                  <el-input v-model="year.yearly_income" placeholder="GHc" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="yearindex < 1"
                  @click="addDuplicateField(yieldIncome.years, 'years')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Year</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="yieldIncome.years.splice(yearindex, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete Year</el-button>
                </div>
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
              @click="addCropYieldIncome"
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

        <!-- Bank Information -->
        <el-tab-pane label="Bank Details" name="bank">
          <h3 class="mb-1">
            Banks Details ( {{ addFamerDetails.bank.length }} )
          </h3>
          <div
            v-for="(bank, bankIndex) in addFamerDetails.bank"
            :key="bankIndex"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Bank Name">
                  <el-input v-model="bank.name" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="Branch">
                  <el-input v-model="bank.branch" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="Swift Code">
                  <el-input
                    v-model="bank.swift_code"
                    placeholder="Leave empty is not provide"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Account Name">
                  <el-input v-model="bank.acc_name" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Account Number">
                  <el-input v-model="bank.acc_number" />
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <div
                  class="button-add-details"
                  v-if="bankIndex < 1"
                  @click="addDuplicateField(addFamerDetails.bank, 'bank')"
                >
                  <i
                    class="el-icon-circle-plus"
                    style="color: grey; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Add Bank</el-button>
                </div>
                <div
                  class="button-add-details"
                  v-else
                  @click="addFamerDetails.bank.splice(bankIndex, 1)"
                >
                  <i
                    class="el-icon-delete"
                    style="color: red; font-size: 20px;"
                  ></i>
                  <br />
                  <el-button type="text" size="mini">Delete</el-button>
                </div>
              </el-col>
            </el-row>
            <hr />
          </div>
          <br />
          <!-- Mobile Money -->
          <h3 class="mb-1">
            Mobile Money Details ( {{ addFamerDetails.momo.length }} )
          </h3>
          <el-row
            :gutter="20"
            v-for="(momo, momoIndex) in addFamerDetails.momo"
            :key="momoIndex"
          >
            <el-col :span="7">
              <el-form-item label="Phone Number">
                <el-input v-model="momo.phone" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Name">
                <el-input v-model="momo.name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Network">
                <el-select
                  v-model="momo.network"
                  style="width:100%; margin-top:-12px"
                >
                  <el-option label="MTN" value="MTN"></el-option>
                  <el-option label="Tigo" value="Tigo"></el-option>
                  <el-option label="Vodafone." value="Vodafone"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div
                class="button-add-details"
                v-if="momoIndex < 1"
                @click="addDuplicateField(addFamerDetails.momo, 'Momo')"
              >
                <i
                  class="el-icon-circle-plus"
                  style="color: grey; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Add MoMo</el-button>
              </div>
              <div
                class="button-add-details"
                v-else
                @click="addFamerDetails.momo.splice(momoIndex, 1)"
              >
                <i
                  class="el-icon-delete"
                  style="color: red; font-size: 20px;"
                ></i>
                <br />
                <el-button type="text" size="mini">Delete</el-button>
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
              :loading="btnLoading"
              @click="confirmFarmerAddition()"
              >Add a new famer</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import farmersService from '../api/farmers';

export default {
  name: 'AddNewFarmers',
  props: ['showModal'],
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
        nationality: 'Ghanaian',
        townOfResidence: '',
        res_address: '',
        fbo_position: '',
        fboMember_name: '',
        national_id: '',
        id_number: '',
        photo: '',
        fingerprint: '',
        num_children: 0,
        years_farming: 1,
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
            swift_code: 'None',
          },
        ],
        momo: [
          {
            phone: '',
            name: '',
            network: '',
          },
        ],
      },
      btnLoading: false,
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
        dob: [
          {
            required: true,
            message: 'Please enter a Date of birth',
            trigger: ['blur', 'change'],
          },
        ],
        national_id: [
          {
            required: true,
            message: 'Please enter valid national ID',
            trigger: ['blur', 'change'],
          },
        ],
        phone: [
          {
            required: true,
            message: 'Phone number field is required',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  methods: {
    addCropHarvest() {
      this.infoMessage('Added another crop');
      this.addFamerDetails.harvestYield.push({ years: [{}] });
    },
    addCropYieldIncome() {
      this.infoMessage('Added another crop');
      this.addFamerDetails.yieldIncome.push({ years: [{}] });
    },
    confirmFarmerAddition() {
      this.$confirm(
        'Are you sure you want add data to famers profile',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          this.$refs['addFamerDetails'].validate((valid) => {
            if (valid) {
              this.addFarmer();
            } else {
              this.errorMessage('Make sure all required fields are filled');
              return false;
            }
          });
        })
        .catch(() => {
          this.errorMessage('Farmer not added');
        });
    },
    addFarmer() {
      farmersService
        .addFarmer(this.addFamerDetails)
        .then(() => {
          this.successNotification('Success', 'Farmer added successfully');
          this.$emit('addedFarmer');
        })
        .catch((errors) => {
          this.errorMessage(errors.error);
        });
    },
    handleContinue(nextTab) {
      this.activeTab = nextTab;
    },
  },
};
</script>
