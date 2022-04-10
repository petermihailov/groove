export async function fetchAndDecodeAudio(audioCtx: AudioContext, url: string) {
  const response = await fetch(url);
  const responseBuffer = await response.arrayBuffer();
  return await audioCtx.decodeAudioData(responseBuffer);
}
