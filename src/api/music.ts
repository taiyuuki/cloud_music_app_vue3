export default class Music {
  id: number | string;
  title: string;
  singer: string;
  picUrl: string;
  constructor(
    id: number | string,
    title: string,
    singer: string,
    picUrl: string
  ) {
    this.id = id;
    this.title = title;
    this.singer = singer;
    this.picUrl = picUrl;
  }
}