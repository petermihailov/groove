const audioCtx = new AudioContext();

export function getAudioContext() {
  return audioCtx;
}

export async function fetchAndDecodeAudio(url: string) {
  const audioCtx = getAudioContext();
  const response = await fetch(url);
  const responseBuffer = await response.arrayBuffer();
  return await audioCtx.decodeAudioData(responseBuffer);
}
