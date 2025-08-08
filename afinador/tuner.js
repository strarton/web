const STRING_FREQUENCIES = {
    "E2": 82.41,
    "A2": 110.00,
    "D3": 146.83,
    "G3": 196.00,
    "B3": 246.94,
    "E4": 329.63,
  };
  
  const TUNING_TOLERANCE_PERCENT = 0.002;
  
  function getClosestStringNote(frequency) {
    let closestNote = "";
    let minDiff = Infinity;
  
    for (const [note, freq] of Object.entries(STRING_FREQUENCIES)) {
      const diff = Math.abs(frequency - freq);
      if (diff < minDiff) {
        minDiff = diff;
        closestNote = note;
      }
    }
  
    return closestNote;
  }
  
  function autoCorrelate(buffer, sampleRate) {
    let SIZE = buffer.length;
    let rms = 0;
  
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;
  
    let r1 = 0, r2 = SIZE - 1, threshold = 0.05;
  
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }
  
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }
  
    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;
  
    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] += buffer[j] * buffer[j + i];
      }
    }
  
    let d = 0;
    while (c[d] > c[d + 1]) d++;
  
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
  
    let T0 = maxpos;
    return sampleRate / T0;
  }
  
  let audioContext, analyser, buffer;
  
  async function startTuning() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      const mic = audioContext.createMediaStreamSource(stream);
  
      const filter = audioContext.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(250, audioContext.currentTime);
      filter.Q.setValueAtTime(1, audioContext.currentTime);
  
      analyser.fftSize = 4096;
      buffer = new Float32Array(analyser.fftSize);
  
      mic.connect(filter);
      filter.connect(analyser);
  
      detectPitch();
    } catch (err) {
      console.error("Microphone access denied!", err);
    }
  }
  
  function detectPitch() {
    if (!analyser) return;
  
    analyser.getFloatTimeDomainData(buffer);
    const freq = autoCorrelate(buffer, audioContext.sampleRate);
  
    if (freq > 70 && freq < 400) {
      const note = getClosestStringNote(freq);
      const targetFreq = STRING_FREQUENCIES[note];
      const tolerance = targetFreq * TUNING_TOLERANCE_PERCENT;
      const detuning = freq - targetFreq;
      const inTune = Math.abs(detuning) <= tolerance;
  
      updateDisplay(note, detuning, tolerance, inTune);
    }
  
    requestAnimationFrame(detectPitch);
  }
  
  function updateDisplay(note, detuning, tolerance, inTune) {
    document.getElementById("noteDisplay").textContent = note;
  
    const indicator = document.getElementById("tuneIndicator");
    indicator.classList.toggle("in-tune", inTune);
  
    document.getElementById("dot1").className = "dot";
    document.getElementById("dot2").className = "dot";
    document.getElementById("dot4").className = "dot";
    document.getElementById("dot5").className = "dot";
  
    if (detuning < -tolerance * 2) {
      document.getElementById("dot1").classList.add("active-yellow");
    }
    if (detuning < -tolerance && detuning >= -tolerance * 2) {
      document.getElementById("dot2").classList.add("active-yellow");
    }
    if (detuning > tolerance && detuning <= tolerance * 2) {
      document.getElementById("dot4").classList.add("active-red");
    }
    if (detuning > tolerance * 2) {
      document.getElementById("dot5").classList.add("active-red");
    }
  }
  
  startTuning();
  