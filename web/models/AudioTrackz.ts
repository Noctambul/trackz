import { resolveLink } from "hooks/useIpfs";
import { Howl } from "howler";
import TrackzMetadata from "./TrackzMetadata";

export default class AudioTrackz {
  private howl: Howl;

  get metadata(): TrackzMetadata {
    return this.trackzMetadata;
  }

  get id() {
    return this.metadata.id;
  }

  get duration(): number {
    return this.howl.duration();
  }

  get state(): "unloaded" | "loading" | "loaded" {
    return this.howl.state();
  }

  /**
   * The resolved music uri
   */
  get musicUri(): string {
    return resolveLink(this.metadata.musicUri);
  }

  get progress(): number {
    return this.howl.seek();
  }

  constructor(private trackzMetadata: TrackzMetadata) {
    this.howl = new Howl({
      src: this.musicUri,
      html5: true,
      preload: "metadata", // Could be true to start loading the file immediately
    });
  }

  onloaded() {}

  load() {
    // return new Promise((resolve, reject) => {
    //   this.howl.on("load", resolve);
    //   this.howl.on("loaderror", reject);
    // this.howl.on("load", this.onloaded);
    this.howl.load();
    // }).then();
  }

  play() {
    console.log("PLEY");
    this.howl.play();
  }

  pause() {
    this.howl.pause();
  }

  stop() {
    this.howl.stop();
  }

  volume(vol: number) {
    this.howl.volume(vol);
  }

  seek(progress: number) {
    this.howl.seek(progress);
  }

  mute(muted: boolean) {
    this.howl.mute(muted);
  }
}
