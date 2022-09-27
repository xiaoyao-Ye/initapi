import { main } from "./main";

const jsonUrl: { [prop: string]: string } = {
  mg: 'http://192.168.1.57:8100/swagger/v1/swagger.json',
  staff: 'http://192.168.1.57:9020/swagger/v1/swagger.json',
  store: 'http://192.168.1.57:9010/swagger/Store/swagger.json',
  platform: 'http://192.168.1.57:5100/swagger/v1/swagger.json',
  file: 'http://192.168.1.57:4100/swagger/v1/swagger.json',
  test: 'https://petstore.swagger.io/v2/swagger.json',
  test1: 'https://tools.kalvinbg.cn/static/tmp/swagger.json',
  mangosteen: 'http://127.0.0.1:3000/api-json'
}

const fileType = 'TypeScript';
// const fileType = 'JavaScript';
// const jsonAddress = 'staff';
const jsonAddress = 'mangosteen';
// const jsonAddress = 'mg';
// const jsonAddress = 'test1';
let url = jsonUrl[jsonAddress];
main(url, fileType);
