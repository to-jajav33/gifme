<template>
  <q-page class="row items-center justify-evenly">
    <video ref="video" class="col-4" controls type="video/ogg"></video>
    <q-btn @click="onStartRecording" :label="`${isRecording ? 'Stop' : 'Record'}`" :icon="`${isRecording ? 'stop' : 'fiber_manual_record'}`"></q-btn>
    <q-btn @click="downloadBlob" :disabled="isRecording" label="Download" icon="download"></q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: {  },
  methods: {
    downloadBlob(blob : Blob, name = 'file.ogg') {
      
    const { video } = (this.$refs as unknown) as { video: HTMLVideoElement }
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = video.src

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  // Remove link from body
  document.body.removeChild(link);
},
    onStopRecording() {
      this.isRecording = false;
      if (!this.recorder) return;
      this.recorder.stop();
      this.recorder = undefined;
    },
    async doStartRecording() {
      let stream : MediaStream;

      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            frameRate: this.frameRate
          }
          
        });
        this.recorder = new MediaRecorder(stream);
      } catch (e) {
        this.isRecording = false;
      }
      if (!this.recorder) return;
      const chunks : Blob[] = [];
      this.recorder.onstop = (_ev : Event) => {
        const completeBlob = new Blob(chunks, { type: chunks[0].type });
        const { video } = (this.$refs as unknown) as { video: HTMLVideoElement }
        video.src = URL.createObjectURL(completeBlob);
        stream.getTracks() // get all tracks from the MediaStream
        .forEach( track => track.stop() ); // stop each of them
        this.onStopRecording();
      };
      this.recorder.ondataavailable = (e : BlobEvent) => {
        chunks.push(e.data);
      };
      this.recorder.start();
    },
    onStartRecording() {
      
      if (this.isRecording) {
        this.onStopRecording();
        return;
      }
      this.isRecording = true;
      this.$forceUpdate();
      void this.doStartRecording();
    }
  },
  $refs!: {
    video: HTMLVideoElement
  },
  setup() {
    const recorder = ref<MediaRecorder>();
    const isRecording = false;
    const frameRate = 10/60;
    return { frameRate, isRecording, recorder};
  }
});
</script>
