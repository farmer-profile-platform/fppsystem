<template>
  <div>
    <el-card>
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
            <h4 class="mb-0">John Taylor Asiedu Jnr</h4>
            <p style="font-size: 12px;">Nkoranza, Bono East Region</p>
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
              <h5>Mr.</h5>
            </el-col>
            <el-col :span="6">
              <p>First Name</p>
              <h5>Charles</h5>
            </el-col>
            <el-col :span="6">
              <p>Last Name</p>
              <h5>Kwabena</h5>
            </el-col>
            <el-col :span="6">
              <p>AKA</p>
              <h5>Atialogogo</h5>
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
              <h5>09388229334</h5>
            </el-col>
            <el-col :span="6">
              <p>Email Address</p>
              <h5>j.taylor@gmail.com</h5>
            </el-col>
            <el-col :span="6">
              <p>Home Town</p>
              <h5>Kumasi Abetifi</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>Nationality</p>
              <h5>Nationality</h5>
            </el-col>
            <el-col :span="6">
              <p>Phone Number</p>
              <h5>09388229334</h5>
            </el-col>
            <el-col :span="6">
              <p>Community of Residence</p>
              <h5>Nkoranza</h5>
            </el-col>
            <el-col :span="6">
              <p>Residential Address</p>
              <h5>1A/2 Nkoranza</h5>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="profile-tab-bg pt-1"
            justify="space-between"
          >
            <el-col :span="5">
              <p>FBO Membership Position</p>
              <h5>FBO Position</h5>
              <br />
              <p>National ID Type</p>
              <h5>Voters ID</h5>
            </el-col>
            <el-col :span="6">
              <p>Name of FBO Membership</p>
              <h5>FBO Membership</h5>
              <br />
              <p>ID Number</p>
              <h5>45567890223</h5>
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
            <h3 class="mb-1">Spouse</h3>
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <p>Spouse Name</p>
                <h5>Agnes Taylor</h5>
              </el-col>
              <el-col :span="6">
                <p>Phone Number</p>
                <h5>09388229334</h5>
              </el-col>
              <el-col :span="6">
                <p>Age</p>
                <h5>46 Years</h5>
              </el-col>
              <el-col :span="6"> </el-col> </el-row
            ><br />
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <p>National ID Type</p>
                <h5>Voters ID</h5>
              </el-col>
              <el-col :span="6">
                <p>ID Number</p>
                <h5>44567800230</h5>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6"> </el-col>
            </el-row>
            <br />
            <hr />
            <h3 class="mb-1 mt-1">Children</h3>
            <p>Number of Children</p>
            <h5>1</h5>

            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Child Name</p>
                <h5>Mathew Taylor</h5>
              </el-col>
              <el-col :span="6">
                <p>Age</p>
                <h5>28 Years</h5>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6"> </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Farm Info" name="3">
          <div class="profile-tab-bg pt-0">
            <h3 class="mb-1">Farm History</h3>
            <el-row type="flex" justify="space-between">
              <el-col :span="5">
                <p>Years of Farming</p>
                <h5>12 years</h5>
              </el-col>
              <el-col :span="6">
                <p>Type of Farmland Ownership</p>
                <h5>Self owned</h5>
              </el-col>
              <el-col :span="8">
                <p>Total Number of Farmland Cultivated (acres)</p>
                <h5>10 Acres</h5>
              </el-col>
              <el-col :span="6"> </el-col> </el-row
            ><br />
            <hr />
            <h3 class="mb-1 mt-1">Harvest Yield</h3>
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Crop Name</p>
                <h5>Millet</h5>
              </el-col>
              <el-col :span="6">
                <p>Acres</p>
                <h5>2 acres</h5>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6"> </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Year</p>
                <h5>2016</h5>
              </el-col>
              <el-col :span="6">
                <p>Major Season</p>
                <h5>430 bags</h5>
              </el-col>
              <el-col :span="6">
                <p>Minor Season</p>
                <h5>190 bags</h5>
              </el-col>
              <el-col :span="6">
                <p>Yearly</p>
                <h5>630 bags</h5>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Farm Yield Income" name="4">
          <div class="profile-tab-bg pt-0">
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Crop Name</p>
                <h5 style="color:green;">Millet</h5>
              </el-col>
              <el-col :span="6">
                <p>Acres</p>
                <h5 style="color:green;">2 acres</h5>
              </el-col>
              <el-col :span="6"> </el-col>
              <el-col :span="6"> </el-col>
            </el-row>
            <h3 class="mb-1 mt-1">Yield Income</h3>
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Year</p>
                <h5>2016</h5>
              </el-col>
              <el-col :span="6">
                <p>Major Season</p>
                <h5>430 bags</h5>
              </el-col>
              <el-col :span="6">
                <p>Minor Season</p>
                <h5>190 bags</h5>
              </el-col>
              <el-col :span="6">
                <p>Yearly</p>
                <h5>630 bags</h5>
              </el-col>
            </el-row>
            <hr />
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="5">
                <p>Year</p>
                <h5>2019</h5>
              </el-col>
              <el-col :span="6">
                <p>Major Season</p>
                <h5>40 bags</h5>
              </el-col>
              <el-col :span="6">
                <p>Minor Season</p>
                <h5>100 bags</h5>
              </el-col>
              <el-col :span="6">
                <p>Yearly</p>
                <h5>330 bags</h5>
              </el-col>
            </el-row>
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
        <el-collapse-item title="Bank Details" name="7">
          <div class="profile-tab-bg pt-0">
            <h5 class="mb-1 mt-1">
              Bank: <span style="color:green;">Unibank</span>
            </h5>
            <h5 class="mb-1 mt-1">
              Branch: <span style="color:green;">Tachiman Branch</span>
            </h5>
            <el-row type="flex" justify="space-between" class="mt-1">
              <el-col :span="6">
                <p>Account Name</p>
                <h5>John Taylor</h5>
              </el-col>
              <el-col :span="6">
                <p>Account Number</p>
                <h5>00610044356789</h5>
              </el-col>
              <el-col :span="6">
                <p>Swift Code</p>
                <h5>UBG2334</h5>
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
export default {
  name: 'FarmerProfile',
  data() {
    return {
      activeTab: 'personal',
    };
  },
};
</script>
