// example1.js 必须是utf-8编码，脚本所用编程语言为JavaScript
const API_URL = '';

//getMusicUrl 函数用于获取音乐 URL。必须接受以下四个参数：songname: 歌曲名称，artist: 艺术家名称，songid: 企鹅平台的歌曲songmid，quality: 音质 '128k'|'320k'|'flac'。
async function getMusicUrl(songname,artist, songmid, quality) {

  const targetUrl = `${API_URL}/${songmid}/${quality}`;
   try {
  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'User-Agent': '',
      //...
    },
  });
  const responseJson = await response.json();
  //直接返回歌曲url。请勿返回其他信息
  return responseJson.url
   } catch (e) {
       console.error(e);
       // 如果获取失败，返回null
       return null;
  }
}

module.exports = {
// 音源唯一编号
id: "example1",
// 作者
author: "author1",
// 音源显示的名称
name: "示例音源1",
//版本
version: "0.0.1",
//更新地址
srcUrl: "",
//getMusicUrl方法必须导出
getMusicUrl
   
};