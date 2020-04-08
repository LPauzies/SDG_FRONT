<template>
  <div id="topic">
    <sui-form>
      <sui-form-fields grouped v-on:change="submitTopicToDashboard">
        <label for="topic_selector">Select the topic :</label>
        <sui-form-field>
          <sui-checkbox radio v-model="selectedTopic" name="topic_selector" label="Economic" value="Economic" />
        </sui-form-field>
        <sui-form-field>
          <sui-checkbox radio v-model="selectedTopic" name="topic_selector" label="Ecologic" value="Ecologic" />
        </sui-form-field>
        <sui-form-field>
          <sui-checkbox radio v-model="selectedTopic" name="topic_selector" label="Social" value="Social" />
        </sui-form-field>
      </sui-form-fields>
    </sui-form>
  </div>
</template>

<script>

export default {
  name: 'TopicSelector',
  props: {
    goals: Array
  },
  data: function() {
    return {
      goalsData: this.goals,
      selectedTopic: null,
      economicData: [
        "SI_POV_NAHC", "SL_TLF_MANF", "AG_PRD_FIESSI", "SL_EMP_PCAP", "GC_GOB_TAXD", "GR_G14_GDP", "SD_XPD_ESED", "IS_RDP_FRGVOL", "NY_GDP_PCAP", "SI_HEI_TOTL", "SE_ADT_FUNS"
      ],
      ecologicData: [
        "EG_FEC_RNEW", "AG_LND_FRSTMGT", "EG_EGY_CLEAN", "ER_RSK_LSTI", "AG_LND_DGRD", "AG_LND_FRST", "SH_AAP_ASMORT", "ER_MRN_MPA", "SH_H20_SAFE", "SG_SCP_CORMEC", "SG_SCP_MACPOL"
      ],
      socialData: [
        "EG_ELS_ACCS", "SP_ACS_BSRVSAN", "SH_STA_MMR", "IU_COR_BRIB", "EN_LND_SLUM", "VC_DSR_MTMN", "IS_RDP_PFVOL", "VC_IHR_PSRC", "SG_GEN_EQPWN", "SE_TRA_GRDL", "VC_SNS_WALN"
      ]
    }
  },
  methods: {
    submitTopicToDashboard: function() {
      var res = {};
      switch (this.selectedTopic) {
        case "Economic":
          res = {
            data: this.economicData,
            color: "economic"
          };
          break;
        case "Ecologic":
          res = {
            data: this.ecologicData,
            color: "ecologic"
          };
          break;
        case "Social":
          res = {
            data: this.socialData,
            color: "social"
          };
          break;
        default:
          res = null;
          break;
      }
      this.$emit('topicSelectorToParent', res);
    }
  }

}

</script>

<style scoped lang="scss">
  #topic {
    height: 100%;
  }
</style>
