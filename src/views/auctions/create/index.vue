<template>
  <div class="container">
    <h3 class="title">Tạo phiên đấu giá</h3>
    <el-divider />
    <el-form ref="form" :model="form" label-width="200px" :rules="rules">
      <el-form-item label="Mã đấu giá" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="Chủ sản phẩm đấu giá" prop="owner">
        <el-input v-model="form.owner"></el-input>
      </el-form-item>
      <el-form-item label="Tổ chức đấu giá" prop="organization">
        <el-input v-model="form.organization"></el-input>
      </el-form-item>
      <el-form-item label="Loại đấu giá" prop="type">
        <el-select v-model="form.type" placeholder="Chọn loại hình đấu giá">
          <el-option label="Đấu giá công khai" value="1"></el-option>
          <el-option label="Đấu giá kín" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tiêu đề" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Miêu tả" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Thông tin thêm" prop="info">
        <el-input v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="Địa chỉ" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="Giá khởi điểm" prop="startPrice">
        <el-input
          :value="form.startPrice | filterNumber"
          @input="handleQtyInput($event, 'startPrice')"
        />
      </el-form-item>
      <el-form-item label="Bước giá" prop="stepPrice">
        <el-input
          :value="form.stepPrice | filterNumber"
          @input="handleQtyInput($event, 'stepPrice')"
        />
      </el-form-item>
      <el-form-item label="Bắt đầu đăng ký" prop="registerStartDate">
        <el-date-picker
          v-model="form.registerStartDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Bắt đầu đấu giá" prop="bidStartDate">
        <el-date-picker
          v-model="form.bidStartDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Kết thúc đăng ký" prop="regsterEndDate">
        <el-date-picker
          v-model="form.registerEndDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Kết thúc đấu giá" prop="bidEndDate">
        <el-date-picker
          v-model="form.bidEndDate"
          type="datetime"
          placeholder="Chọn thời gian"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Hình ảnh" required>
        <el-upload
          action="#"
          :auto-upload="false"
          list-type="picture"
          ref="upload"
        >
          <el-button size="small" type="primary">Nhấn để upload</el-button>
        </el-upload>
      </el-form-item>
      <el-divider></el-divider>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')"
            >Xác nhận tạo</el-button
          >
          <el-button @click="onRefresh('form')">Huỷ</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import * as auction from "@/api/auction";

const defaultForm = {
  code: "",
  owner: "",
  organization: "",
  registerStartDate: new Date(),
  registerEndDate: new Date(),
  bidStartDate: new Date(),
  bidEndDate: new Date(),
  startPrice: 100000,
  stepPrice: 100000,
  title: "",
  description: "",
  info: "",
  type: "1",
  address: "",
};

const basicValidate = {
  required: true,
  message: "Vui lòng điền thông tin",
  trigger: "blur",
};

export default {
  data() {
    return {
      form: { ...defaultForm, qty: "0" },
      rules: {
        code: [basicValidate],
        owner: [basicValidate],
        organization: [basicValidate],
        registerStartDate: [basicValidate],
        registerEndDate: [basicValidate],
        bidStartDate: [basicValidate],
        bidEndDate: [basicValidate],
        startPrice: [basicValidate],
        stepPrice: [basicValidate],
        title: [basicValidate],
        info: [basicValidate],
        type: [basicValidate],
        address: [basicValidate],
        description: [basicValidate],
      },
    };
  },

  filters: {
    filterNumber(num) {
      //Add the commas back to the string
      let qty = num + "";
      return qty.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  computed: {},
  methods: {
    handleQtyInput(newValue, fieldName) {
      //Make sure the stored qty is not formatted
      this.form[fieldName] = Number(newValue.toString().replace(/\D/g, ""));
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message({
            message: "Thông tin không hợp hệ, vui lòng điền thông tin hợp lệ!",
            type: "error",
          });
        } else {
          let files = this.$refs.upload.$children[1].files;
          this.$confirm("Xác nhận?", "Warning", {
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Quay lại",
            type: "warning",
          }).then(() => {
            auction.createAuction(this.form, files).then((res) => {
              if (res.code === 0) {
                this.$message({
                  message: "Tạo đấu giá thành công",
                  type: "success",
                });
                this.$router.push({ name: "auctions-list" });
              } else {
                console.log(res);
                this.$message({
                  message: "Có lỗi xảy ra, vui lòng thử lại sau!",
                  type: "danger",
                });
              }
            });
          });
        }
      });
    },
    onRefresh(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
.container {
  padding: 20px;
  .el-form {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      flex: 50%;
    }
  }
}
.el-upload-list {
  display: flex;
  gap: 10px;
  li {
    flex: 30%;
    flex-grow: 0;
  }
}
</style>