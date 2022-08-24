import { Howl } from "howler";
import TrackzMetadata from "./trackz-metadata";

export default class AudioTrackz {
  private howl: Howl;

  get metadata(): TrackzMetadata {
    return this.trackzMetadata;
  }

  constructor(private trackzMetadata: TrackzMetadata) {
    this.howl = new Howl({
      src: this.metadata.musicUri,
      html5: true,
      preload: "metadata", // Could be true to start loading the file immediately
    });
  }
}
