<template>
  <div v-loading="dataLoading">
    <div class="mb-2">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-download"
        @click="generatePDF()"
      >
        Download
      </el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <div id="pdfContainer" class="pdfContainer"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import is from 'is_js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'ProfileDownload',
  props: {
    farmer: Object,
  },
  data() {
    return {
      dataLoading: false,
      spouseInfo: [],
      childrenInfo: [],
      harvestInfo: [],
      supportsInfo: [],
      bankInfo: [],
      momoInfo: [],
      hasSupport: false,
      hasSpouse: false,
      hasSupports: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let self = this;
      this.spouseInfo = [];
      this.childrenInfo = [];
      this.harvestInfo = [];
      this.supportsInfo = [];
      this.momoInfo = [];
      this.bankInfo = [];
      this.hasSpouse = this.farmer.marital_status === 'Married' ? true : false;
      this.farmer.spouse = this.hasSpouse ? this.farmer.spouse : [];
      this.hasSupports = this.hasInputSupport(this.farmer.inputSupports);

      // Spouse Info
      this.spouseInfo.push(
        this.getTableTitle(`Spouse Information(${this.farmer.spouse.length})`)
      );
      if (this.hasSpouse) {
        self.addSpouseInfoItem(this.farmer.spouse[0]);
      } else {
        this.spouseInfo.push([
          {
            colSpan: 3,
            text: 'Farmer has no spouse',
            alignment: 'left',
            style: 'tableCell',
          },
        ]);
      }

      // children info
      this.childrenInfo.push(
        this.getTableTitle(`Children Information(${this.farmer.num_children})`)
      );
      if (this.farmer.num_children > 0) {
        self.addChildrenInfoItem(this.farmer.children[0]);
      } else {
        this.childrenInfo.push([
          {
            colSpan: 3,
            text: 'Farmer has no children',
            alignment: 'left',
            style: 'tableCell',
          },
        ]);
      }

      // Harvest info
      this.harvestInfo.push(this.getTableTitle('Harvest Information'));
      if (this.farmer.num_children > 0) {
        self.addHarvestInfoItem(this.farmer.harvestYield[0]);
      } else {
        this.harvestInfo.push([
          {
            colSpan: 3,
            text: 'Farmer has no harvest info',
            alignment: 'left',
            style: 'tableCell',
          },
        ]);
      }

      // inputSupports info
      this.supportsInfo.push(this.getTableTitle('Support Information'));
      if (this.hasSupports) {
        self.addSupportInfoItem(this.farmer.inputSupports[0]);
      } else {
        this.supportsInfo.push([
          {
            colSpan: 3,
            text: 'Farmer has no support yet',
            alignment: 'left',
            style: 'tableCell',
          },
        ]);
      }

      // bankInfo
      this.bankInfo.push(this.getTableTitle('Bank Information'));
      if (this.farmer.bank.length > 0) {
        self.addBankInfoItem(this.farmer.bank[0]);
      } else {
        this.bankInfo.push([
          {
            colSpan: 3,
            text: 'Farmer has no bank info',
            alignment: 'left',
            style: 'tableCell',
          },
        ]);
      }

      // momo info
      this.momoInfo.push(this.getTableTitle('Mobile Money Information'));
      if (this.farmer.momo.length > 0) {
        self.addMomoInfoItem(this.farmer.momo[0]);
      } else {
        this.momoInfo.push([
          {
            colSpan: 3,
            text: 'Farmer has no mobile money account',
            alignment: 'left',
            style: 'tableCell',
          },
        ]);
      }

      this.embedPDF();
      this.dataLoading = false;
    },
    getTableTitle(title) {
      return [
        { colSpan: 3, text: title, alignment: 'left', style: 'tableHeader' },
        '',
        '',
      ];
    },
    addSpouseInfoItem(answer) {
      this.spouseInfo.push([
        { text: '1', style: 'tableCellOne' },
        { text: 'Name', style: 'tableCell' },
        { text: answer.firstName + ' ' + answer.lastName, style: 'tableCell' },
      ]);
      this.spouseInfo.push([
        { text: '2', style: 'tableCellOne' },
        { text: 'Date of Birth', style: 'tableCell' },
        { text: answer.dob, style: 'tableCell' },
      ]);
      this.spouseInfo.push([
        { text: '3', style: 'tableCellOne' },
        { text: 'Contact', style: 'tableCell' },
        { text: answer.phone, style: 'tableCell' },
      ]);
    },
    addChildrenInfoItem(answer) {
      this.childrenInfo.push([
        { text: '1', style: 'tableCellOne' },
        { text: 'Name', style: 'tableCell' },
        { text: answer.name, style: 'tableCell' },
      ]);
      this.childrenInfo.push([
        { text: '2', style: 'tableCellOne' },
        { text: 'Age', style: 'tableCell' },
        { text: answer.dob + ' years', style: 'tableCell' },
      ]);
    },
    addHarvestInfoItem(answer) {
      this.harvestInfo.push([
        { text: '1', style: 'tableCellOne' },
        { text: 'Crop', style: 'tableCell' },
        { text: answer.crop_name, style: 'tableCell' },
      ]);
      this.harvestInfo.push([
        { text: '2', style: 'tableCellOne' },
        { text: 'Acres', style: 'tableCell' },
        { text: answer.acres + ' acres', style: 'tableCell' },
      ]);
      this.harvestInfo.push([
        { text: '3', style: 'tableCellOne' },
        { text: 'Yearly Harvest', style: 'tableCell' },
        { text: answer.years[0].yearly_harvest + ' bags', style: 'tableCell' },
      ]);
      this.harvestInfo.push([
        { text: '4', style: 'tableCellOne' },
        { text: 'Yearly Income', style: 'tableCell' },
        { text: 'GHc ' + answer.years[0].yearly_income, style: 'tableCell' },
      ]);
      this.harvestInfo.push([
        { text: '5', style: 'tableCellOne' },
        { text: 'Year', style: 'tableCell' },
        { text: answer.years[0].year, style: 'tableCell' },
      ]);
    },
    addSupportInfoItem(answer) {
      this.supportsInfo.push([
        { text: '1', style: 'tableCellOne' },
        { text: 'Year', style: 'tableCell' },
        { text: answer.year, style: 'tableCell' },
      ]);
      this.supportsInfo.push([
        { text: '2', style: 'tableCellOne' },
        { text: 'Grand Total', style: 'tableCell' },
        { text: 'GHc ' + answer.grand_total, style: 'tableCell' },
      ]);
      this.supportsInfo.push([
        { text: '3', style: 'tableCellOne' },
        { text: 'Number of Inputs', style: 'tableCell' },
        { text: answer.inputs.length, style: 'tableCell' },
      ]);
    },
    addBankInfoItem(answer) {
      this.bankInfo.push([
        { text: '1', style: 'tableCellOne' },
        { text: 'Name', style: 'tableCell' },
        { text: answer.name, style: 'tableCell' },
      ]);
      this.bankInfo.push([
        { text: '2', style: 'tableCellOne' },
        { text: 'Branch', style: 'tableCell' },
        { text: answer.branch, style: 'tableCell' },
      ]);
      this.bankInfo.push([
        { text: '3', style: 'tableCellOne' },
        { text: 'Account Number', style: 'tableCell' },
        { text: answer.acc_number, style: 'tableCell' },
      ]);
      this.bankInfo.push([
        { text: '4', style: 'tableCellOne' },
        { text: 'Name on Account', style: 'tableCell' },
        { text: answer.acc_name, style: 'tableCell' },
      ]);
    },
    addMomoInfoItem(answer) {
      this.momoInfo.push([
        { text: '1', style: 'tableCellOne' },
        { text: 'Name', style: 'tableCell' },
        { text: answer.name, style: 'tableCell' },
      ]);
      this.momoInfo.push([
        { text: '2', style: 'tableCellOne' },
        { text: 'Number', style: 'tableCell' },
        { text: answer.phone, style: 'tableCell' },
      ]);
      this.momoInfo.push([
        { text: '3', style: 'tableCellOne' },
        { text: 'Network', style: 'tableCell' },
        { text: answer.network, style: 'tableCell' },
      ]);
    },
    getFileName() {
      let farmer = is.existy(this.farmer.name)
        ? this.ucwords(this.farmer.name)
        : 'Not provided';
      return farmer + ' Profile';
    },
    getFPPDetails(detail) {
      let details = {
        name: 'Farmer Profile Platform',
        phone: '0549959580',
        email: 'support@fppghana.com',
        website: 'www.fppghana.com',
        address: 'Farmer Profile Platform, Tarkoradi',
        logo:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB+sAAAO8CAYAAACBUlaEAAAACXBIWXMAAC4jAAAuIwF4pT92AAAK1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0yNVQxMzozMjozOVoiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjVUMTM6MzQ6MTBaIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0yNVQxMzozNDoxMFoiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzhhYmQ2MTctN2NiNy1jZjQ4LWIyYmQtYWZiMGRlYzRiODk5IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NWVhYTUxZDItM2QzOC1jNDQxLThhMGItYTIxOWI1YTMzN2FlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzRiNGJiODgtYTgzZC0yYzQ0LTgxOWQtYjZhN2RmMTE4NDA4Ij4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJGcHAiIHBob3Rvc2hvcDpMYXllclRleHQ9IkZwcCIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkZhcm1lciBQcm9maWxlIFBsYXRmb3JtIiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJGYXJtZXIgUHJvZmlsZSBQbGF0Zm9ybSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPjg4RkNFOUU4OEY2QURGQjA1ODdCQTZFRjA3NkM0QzgxPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzRiNGJiODgtYTgzZC0yYzQ0LTgxOWQtYjZhN2RmMTE4NDA4IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI1VDEzOjMyOjM5WiIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNTVjOGE4NC03NzljLTBiNDEtOTg0ZC0yNjM0ODI4NWMyZGIiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjVUMTM6MzM6MjVaIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2ZjdkODViLWVjOTAtMjg0Yy05ZjcwLTM5NjIyNDM4NDUyNyIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0yNVQxMzozNDoxMFoiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzhhYmQ2MTctN2NiNy1jZjQ4LWIyYmQtYWZiMGRlYzRiODk5IiBzdEV2dDp3aGVuPSIyMDIwLTAzLTI1VDEzOjM0OjEwWiIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NmY3ZDg1Yi1lYzkwLTI4NGMtOWY3MC0zOTYyMjQzODQ1MjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzRiNGJiODgtYTgzZC0yYzQ0LTgxOWQtYjZhN2RmMTE4NDA4IiBz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',
      };
      return details[detail];
    },
    getDetails(detail) {
      let details = {
        tagline:
          'Provision of holistic solutions to rural smallholder farmers.',
        penalty: '4%',
      };
      return details[detail];
    },
    getProfileDetails(detail) {
      let details = {
        name: this.farmer.name,
        phone: this.farmer.phone,
        email: is.empty(this.farmer.email) ? 'Not provided' : this.farmer.email,
        education: this.farmer.education,
        dob: this.getDateFormat(this.farmer.dob),
        hometown: this.farmer.hometown,
        nationality: this.farmer.nationality,
        residence: this.farmer.townOfResidence,
        national_id: this.farmer.national_id,
        id_number: this.farmer.id_number,
        years_farming: this.farmer.years_farming,
        photo: this.getImageFile(this.farmer.photo),
        farm_location: this.farmer.farm_location,
      };
      return details[detail];
    },
    addTable(lineItems, show = true) {
      return show
        ? {
            style: 'tableStyle',
            layout: {
              // eslint-disable-next-line
              hLineColor: function(i, node) {
                return i === 0 ? '#2fa512' : '#eee';
              },
              vLineColor: function(i, node) {
                return i === 0 && node.table.body.length === 0
                  ? '#2fa512'
                  : '#eee';
              },
            },
            table: {
              headerRows: 1,
              widths: [15, 180, 315],
              heights: function(row) {
                return row === 0 ? 10 : 20;
              },
              body: lineItems,
            },
            margin: [0, 40, 0, 0],
          }
        : {};
    },
    getPdfDefinition() {
      let self = this;
      return {
        pageSize: 'A4',
        info: {
          title: this.getFileName(),
          author: this.getFPPDetails('name'),
          subject: 'Farmer Profile Platform',
          keywords: 'Farmer, Profile, Farm',
        },
        header: '',
        footer: function(currentPage, pageCount) {
          return [
            {
              fontSize: 10,
              bold: true,
              text: self.getDetails('tagline'),
              alignment: 'center',
            },
            {
              canvas: [
                {
                  type: 'line',
                  x1: 50,
                  y1: 10,
                  x2: 575,
                  y2: 10,
                  lineColor: 'black',
                  lineWidth: 1,
                },
              ],
            },
            {
              margin: [50, 3, 20, 0],
              fontSize: 10,
              text: [
                { text: 'Phone: ', bold: true },
                {
                  text: self.getFPPDetails('phone'),
                  link: 'tel:' + self.getFPPDetails('phone'),
                  color: 'green',
                },
                { text: 'E-mail: ', bold: true },
                {
                  text: self.getFPPDetails('email'),
                  link: 'mailto:' + self.getFPPDetails('email'),
                  color: 'green',
                },
                { text: 'Website: ', bold: true },
                {
                  text: self.getFPPDetails('website'),
                  link: 'http://' + self.getFPPDetails('website'),
                  color: 'green',
                },
              ],
            },
            {
              fontSize: 10,
              text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
              alignment: 'right',
              margin: [0, -9, 20, 0],
            },
          ];
        },
        pageBreakBefore: function(currentNode, followingNodesOnPage) {
          return (
            currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
          );
        },
        content: [
          // Top section
          {
            columns: [
              {
                stack: [
                  { fontSize: 20, text: this.getProfileDetails('name') },
                  { fontSize: 12, text: this.getProfileDetails('email') },
                  { fontSize: 12, text: this.getProfileDetails('phone') },
                ],
              },
              {
                image: this.getFPPDetails('logo'),
                width: 150,
                alignment: 'right',
              },
            ],
            style: 'topsection',
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 520,
                y2: 0,
                lineColor: '#39c477',
                lineWidth: 1,
              },
            ],
          },
          {
            columns: [
              {
                width: 500,
                stack: [
                  {
                    text: 'Personal Information',
                    style: 'titleHead',
                  },
                ],
              },
            ],
          },

          {
            columns: [
              {
                width: 100,
                stack: [
                  { margin: [0, 10, 0, 7], bold: true, text: "Farmer's Name:" },
                  { margin: [0, 0, 0, 7], bold: true, text: 'Phone Number:' },
                  { margin: [0, 0, 0, 7], bold: true, text: 'Date of Birth:' },
                  { margin: [0, 0, 0, 7], bold: true, text: 'Hometown:' },
                  { margin: [0, 0, 0, 7], bold: true, text: 'Nationality:' },
                ],
              },
              {
                width: 120,
                stack: [
                  {
                    margin: [0, 10, 0, 7],
                    bold: false,
                    text: this.getProfileDetails('name'),
                  },
                  {
                    margin: [0, 0, 0, 7],
                    bold: false,
                    text: this.getProfileDetails('phone'),
                  },
                  {
                    margin: [0, 0, 0, 7],
                    bold: false,
                    text: this.getProfileDetails('dob'),
                  },
                  {
                    margin: [0, 0, 0, 7],
                    bold: false,
                    text: this.getProfileDetails('hometown'),
                  },
                  {
                    margin: [0, 0, 0, 7],
                    bold: false,
                    text: this.getProfileDetails('nationality'),
                  },
                ],
              },
              {
                width: 100,
                stack: [
                  { margin: [0, 10, 0, 3], bold: true, text: 'Education:' },
                  { margin: [0, 0, 0, 3], bold: true, text: 'Residence:' },
                  { margin: [0, 0, 0, 3], bold: true, text: 'National Id:' },
                  { margin: [0, 0, 0, 3], bold: true, text: 'ID Number:' },
                  {
                    margin: [0, 0, 0, 3],
                    bold: true,
                    text: 'Years of Farming:',
                  },
                  { margin: [0, 0, 0, 3], bold: true, text: 'Farm Location:' },
                ],
              },
              {
                width: 100,
                stack: [
                  {
                    margin: [0, 10, 0, 3],
                    text: this.getProfileDetails('education'),
                  },
                  {
                    margin: [0, 0, 0, 3],
                    text: this.getProfileDetails('residence'),
                  },
                  {
                    margin: [0, 0, 0, 3],
                    text: this.getProfileDetails('national_id'),
                  },
                  {
                    margin: [0, 0, 0, 3],
                    text: this.getProfileDetails('id_number'),
                  },
                  {
                    margin: [0, 0, 0, 3],
                    text: this.getProfileDetails('years_farming'),
                  },
                  {
                    margin: [0, 0, 0, 3],
                    text: this.getProfileDetails('farm_location'),
                  },
                ],
              },
            ],
          },
          self.addTable(self.spouseInfo),
          self.addTable(self.childrenInfo),
          self.addTable(self.harvestInfo),
          self.addTable(self.supportsInfo),
          self.addTable(self.bankInfo),
          self.addTable(self.momoInfo),
        ],
        styles: {
          topsection: {
            margin: [0, 10, 0, 40],
          },
          tableStyle: {
            fontSize: 9,
            margin: [0, 15, 0, 15],
          },
          tableHeader: {
            bold: true,
            border: [false, false, false, false],
            margin: [10, 0, 0, 0],
            fontSize: 12,
            fillColor: '#2fa512',
            color: 'white',
          },
          titleHead: {
            bold: true,
            border: [false, false, false, false],
            fontSize: 14,
            margin: [0, 10, 0, 0],
            background: '#2fa512',
            color: 'white',
          },
          tableCell: {
            fontSize: 12,
            alignment: 'left',
            margin: [0, 5, 0, 0],
            border: true,
            color: 'black',
          },
          tableCellOne: {
            alignment: 'center',
            fontSize: 10,
            margin: [0, 5, 0, 0],
            color: 'black',
          },
        },
        defaultStyle: {
          fontSize: 11,
          columnGap: 20,
        },
      };
    },
    generatePDF() {
      pdfMake.createPdf(this.getPdfDefinition()).download();
    },
    embedPDF() {
      // let fexts = {pdf: 'application/pdf', jpg: 'image/jpeg', png: 'image/png'}
      // console.log(this.getPdfDefinition())
      const pdfDocGenerator = pdfMake.createPdf(this.getPdfDefinition());
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.querySelector('#pdfContainer');
        while (targetElement.firstChild) {
          targetElement.removeChild(targetElement.firstChild);
        }
        const iframe = document.createElement('iframe');
        iframe.src = dataUrl;
        targetElement.appendChild(iframe);
      });
    },
  },
};
</script>

<style>
.bold {
  font-weight: bold;
}
.pdfContainer iframe {
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
  height: 700px;
  border-width: 1px;
  border-style: dashed;
  border-color: initial;
  border-image: initial;
}
</style>
