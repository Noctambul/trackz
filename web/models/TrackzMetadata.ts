export default interface TrackzMetadata {
  id: number;
  name: string;
  creator: string;
  description: string;
  totalSupply: number;
  coverUri?: string | null;
  musicUri: string;
  tags?: string;
  price?: number;
}
