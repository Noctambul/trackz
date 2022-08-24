import { Howl } from "howler";
import TrackzMetadata from "./trackz-metadata";

export default class AudioTrackz {
  private howl: Howl;

  get metadata(): TrackzMetadata {
    return this.trackzMetadata;
  }

  get duration(): number {
    return this.howl.duration();
  }

  get state(): "unloaded" | "loading" | "loaded" {
    return this.howl.state();
  }

  constructor(private trackzMetadata: TrackzMetadata) {
    this.howl = new Howl({
      src: this.metadata.musicUri,
      html5: true,
      preload: "metadata", // Could be true to start loading the file immediately
    });
  }

  load(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.howl.on("load", resolve);
      this.howl.on("loaderror", reject);
      this.howl.load();
    });
  }

  play() {
    this.howl.play();
  }

  pause() {
    this.howl.pause();
  }
}
