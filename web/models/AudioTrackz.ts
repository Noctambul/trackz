import { resolveLink } from "hooks/useIpfs";
import { Howl, HowlCallback } from "howler";
import TrackzMetadata from "./TrackzMetadata";

type TrackCallback = (track: AudioTrackz) => void;

export default class AudioTrackz {
  private howl: Howl;
  private onLoadedCallbacks: TrackCallback[] = [];

  get metadata(): TrackzMetadata {
    return this.trackzMetadata;
  }

  get id() {
    return this.metadata.id;
  }

  get name() {
    return this.metadata.name;
  }

  get duration(): number {
    return this.howl.duration();
  }

  get state(): "unloaded" | "loading" | "loaded" {
    return this.howl.state();
  }

  get isLoaded(): boolean {
    return this.state === "loaded";
  }

  get isPlaying(): boolean {
    return this.howl.playing();
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

  constructor(
    private trackzMetadata: TrackzMetadata,
    onTrackLoaded?: TrackCallback
  ) {
    const self = this;

    if (onTrackLoaded) this.onloaded(onTrackLoaded);

    this.howl = new Howl({
      src: this.musicUri,
      html5: true,
      preload: "metadata", // Could be true to start loading the file immediately
      onload: () => {
        self.onLoadedCallbacks.forEach((cb) => cb(self));
        self.onLoadedCallbacks = [];
      },
    });
  }

  onloaded(cb: TrackCallback) {
    if (this.isLoaded) {
      cb(this);
    } else {
      this.onLoadedCallbacks.push(cb);
    }
  }

  onended(cb: HowlCallback) {
    this.howl.on("end", cb);
  }

  offended(cb: HowlCallback) {
    this.howl.off("end", cb);
  }

  load() {
    // return new Promise((resolve, reject) => {
    //   this.howl.on("load", resolve);
    //   this.howl.on("loaderror", reject);
    // this.howl.on("load", this.onloaded);
    this.howl.on("loaderror", (e) =>
      console.error(`AudioTrackz ${this.name} failed to load : ${e}`)
    );
    // this.howl.on("load", () => this.onloaded());
    this.howl.load();
    // }).then();
  }

  play() {
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
