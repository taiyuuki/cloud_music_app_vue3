export default class UserInfo {
  id: number | string;
  userName: string;
  avatarUrl: string;
  backgroundUrl: string;
  type: number | string;
  vipType: number | string;
  token: string;
  nickname: string;
  isLogin: boolean;
  constructor(user: any) {
    this.id = user.id;
    this.userName = user.userName;
    this.avatarUrl = user.avatarUrl;
    this.backgroundUrl = user.backgroundUrl;
    this.type = user.type;
    this.vipType = user.vipType;
    this.token = user.token;
    this.nickname = user.nickname;
    this.isLogin = user.isLogin;
  }
}