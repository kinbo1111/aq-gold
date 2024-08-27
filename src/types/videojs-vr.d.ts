import videojs from 'video.js';

declare module 'video.js' {
  // Extend the VideoJsPlayer interface to include the 'vr' method
  export interface VideoJsPlayer {
    vr(options?: any): void;
  }
}

declare module 'videojs-vr' {
  const videojsVr: (player: videojs.Player, options?: any) => void;
  export default videojsVr;
}
