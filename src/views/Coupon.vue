<template>
  <div>
    <div class="container d-flex justify-content-center align-items-center mt-3">
      <div class="card bg-light" style="width: 40rem;">
        <div class="card-body d-flex flex-column align-items-center">
          <p class="text-danger h1 text-center mb-4" v-if="time > 0">限時優惠</p>
          <p class="h5 text-monospace text-center mb-4" v-if="time > 0">{{ timer }}</p>
          <p class="card-title h1 mb-5 text-success" v-if="time > 0">20% off</p>
          <p class="card-text text-monospace py-2 h3 mb-2" v-if="time > 0">Coupon Code:</p>
          <span
            class="alert-secondary py-2 px-4 mb-5 text-monospace rounded"
            id="couponCode"
            v-if="time"
            >excited
            <!-- Trigger -->
            <button
              class="copy"
              type="button"
              data-clipboard-target="#couponCode"
              data-clipboard-action="copy"
              data-container="body"
              data-toggle="popover"
              data-placement="bottom"
              data-content="已複製"
            >
              <img src="../../public/images/clippy.svg" alt="" /></button
          ></span>

          <p class="h2 text-danger" v-if="time < 0">優惠已截止</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import $ from 'jquery';

export default {
  data() {
    return {
      nowDate: '',
      dueDate: '',
      timer: '6 Day 6 Hours 6 Minutes 6 Second',
      time: 0,
    };
  },
  created() {
    const vm = this;

    vm.countDueDate();
  },
  mounted() {
    const clipboard = new Clipboard('.copy');

    clipboard.on('success', e => {
      // console.info('Action:', e.action);
      // console.info('Text:', e.text);
      // console.info('Trigger:', e.trigger);
      $('.copy').popover('show');
      setTimeout(() => {
        $('.copy').popover('hide');
      }, 2000);

      e.clearSelection();
    });

    clipboard.on('error', e => {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  },
};
</script>
