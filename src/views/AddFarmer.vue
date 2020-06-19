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
            <el-col :span="5">
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
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
              >
                <el-button size="mini" type="info"
                  >Click to upload photo</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  Photo should be in standard format JPG, PNG and no more than
                  2MB
                </div>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
              >
                <el-button size="mini" type="info"
                  >Click to upload thumbprint/Signature</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  Photo should be in standard format JPG, PNG and no more than
                  2MB
                </div>
              </el-upload>
            </el-col>
          </el-row>
          <el-form-item style="text-align: right" class="mt-3">
            <el-button type="" size="small">Cancel and reset form</el-button>
            <el-button type="primary" size="small" @click="handleContinue"
              >Save and Continue</el-button
            >
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Household Info" name="household"
          >Household Info</el-tab-pane
        >
        <el-tab-pane label="Farm Info" name="farm">
          Farm Info
        </el-tab-pane>
        <el-tab-pane label="Farm Yield Income" name="income">
          Farm Yield Income
        </el-tab-pane>
        <el-tab-pane label="Bank Details" name="bank">Bank Details</el-tab-pane>
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
        num_farmLands: 0,
        spouse: [
          {
            firstName: 'Margaret',
            lastName: 'Opong',
            dob: '2020-06-17',
            phone: '(111) 111-1111',
            national_id: 'Ghana Card',
            id_number: '5d713995',
          },
        ],
        children: [
          {
            name: 'Charles Akwasi',
            dob: '2010-06-17',
          },
        ],
        crops: [
          {
            name: 'Maize',
            acres: '1',
            years: [
              {
                year: '2014',
                major_season_harvest: '6 bags',
                minor_season_harvest: '5 bag',
                yearly_harvest: '16 bags',
                major_season_income: '40000',
                minor_season_income: '20000',
                yearly_income: '50000',
              },
              {
                year: '2018',
                major_season_harvest: '6 bags',
                minor_season_harvest: '5 bag',
                yearly_harvest: '16 bags',
                major_season_income: '40000',
                minor_season_income: '20000',
                yearly_income: '50000',
              },
            ],
          },
        ],
        bank: [
          {
            name: '',
            branch: 'Accra',
            acc_name: 'Mansah Minaj',
            acc_number: '020203431287',
          },
        ],
        momo: [
          {
            phone: '0933382334',
            name: 'Ama Amponsah',
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
    handleRemove(file) {
      console.log(file);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleContinue() {
      this.activeTab = 'household';
    },
  },
};
</script>
