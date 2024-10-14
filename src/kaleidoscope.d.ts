declare module 'kaleidoscope' {
  export class Video {
    constructor(options: { source: string; containerId: string; height: number; width: number; });
    render(): void;
    setSize(size: { height: number; width: number }): void;
    play(): void;
  }
}
