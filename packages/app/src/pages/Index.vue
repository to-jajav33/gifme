<template>
  <q-page class="row items-center justify-evenly">
    <video ref="video" class="col-4" controls></video>
    <q-btn @click="onStartRecording" :label="`${isRecording ? 'Stop' : 'Record'}`" :icon="`${isRecording ? 'stop' : 'fiber_manual_record'}`"></q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: {  },
  methods: {
    onStopRecording() {
      this.isRecording = false;
      if (!this.recorder) return;
      this.recorder.stop();
    },
    async onStartRecording() {
      
      if (this.isRecording) {
        this.onStopRecording();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            frameRate: this.frameRate
          }
          
        });
        this.recorder = new MediaRecorder(stream);
      } catch (e) {}
      if (!this.recorder) return;
      const chunks : Blob[] = [];
      this.recorder.onstop = (_ev : Event) => {
        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        const { video } = (this.$refs as unknown) as { video: HTMLVideoElement }
        video.src = URL.createObjectURL(completeBlob);
      };
      this.recorder.ondataavailable = (e : BlobEvent) => chunks.push(e.data);
      this.recorder.start();
      this.isRecording = true;
    }
  },
  $refs!: {
    video: HTMLVideoElement
  },
  setup() {
    const recorder = ref<MediaRecorder>();
    const isRecording = false;
    const frameRate = 6;
    return { frameRate, isRecording, recorder};
  }
});
</script>
