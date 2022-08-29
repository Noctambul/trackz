export default interface TrackzMetadata {
  id: number;
  name: string;
  owner: string;
  description: string;
  totalSupply: number;
  coverUri?: string | null;
  musicUri: string;
  tags?: string[];
  price?: number;
  duration?: number;
}
